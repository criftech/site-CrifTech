import nodemailer from 'nodemailer';

/**
 * Brevo (Sendinblue) email integration — fully non-destructive.
 *
 * Strategy
 * --------
 * 1. Try Brevo's transactional REST API first (deliverability tracking in the
 *    Brevo dashboard, tags, etc.)
 * 2. If REST fails for any reason, fall back to Brevo SMTP via Nodemailer.
 * 3. Never throw — always return { ok: true/false } so existing DB / HTTP
 *    flows are 100% unaffected.
 *
 * Callers should fire these helpers after their DB save succeeds, not before.
 */

export interface BrevoAttachment {
  name: string;
  content: string; // base64
}

export interface BrevoSendParams {
  to: { email: string; name?: string } | Array<{ email: string; name?: string }>;
  cc?: Array<{ email: string; name?: string }>;
  bcc?: Array<{ email: string; name?: string }>;
  replyTo?: { email: string; name?: string };
  subject: string;
  html?: string;
  text?: string;
  attachments?: BrevoAttachment[];
  tags?: string[];
}

const BREVO_API_BASE = 'https://api.brevo.com/v3';

function env(name: string, fallback = ''): string {
  const v = process.env[name];
  return (v ?? fallback) as string;
}

/**
 * Lazy getter for Brevo config. Reads `process.env` FRESH on every call so
 * that any runtime dotenv / Secrets-manager injections are always picked up.
 * This avoids the classic pitfall of `export const BREVO_CONFIG = {...}` being
 * evaluated once at module-import time, before env vars are actually ready.
 */
export function getBrevoConfig() {
  const apiKey = env('BREVO_API_KEY');
  const smtpHost = env('BREVO_SMTP_HOST', 'smtp-relay.brevo.com');
  const smtpPort = Number(env('BREVO_SMTP_PORT', '587'));
  const smtpUser = env('BREVO_SMTP_USER');
  const smtpPass = env('BREVO_SMTP_PASS');
  const senderName = env('BREVO_SENDER_NAME', 'CrifTech');
  const senderEmail = env('BREVO_SENDER_EMAIL', 'criftech@gmail.com');
  const adminAlertEmail = env('BREVO_ADMIN_NOTIFY_EMAIL') || senderEmail;
  const appUrl = env('APP_URL');
  const publicLogoUrl =
    env('BREVO_PUBLIC_LOGO_URL') ||
    (appUrl && appUrl !== 'MY_APP_URL'
      ? `${appUrl.replace(/\/$/, '')}/CrifTech1.png`
      : 'https://criftech.com/CrifTech1.png');
  // Gmail SMTP relay — optional third fallback channel that ALWAYS works for
  // gmail.com senders regardless of Brevo's domain-auth policies, because
  // we're sending directly through Google's servers. Use the same Gmail
  // account that's used as BREVO_SENDER_EMAIL, authenticated with an
  // "App Password" (NOT the account password). Docs for creating it:
  // https://support.google.com/accounts/answer/185833 → "Sign in with app passwords"
  const gmailSmtpUser = env('GMAIL_SMTP_USER') || senderEmail;
  const gmailSmtpPass = env('GMAIL_SMTP_PASS');
  return {
    apiKey,
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPass,
    senderName,
    senderEmail,
    adminAlertEmail,
    publicLogoUrl,
    gmailSmtpUser,
    gmailSmtpPass
  };
}

/**
 * Exported snapshot for backwards compatibility with any code that reads
 * `BREVO_CONFIG` directly. Values are the same as calling `getBrevoConfig()`.
 * At runtime we prefer `getBrevoConfig()` so env re-reads always return
 * the latest value.
 */
export const BREVO_CONFIG = getBrevoConfig();

/**
 * Diagnostic helper: dumps which Brevo env keys are set and which are missing.
 * Returns a short status summary object for the init log line.
 */
export function diagnoseBrevoEnv() {
  const keys = [
    'BREVO_API_KEY',
    'BREVO_SMTP_HOST',
    'BREVO_SMTP_PORT',
    'BREVO_SMTP_USER',
    'BREVO_SMTP_PASS',
    'BREVO_SENDER_NAME',
    'BREVO_SENDER_EMAIL',
    'BREVO_ADMIN_NOTIFY_EMAIL',
    'BREVO_PUBLIC_LOGO_URL',
    'APP_URL',
    'GMAIL_SMTP_USER',
    'GMAIL_SMTP_PASS'
  ] as const;
  const status: Record<string, string> = {};
  for (const k of keys) {
    const v = process.env[k];
    if (v === undefined || v === '') {
      status[k] = 'MISSING';
    } else if (k.includes('KEY') || k.includes('PASS') || k.includes('SECRET')) {
      const masked =
        v.length <= 6 ? '***' : `${v.slice(0, 4)}***${v.slice(-4)}`;
      status[k] = `OK (${masked}) len=${v.length}`;
    } else {
      status[k] = `OK (${v})`;
    }
  }
  return status;
}

/**
 * Returns `true` when the sender email is a free / consumer mailbox provider.
 * Brevo's REST channel requires the sender DOMAIN to be authenticated
 * (DKIM/SPF DNS records set in Brevo dashboard → Senders → Domains).
 * Since free-email senders (gmail.com, outlook.com, etc.) cannot set DNS
 * records on those domains, Brevo REST will silently accept-and-drop those
 * sends *after* returning 200 OK (messageId is issued, email never leaves
 * Brevo's "Suspended" queue).
 *
 * Brevo's SMTP relay is more lenient for these senders, so when we detect
 * a free-email sender we prefer SMTP-first and only fall back to REST if
 * the SMTP handshake / delivery fails for unrelated reasons.
 */
const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com',
  'live.com', 'msn.com', 'yahoo.com', 'yahoo.co.uk', 'yahoo.in',
  'icloud.com', 'me.com', 'mac.com', 'aol.com', 'gmx.com', 'gmx.net',
  'protonmail.com', 'proton.me', 'tutanota.com', 'mail.com', 'yandex.com'
]);

export function isFreeEmailSender(email: string): boolean {
  if (!email) return false;
  const at = email.lastIndexOf('@');
  if (at < 0) return false;
  const domain = email.slice(at + 1).toLowerCase().trim();
  return FREE_EMAIL_DOMAINS.has(domain);
}

/**
 * Suggested send order for the given sender identity.
 *
 *  RULE #1 — Custom domain sender (hello@criftech.com):
 *    REST → Brevo SMTP → (Gmail SMTP if available, unlikely since sender domain != gmail)
 *    Best when Brevo dashboard has the domain authenticated via DKIM/SPF.
 *
 *  RULE #2 — Free-email sender AND Gmail SMTP fallback is ARMED:
 *    Gmail SMTP → REST → Brevo SMTP
 *    Gmail SMTP delivers DIRECTLY through Google servers for @gmail senders,
 *    completely bypassing Brevo's domain-authentication "suspended" policy.
 *
 *  RULE #3 — Free-email sender, NO Gmail SMTP fallback set:
 *    Brevo SMTP → REST
 *    Brevo SMTP works on standard plans even for unauthenticated free senders
 *    (but will 535-auth-fail if SMTP creds are wrong, then REST fallback runs).
 */
export function effectiveSendOrder(senderEmail: string): Array<'rest' | 'smtp' | 'gmail-smtp'> {
  const gmailOk = gmailSmtpAvailable();
  const freeSender = isFreeEmailSender(senderEmail);
  if (!freeSender) {
    const base: Array<'rest' | 'smtp' | 'gmail-smtp'> = ['rest', 'smtp'];
    if (gmailOk) base.push('gmail-smtp');
    return base;
  }
  // Free-email sender. Rule #2 first (guaranteed delivery via Gmail SMTP).
  if (gmailOk) return ['gmail-smtp', 'rest', 'smtp'];
  // Rule #3 fallback.
  return ['smtp', 'rest'];
}

/**
 * Backward-compat 2-channel helper. Prefer effectiveSendOrder() which also
 * accounts for the Gmail SMTP channel.
 */
export function preferredSendOrder(senderEmail: string): ['rest', 'smtp'] | ['smtp', 'rest'] {
  return isFreeEmailSender(senderEmail) ? ['smtp', 'rest'] : ['rest', 'smtp'];
}

/* --------------------------------------------------------------------
 * Brevo Sender Management (Senders & IPs → Senders)
 *
 * Uses the same `api-key` REST pattern as the email send channel.
 * No new npm packages required; native fetch + process.env.BREVO_API_KEY.
 * ------------------------------------------------------------------ */

export interface BrevoSender {
  id: number;
  email: string;
  name: string;
  active?: boolean;
  ip?: string;
  domainSender?: boolean;
  createdAt?: string;
  modifiedAt?: string;
}

/**
 * List ALL senders configured in the Brevo account.
 *
 * Endpoint: GET /v3/senders
 * Docs: https://developers.brevo.com/reference/getsenders
 */
export async function listBrevoSenders(): Promise<{
  ok: boolean;
  senders: BrevoSender[];
  error?: string;
  count?: number;
}> {
  const cfg = getBrevoConfig();
  if (!cfg.apiKey) {
    return { ok: false, senders: [], error: 'BREVO_API_KEY is not configured' };
  }
  console.log(`[BREVO] SENDERS → list via GET ${BREVO_API_BASE}/senders`);
  try {
    const res = await fetch(`${BREVO_API_BASE}/senders`, {
      method: 'GET',
      headers: {
        'api-key': cfg.apiKey,
        'Accept': 'application/json'
      }
    });
    const body = await res.text();
    let data: any = body;
    try { data = JSON.parse(body); } catch { /* ignore */ }
    if (!res.ok) {
      const msg = (data && (data.message || data.error)) || `Brevo API returned HTTP ${res.status}: ${body}`;
      console.error(`[BREVO] SENDERS ✗ list FAILED HTTP ${res.status}: ${msg}`);
      return { ok: false, senders: [], error: msg };
    }
    const senders: BrevoSender[] = Array.isArray(data?.senders) ? data.senders : (Array.isArray(data) ? data : []);
    console.log(`[BREVO] SENDERS ✓ list OK — found ${senders.length} sender(s) in Brevo account`);
    return { ok: true, senders, count: senders.length };
  } catch (err: any) {
    const msg = err?.message || String(err);
    console.error(`[BREVO] SENDERS ✗ list THREW: ${msg}`);
    return { ok: false, senders: [], error: msg };
  }
}

/**
 * Register a new sender in the Brevo account using POST /v3/senders.
 *
 * - The email address MUST be a real inbox you can check, because Brevo will
 *   send a VERIFICATION email with a "Activate sender" link. Sender will NOT
 *   work until that link is clicked.
 * - For @gmail / @outlook senders: once verified, Brevo will allow REST
 *   sends from this address but deliverability may still be low (use Gmail
 *   SMTP fallback instead for 99% inbox rate).
 * - For custom domain senders: also authenticate the domain (Domains page)
 *   for 99.5% deliverability.
 */
export async function createBrevoSender(input: {
  email: string;
  name: string;
  ips?: Array<{ ip: string; weight: number }>;
}): Promise<{
  ok: boolean;
  id?: number;
  dkimError?: boolean;
  spfError?: boolean;
  error?: string;
  nextStep?: string;
}> {
  const cfg = getBrevoConfig();
  if (!cfg.apiKey) {
    return { ok: false, error: 'BREVO_API_KEY is not configured' };
  }
  if (!input.email || !input.name) {
    return { ok: false, error: 'email and name are both required to create a Brevo sender' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.email)) {
    return { ok: false, error: `invalid email format: ${input.email}` };
  }

  const payload: any = { email: input.email, name: input.name };
  if (input.ips && Array.isArray(input.ips) && input.ips.length) {
    // Dedicated-IP accounts only — sum of weights must equal 100.
    const sum = input.ips.reduce((acc, i) => acc + (i.weight || 0), 0);
    if (sum !== 100) {
      return { ok: false, error: `ips weights must sum to 100, got ${sum}` };
    }
    payload.ips = input.ips;
  }

  console.log(
    `[BREVO] SENDERS → creating sender email="${input.email}" name="${input.name}" via POST ${BREVO_API_BASE}/senders`
  );
  try {
    const res = await fetch(`${BREVO_API_BASE}/senders`, {
      method: 'POST',
      headers: {
        'api-key': cfg.apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const body = await res.text();
    let data: any = body;
    try { data = JSON.parse(body); } catch { /* ignore */ }
    if (!res.ok) {
      const msg = (data && (data.message || data.error)) || `Brevo API returned HTTP ${res.status}: ${body}`;
      console.error(`[BREVO] SENDERS ✗ create FAILED HTTP ${res.status}: ${msg}`);
      return { ok: false, error: msg };
    }
    const id = typeof data?.id === 'number' ? data.id : undefined;
    const dkimError = Boolean(data?.dkimError);
    const spfError = Boolean(data?.spfError);
    const nextStep =
      `Check the inbox of ${input.email} for a verification email from Brevo. ` +
      `Click "Activate sender" inside it, then call GET /api/brevo/senders to confirm active:true. ` +
      `Untill activated, Brevo will reject sends with "sender you used is not valid".`;
    console.log(
      `[BREVO] SENDERS ✓ create OK — id=${id} dkimError=${dkimError} spfError=${spfError}. ` +
      `NEXT STEP: verify the sender by clicking the link Brevo sent to ${input.email}.`
    );
    return { ok: true, id, dkimError, spfError, nextStep };
  } catch (err: any) {
    const msg = err?.message || String(err);
    console.error(`[BREVO] SENDERS ✗ create THREW: ${msg}`);
    return { ok: false, error: msg };
  }
}

/**
 * Resend the sender-verification email for an existing sender.
 *
 * Endpoint: POST /v3/senders/{senderId}/validate
 * Docs: https://developers.brevo.com/reference/senderresendverificationemail
 */
export async function resendBrevoSenderVerification(senderId: number): Promise<{
  ok: boolean;
  error?: string;
  nextStep?: string;
}> {
  const cfg = getBrevoConfig();
  if (!cfg.apiKey) {
    return { ok: false, error: 'BREVO_API_KEY is not configured' };
  }
  if (!Number.isFinite(senderId) || senderId <= 0) {
    return { ok: false, error: `senderId must be a positive integer, got ${senderId}` };
  }
  console.log(
    `[BREVO] SENDERS → re-sending verification for sender id=${senderId} via POST ${BREVO_API_BASE}/senders/${senderId}/validate`
  );
  try {
    const res = await fetch(`${BREVO_API_BASE}/senders/${encodeURIComponent(String(senderId))}/validate`, {
      method: 'POST',
      headers: {
        'api-key': cfg.apiKey,
        'Accept': 'application/json'
      }
    });
    if (res.status === 204 || res.ok) {
      const nextStep = 'Brevo re-sent the verification email. Open the recipient inbox, find the Brevo verification email, click "Activate sender".';
      console.log(`[BREVO] SENDERS ✓ re-send verify OK for sender id=${senderId}. ${nextStep}`);
      return { ok: true, nextStep };
    }
    const body = await res.text();
    let data: any = body;
    try { data = JSON.parse(body); } catch { /* ignore */ }
    const msg = (data && (data.message || data.error)) || `Brevo API returned HTTP ${res.status}: ${body}`;
    console.error(`[BREVO] SENDERS ✗ re-send verify FAILED HTTP ${res.status}: ${msg}`);
    return { ok: false, error: msg };
  } catch (err: any) {
    const msg = err?.message || String(err);
    console.error(`[BREVO] SENDERS ✗ re-send verify THREW: ${msg}`);
    return { ok: false, error: msg };
  }
}

function ensureTo(to: BrevoSendParams['to']) {
  return Array.isArray(to) ? to : [to];
}

function esc(s: string | number | null | undefined): string {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* --------------------------------------------------------------------
 * Beautiful branded email shell
 * ------------------------------------------------------------------ */
interface BrandShellOpts {
  headline: string;
  eyebrow?: string;
  accent?: string; // hex color
  body: string;    // raw HTML for the main card body
  cta?: { label: string; url: string };
  signature?: string;
  footerExtra?: string;
}

function emailShell(o: BrandShellOpts): string {
  const accent = o.accent || '#0066FF';
  const logoUrl = getBrevoConfig().publicLogoUrl;
  const signature =
    o.signature ||
    'Thanks,<br />The <strong>CrifTech</strong> Team — Engineering Modern Digital Products &amp; AI Systems';
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.headline)}</title>
<!--[if mso]>
<noscript>
<xml>
<w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
<w:AllowPNG/><w:PunctuationKerning/></w:WordDocument>
</xml>
</noscript>
<![endif]-->
<style>
  .ReadMsgBody{width:100%} .ExternalClass{width:100%} .ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:100%}
  body{margin:0;padding:0;background-color:#070B14;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
  table{border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;display:block;max-width:100%}
  a{text-decoration:none}
  @media only screen and (max-width:620px){
    .wrap{width:100% !important}
    .pad{padding-left:20px !important;padding-right:20px !important}
    .hero-img{height:110px !important}
    .headline{font-size:22px !important;line-height:28px !important}
    .eyebrow{font-size:10px !important;letter-spacing:1.6px !important}
    .btn{width:100% !important;display:block !important}
    .btn a{display:block !important;width:auto !important}
  }
</style>
</head>
<body>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#070B14">
  <tr>
    <td align="center" style="padding:36px 16px 48px 16px;">
      <!-- Preheader (invisible preview text) -->
      <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
        ${esc(o.eyebrow || '')} — ${esc(o.headline)}
      </div>

      <table class="wrap" role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" align="center" bgcolor="#0A1020"
        style="border:1px solid rgba(0,102,255,0.14);border-radius:18px;overflow:hidden;box-shadow:0 20px 60px -30px rgba(0,102,255,0.35);background:linear-gradient(180deg,#0A1020 0%,#070B14 100%);">

        <!-- Hero band with logo + gradient swoosh -->
        <tr>
          <td class="hero-img" align="center" style="height:140px;background:linear-gradient(135deg,#050810 0%,#0A1530 40%,#001946 70%,#000814 100%);position:relative;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="padding:22px 16px 10px 16px;">
                  <a href="https://criftech.com" target="_blank" style="display:inline-block;text-decoration:none;">
                    <img src="${logoUrl}" alt="CrifTech Logo" width="160" height="50" style="display:block;max-width:160px;height:auto;width:160px;border:0;outline:none;" />
                  </a>
                </td>
              </tr>
              <tr>
                <td align="center" class="pad" style="padding:0 24px 26px 24px;">
                  <div class="eyebrow" style="color:${accent};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                    ${esc(o.eyebrow || 'CrifTech')}
                  </div>
                  <div class="headline" style="margin-top:8px;color:#FFFFFF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:26px;line-height:32px;font-weight:800;letter-spacing:-0.02em;">
                    ${o.headline}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Blue accent bar -->
        <tr><td style="height:3px;background:linear-gradient(90deg,transparent 0%,${accent} 50%,transparent 100%);"></td></tr>

        <!-- Body card -->
        <tr>
          <td class="pad" style="padding:30px 32px 28px 32px;color:#E2E8F0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.65;">
            ${o.body}

            ${
              o.cta
                ? `
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:22px;">
              <tr>
                <td align="left">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="btn" style="border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;">
                    <tr>
                      <td style="border-radius:12px;background:linear-gradient(135deg,${accent} 0%,#0052CC 100%);box-shadow:0 10px 24px -12px ${accent};">
                        <a href="${esc(o.cta.url)}" target="_blank" style="display:inline-block;padding:13px 22px;color:#FFFFFF;font-weight:700;font-size:14px;letter-spacing:0.01em;">
                          ${esc(o.cta.label)} &nbsp;→
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>`
                : ''
            }

            <div style="margin-top:28px;padding-top:18px;border-top:1px solid rgba(148,163,184,0.12);color:#94A3B8;font-size:13px;line-height:1.6;">
              ${signature}
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="pad" align="center" style="padding:18px 32px 28px 32px;background:linear-gradient(180deg,#070B14 0%,#050810 100%);border-top:1px solid rgba(0,102,255,0.1);">
            <div style="color:#64748B;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;line-height:1.7;">
              <strong style="color:#94A3B8;">CrifTech</strong> &middot; Engineering Modern Digital Products &amp; AI Systems<br />
              ${esc(o.footerExtra || 'Sent via Brevo transactional email. Replies route directly to CrifTech support.')}
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/* --------------------------------------------------------------------
 * Specific email templates
 * ------------------------------------------------------------------ */

function newsletterWelcomeHtml(firstName: string, source?: string): string {
  return emailShell({
    eyebrow: 'Newsletter · Subscription Confirmed',
    headline: `You're on the list, ${firstName} 👋`,
    accent: '#0066FF',
    body: `
        <p style="margin:0 0 6px 0;">
          This is your official confirmation — you're now subscribed to the CrifTech Dispatch newsletter.
          We only email you when it actually matters, never for filler.
        </p>

        <div style="background:linear-gradient(180deg,#0C1530 0%,#091125 100%);border:1px solid rgba(0,102,255,0.22);border-radius:14px;padding:16px 18px;margin:18px 0 10px 0;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <div style="color:#64748B;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Status</div>
            <div style="display:inline-flex;align-items:center;gap:8px;padding:4px 10px;border-radius:999px;background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.35);color:#4ADE80;font-size:11.5px;font-weight:700;">
              <span style="width:6px;height:6px;border-radius:999px;background:#4ADE80;"></span>
              Subscription active
            </div>
          </div>
          ${source ? `<div style="margin-top:8px;color:#94A3B8;font-size:12px;"><span style="color:#64748B;font-weight:700;">Source:</span> <span style="color:#CBD5E1;">${esc(source)}</span></div>` : ''}
        </div>

        <ul style="margin:10px 0 4px 0;padding:0 0 0 18px;color:#CBD5E1;">
          <li style="margin-bottom:6px;"><strong>Case studies &amp; deep-dives</strong> — real production builds we ship for clients.</li>
          <li style="margin-bottom:6px;"><strong>New capability announcements</strong> — AI systems, product development, design &amp; growth.</li>
          <li><strong>Quarterly engineering letters</strong> — tooling, wins, lessons learned, no filler.</li>
        </ul>
      `,
    cta: { label: 'Explore our services', url: 'https://criftech.com/services' },
    footerExtra: 'If you ever want off the list, just reply to this email with “unsubscribe”.'
  });
}

function newsletterAdminAlertHtml(email: string, source?: string, prettyName?: string): string {
  const local = prettyName || (email.split('@')[0] || email);
  const displayName = prettyName || local;
  return emailShell({
    eyebrow: 'Admin Alert · Newsletter',
    headline: `New subscriber: ${displayName}`,
    accent: '#22C55E',
    body: `
        <p style="margin:0 0 14px 0;">A new visitor just subscribed to the CrifTech Dispatch newsletter. Hit <strong style="color:#FFFFFF;">Reply</strong> to this email to reach them directly (reply-to is already set to their address).</p>

        <div style="background:linear-gradient(180deg,#081713 0%,#06110D 100%);border:1px solid rgba(34,197,94,0.18);border-radius:14px;padding:18px;margin:6px 0 10px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Name</td>
              <td style="padding:4px 0;color:#FFFFFF;font-size:14px;">${esc(displayName)}</td>
            </tr>
            <tr>
              <td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Email</td>
              <td style="padding:4px 0;color:#FFFFFF;font-size:14px;">
                <a href="mailto:${esc(email)}" style="color:#86EFAC;text-decoration:none;">${esc(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Source</td>
              <td style="padding:4px 0;color:#CBD5E1;font-size:13px;">${esc(source || 'Website newsletter form')}</td>
            </tr>
            <tr>
              <td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Timestamp</td>
              <td style="padding:4px 0;color:#94A3B8;font-size:12.5px;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>

        <p style="margin:4px 0 0 0;color:#94A3B8;font-size:12.5px;">
          A separate <strong style="color:#CBD5E1;">"⏳ You're on the list"</strong> branded confirmation was auto-sent to this subscriber at the same time.
        </p>
      `,
    signature: '— CrifTech server · admin alerts'
  });
}

function contactConfirmationHtml(name: string, inquiry: { subject?: string; message: string }): string {
  const firstName = name.split(/\s+/)[0] || name;
  return emailShell({
    eyebrow: 'Message Received · Confirmation',
    headline: `Thanks, ${firstName} — your request is in.`,
    accent: '#0066FF',
    body: `
        <p style="margin:0 0 6px 0;">
          We got your message and a real human on the CrifTech team will reply within <strong style="color:#FFFFFF;">1 business day</strong>.
          Your case ID for this inquiry is shown below — if you reply to this email, keep it in the subject line so we can thread everything.
        </p>

        <div style="background:linear-gradient(180deg,#0C1530 0%,#091125 100%);border:1px solid rgba(0,102,255,0.22);border-radius:14px;padding:16px 18px;margin:18px 0 10px 0;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <div style="color:#64748B;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Status</div>
            <div style="display:inline-flex;align-items:center;gap:8px;padding:4px 10px;border-radius:999px;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.35);color:#F59E0B;font-size:11.5px;font-weight:700;">
              <span style="width:6px;height:6px;border-radius:999px;background:#F59E0B;"></span>
              Request pending · queued
            </div>
          </div>
          ${
            inquiry.subject
              ? `<div style="color:#94A3B8;font-size:12px;margin-top:8px;"><span style="color:#64748B;font-weight:700;">Subject:</span> <span style="color:#CBD5E1;">${esc(inquiry.subject)}</span></div>`
              : ''
          }
          <div style="margin-top:10px;padding-top:10px;border-top:1px dashed rgba(100,116,139,0.25);color:#CBD5E1;font-size:13px;line-height:1.7;white-space:pre-wrap;">${esc(inquiry.message)}</div>
        </div>

        <p style="margin:0;color:#94A3B8;font-size:12.5px;">
          If your need is urgent, reply <strong>“URGENT”</strong> anywhere in the subject and it will escalate to our engineering director directly.
        </p>
      `,
    cta: { label: 'Visit CrifTech', url: 'https://criftech.com' },
    footerExtra: 'This email was auto-sent - your reply goes straight to CrifTech.'
  });
}

function contactAdminAlertHtml(inquiry: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
}): string {
  return emailShell({
    eyebrow: 'Admin Alert · Contact Form',
    headline: `New message from ${inquiry.name}`,
    accent: '#F97316',
    body: `
        <p style="margin:0 0 14px 0;">Someone filled out the contact form on criftech.com. Below is the raw submission — hit <strong style="color:#FFFFFF;">Reply</strong> to answer them (reply-to is already set to the visitor's email).</p>

        <div style="background:linear-gradient(180deg,#10110B 0%,#0A0906 100%);border:1px solid rgba(249,115,22,0.2);border-radius:14px;padding:18px;margin:6px 0 0 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Name</td>
              <td style="padding:4px 0;color:#FFFFFF;font-size:14px;">${esc(inquiry.name)}</td>
            </tr>
            <tr>
              <td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Email</td>
              <td style="padding:4px 0;color:#93C5FD;font-size:13.5px;"><a href="mailto:${esc(inquiry.email)}" style="color:#93C5FD;">${esc(inquiry.email)}</a></td>
            </tr>
            ${
              inquiry.phone
                ? `<tr><td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Phone</td><td style="padding:4px 0;color:#CBD5E1;font-size:13px;">${esc(inquiry.phone)}</td></tr>`
                : ''
            }
            ${
              inquiry.company
                ? `<tr><td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Company</td><td style="padding:4px 0;color:#CBD5E1;font-size:13px;">${esc(inquiry.company)}</td></tr>`
                : ''
            }
            ${
              inquiry.subject
                ? `<tr><td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Subject</td><td style="padding:4px 0;color:#FFFFFF;font-size:13.5px;">${esc(inquiry.subject)}</td></tr>`
                : ''
            }
          </table>
          <div style="margin-top:14px;padding-top:14px;border-top:1px dashed rgba(100,116,139,0.3);color:#E2E8F0;font-size:13.5px;line-height:1.7;white-space:pre-wrap;">${esc(inquiry.message)}</div>
        </div>
      `,
    signature: '— CrifTech server · contact-form alerts',
    footerExtra: 'The visitor has already received a separate “request pending” confirmation email.'
  });
}

function bookCallConfirmationHtml(name: string, slot: { date?: string; time?: string; notes?: string } = {}): string {
  const firstName = name.split(/\s+/)[0] || name;
  return emailShell({
    eyebrow: 'Book a Call · Confirmed',
    headline: `${firstName}, your call slot is held.`,
    accent: '#8B5CF6',
    body: `
        <p style="margin:0 0 12px 0;">
          Awesome. We've blocked a 30-minute discovery call on our calendar for the details below.
          A calendar invite with Zoom / Google Meet link will be sent separately by our ops team within the next hour.
        </p>

        <div style="background:linear-gradient(180deg,#0F0A22 0%,#0A0718 100%);border:1px solid rgba(139,92,246,0.22);border-radius:14px;padding:18px;margin:14px 0 10px 0;">
          ${
            slot.date
              ? `<div style="margin-bottom:10px;"><div style="color:#64748B;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:2px;">Date</div><div style="color:#FFFFFF;font-size:14.5px;">${esc(slot.date)}</div></div>`
              : ''
          }
          ${
            slot.time
              ? `<div style="margin-bottom:10px;"><div style="color:#64748B;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:2px;">Time (your local)</div><div style="color:#FFFFFF;font-size:14.5px;">${esc(slot.time)}</div></div>`
              : ''
          }
          ${
            slot.notes
              ? `<div style="padding-top:10px;border-top:1px dashed rgba(100,116,139,0.3);"><div style="color:#64748B;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:4px;">Notes</div><div style="color:#CBD5E1;font-size:13px;line-height:1.6;white-space:pre-wrap;">${esc(slot.notes)}</div></div>`
              : ''
          }
          ${
            !slot.date && !slot.time && !slot.notes
              ? `<div style="color:#CBD5E1;font-size:13px;line-height:1.6;">We've captured your request — our team will reply with 3 specific time slots to choose from within 1 business day.</div>`
              : ''
          }
        </div>

        <p style="margin:6px 0 0 0;color:#94A3B8;font-size:12.5px;">
          Before the call, feel free to reply with: (1) a 1-paragraph problem statement, (2) any deadlines,
          (3) links to existing product/docs — the more context, the denser the conversation.
        </p>
      `,
    cta: { label: 'Prep: Review our services', url: 'https://criftech.com/services' }
  });
}

function bookCallAdminAlertHtml(name: string, email: string, slot: { date?: string; time?: string; notes?: string } = {}): string {
  return emailShell({
    eyebrow: 'Admin Alert · Book a Call',
    headline: `Discovery call requested: ${name}`,
    accent: '#8B5CF6',
    body: `
        <p style="margin:0 0 12px 0;">A visitor requested a discovery call via the “Book a Call” CTA on criftech.com.</p>
        <div style="background:linear-gradient(180deg,#0F0A22 0%,#0A0718 100%);border:1px solid rgba(139,92,246,0.22);border-radius:14px;padding:18px;margin:6px 0 0 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Name</td>
              <td style="padding:4px 0;color:#FFFFFF;font-size:14px;">${esc(name)}</td>
            </tr>
            <tr>
              <td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Email</td>
              <td style="padding:4px 0;color:#C4B5FD;font-size:13.5px;"><a href="mailto:${esc(email)}" style="color:#C4B5FD;">${esc(email)}</a></td>
            </tr>
            ${slot.date ? `<tr><td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Preferred date</td><td style="padding:4px 0;color:#CBD5E1;font-size:13px;">${esc(slot.date)}</td></tr>` : ''}
            ${slot.time ? `<tr><td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Preferred time</td><td style="padding:4px 0;color:#CBD5E1;font-size:13px;">${esc(slot.time)}</td></tr>` : ''}
            ${slot.notes ? `<tr><td style="padding:4px 10px 4px 0;color:#64748B;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Notes</td><td style="padding:4px 0;color:#CBD5E1;font-size:13px;line-height:1.6;white-space:pre-wrap;">${esc(slot.notes)}</td></tr>` : ''}
          </table>
        </div>
      `,
    signature: '— CrifTech server ·  book-a-call alerts'
  });
}

/* --------------------------------------------------------------------
 * Delivery layer: REST API → SMTP fallback → never throw
 * ------------------------------------------------------------------ */

async function sendViaRest(params: BrevoSendParams): Promise<any> {
  const cfg = getBrevoConfig();
  const apiKey = cfg.apiKey;
  if (!apiKey) throw new Error('BREVO_API_KEY is not configured');

  const senderName = cfg.senderName;
  const senderEmail = cfg.senderEmail;

  const toList = ensureTo(params.to);
  const recipients = toList.map((t) => t.email).join(', ');

  const payload: any = {
    sender: { name: senderName, email: senderEmail },
    to: toList.map((t) => ({ email: t.email, name: t.name || t.email.split('@')[0] })),
    subject: params.subject,
    htmlContent: params.html || buildHtml(params),
    ...(params.text ? { textContent: params.text } : {}),
    ...(params.cc?.length ? { cc: params.cc } : {}),
    ...(params.bcc?.length ? { bcc: params.bcc } : {}),
    ...(params.replyTo ? { replyTo: { email: params.replyTo.email, name: params.replyTo.name || params.replyTo.email.split('@')[0] } } : {}),
    ...(params.tags?.length ? { tags: params.tags } : {}),
    ...(params.attachments?.length
      ? { attachment: params.attachments.map((a) => ({ name: a.name, content: a.content })) }
      : {})
  };

  console.log(`[BREVO] REST → sending subject="${params.subject}" to=[${recipients}] tags=[${(params.tags || []).join(', ')}]`);

  const res = await fetch(`${BREVO_API_BASE}/smtp/email`, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const body = await res.text();
  let data: any = body;
  try { data = JSON.parse(body); } catch { /* ignore */ }

  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) ||
      `Brevo REST API returned HTTP ${res.status}`;
    console.error(`[BREVO] REST ✗ FAILED for subject="${params.subject}" HTTP ${res.status}: ${msg}`);
    throw new Error(msg);
  }
  const messageId = (data && (data.messageId || data.message_id)) || '(no message-id returned)';
  console.log(`[BREVO] REST ✓ DELIVERED subject="${params.subject}" messageId=${messageId}`);
  return { channel: 'rest', ...(typeof data === 'object' ? data : { raw: data }) };
}

let _smtpTransport: any = null;
function getSmtpTransport() {
  if (_smtpTransport) return _smtpTransport;
  const cfg = getBrevoConfig();
  const host = cfg.smtpHost;
  const port = Number(cfg.smtpPort);
  const user = cfg.smtpUser;
  const pass = cfg.smtpPass;
  if (!user || !pass) throw new Error('Brevo SMTP credentials are not configured');
  // Modern TLS (TLSv1.2+) only. SSLv3 ciphers were deprecated in 2015 and
  // Brevo's SMTP relay (and every modern ESP) will refuse handshakes with them.
  // For STARTTLS ports (587, 2525) we let nodemailer upgrade automatically.
  const tlsOpts =
    port === 465
      ? { rejectUnauthorized: true, minVersion: 'TLSv1.2' as const }
      : { rejectUnauthorized: false, minVersion: 'TLSv1.2' as const };
  _smtpTransport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: tlsOpts
  } as any);
  return _smtpTransport;
}

/* --------------------------------------------------------------------
 * THIRD FALLBACK: Gmail SMTP Relay (smtp.gmail.com)
 *
 * Always works for @gmail.com senders (sends DIRECTLY through Google's
 * servers, not Brevo's). Authentication uses a Google "App Password"
 * (16 chars, spaces ignored), NOT the Gmail account password.
 *
 * Setup:
 *   1. Google Account → Security → 2-Step Verification → must be ON.
 *   2. Google Account → Security → App passwords → Generate (select
 *      "Mail" + "Windows Computer").
 *   3. Paste the 16-char password into .env GMAIL_SMTP_PASS (spaces ok).
 *   4. GMAIL_SMTP_USER defaults to BREVO_SENDER_EMAIL automatically.
 * ------------------------------------------------------------------ */
let _gmailSmtpTransport: any = null;
function getGmailSmtpTransport() {
  if (_gmailSmtpTransport) return _gmailSmtpTransport;
  const cfg = getBrevoConfig();
  const user = cfg.gmailSmtpUser;
  const pass = cfg.gmailSmtpPass;
  if (!user || !pass) throw new Error('GMAIL_SMTP_PASS is not configured');
  if (!isFreeEmailSender(user) || !user.toLowerCase().endsWith('@gmail.com')) {
    throw new Error(`Gmail SMTP relay requires GMAIL_SMTP_USER to end with @gmail.com, got "${user}"`);
  }
  // App passwords have spaces for readability — Google accepts them, nodemailer
  // doesn't, so strip them here.
  const normalizedPass = String(pass).replace(/\s+/g, '');
  _gmailSmtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass: normalizedPass },
    tls: { rejectUnauthorized: true, minVersion: 'TLSv1.2' as const }
  } as any);
  return _gmailSmtpTransport;
}

/** True when the Gmail SMTP fallback channel is ready to use. */
export function gmailSmtpAvailable(): boolean {
  try {
    const cfg = getBrevoConfig();
    return Boolean(cfg.gmailSmtpPass) && cfg.gmailSmtpUser.toLowerCase().endsWith('@gmail.com');
  } catch {
    return false;
  }
}

async function sendViaGmailSmtp(params: BrevoSendParams): Promise<any> {
  const transport = getGmailSmtpTransport();
  const cfg = getBrevoConfig();
  const senderName = cfg.senderName;
  const senderEmail = cfg.gmailSmtpUser;

  const toList = ensureTo(params.to);
  const recipients = toList.map((t) => t.email).join(', ');
  console.log(
    `[BREVO] GMAIL-SMTP → sending subject="${params.subject}" to=[${recipients}] via smtp.gmail.com:465 (as ${senderEmail})`
  );
  try {
    const ready = await transport.verify();
    if (!ready) throw new Error('Gmail SMTP transport.verify() returned false');
    console.log(`[BREVO] GMAIL-SMTP → handshake OK with smtp.gmail.com:465`);
  } catch (verifyErr: any) {
    throw new Error(
      `Gmail SMTP handshake FAILED: ${verifyErr?.message || verifyErr}. ` +
        `Hint: GMAIL_SMTP_PASS must be a 16-char Google "App Password" (NOT your account password), ` +
        `and 2-Step Verification must be ON for ${senderEmail}.`
    );
  }

  const info = await transport.sendMail({
    from: `"${senderName}" <${senderEmail}>`,
    to: toList.map((t) => (t.name ? `"${t.name}" <${t.email}>` : t.email)),
    ...(params.cc?.length ? { cc: params.cc.map((t) => (t.name ? `"${t.name}" <${t.email}>` : t.email)) } : {}),
    ...(params.bcc?.length ? { bcc: params.bcc.map((t) => (t.name ? `"${t.name}" <${t.email}>` : t.email)) } : {}),
    ...(params.replyTo ? { replyTo: params.replyTo.name ? `"${params.replyTo.name}" <${params.replyTo.email}>` : params.replyTo.email } : {}),
    subject: params.subject,
    html: params.html || buildHtml(params),
    ...(params.text ? { text: params.text } : {}),
    ...(params.attachments?.length
      ? {
          attachments: params.attachments.map((a) => ({
            filename: a.name,
            content: Buffer.from(a.content, 'base64')
          }))
        }
      : {})
  });
  console.log(
    `[BREVO] GMAIL-SMTP ✓ DELIVERED subject="${params.subject}" messageId=${info?.messageId || 'n/a'} response=${info?.response || 'n/a'}`
  );
  return { channel: 'gmail-smtp' as const, messageId: info?.messageId, response: info?.response || '' };
}

async function sendViaSmtp(params: BrevoSendParams): Promise<any> {
  const transport = getSmtpTransport();
  const cfg = getBrevoConfig();
  const senderName = cfg.senderName;
  const senderEmail = cfg.senderEmail;

  const toList = ensureTo(params.to);
  const recipients = toList.map((t) => t.email).join(', ');
  console.log(
    `[BREVO] SMTP → sending subject="${params.subject}" to=[${recipients}] via ${cfg.smtpHost}:${cfg.smtpPort}`
  );

  // Nodemailer connection readiness check. If this fails, we throw (so the
  // REST fallback gets a real chance to fire) instead of silently hanging.
  try {
    const ready = await transport.verify();
    if (!ready) throw new Error('SMTP transport.verify() returned false');
    console.log(`[BREVO] SMTP → handshake OK with ${cfg.smtpHost}:${cfg.smtpPort}`);
  } catch (verifyErr: any) {
    throw new Error(
      `SMTP handshake FAILED with ${cfg.smtpHost}:${cfg.smtpPort}: ${verifyErr?.message || verifyErr}`
    );
  }

  const info = await transport.sendMail({
    from: `"${senderName}" <${senderEmail}>`,
    to: toList.map((t) => (t.name ? `"${t.name}" <${t.email}>` : t.email)),
    ...(params.cc?.length ? { cc: params.cc.map((t) => (t.name ? `"${t.name}" <${t.email}>` : t.email)) } : {}),
    ...(params.bcc?.length ? { bcc: params.bcc.map((t) => (t.name ? `"${t.name}" <${t.email}>` : t.email)) } : {}),
    ...(params.replyTo ? { replyTo: params.replyTo.name ? `"${params.replyTo.name}" <${params.replyTo.email}>` : params.replyTo.email } : {}),
    subject: params.subject,
    html: params.html || buildHtml(params),
    ...(params.text ? { text: params.text } : {}),
    ...(params.attachments?.length
      ? {
          attachments: params.attachments.map((a) => ({
            filename: a.name,
            content: Buffer.from(a.content, 'base64')
          }))
        }
      : {})
  });
  console.log(
    `[BREVO] SMTP ✓ DELIVERED subject="${params.subject}" messageId=${info?.messageId || 'n/a'} response=${info?.response || 'n/a'}`
  );
  return { channel: 'smtp', messageId: info?.messageId, response: info?.response || '' };
}

function buildHtml({ subject, text, html }: Pick<BrevoSendParams, 'subject' | 'text' | 'html'>): string {
  if (html) return html;
  return emailShell({
    headline: subject,
    body: `<p style="margin:0;color:#CBD5E1;white-space:pre-wrap;line-height:1.7;">${esc(text || '')}</p>`
  });
}

/**
 * Core send function. NEVER throws (callers rely on that contract so the DB
 * save + HTTP response paths stay untouched).
 *
 * Send-order policy:
 *   - Custom-domain sender (e.g. hello@criftech.com) → REST-first, Brevo SMTP fallback.
 *     For this to deliver you MUST authenticate the domain in Brevo dashboard
 *     (Senders → Domains → add DKIM/SPF DNS records).
 *   - Free-email sender (gmail.com, outlook.com, etc.) → Brevo SMTP-first,
 *     REST fallback. REST will silently accept + drop these sends because
 *     free-email domains cannot be DNS-authenticated.
 *   - FINAL GUARANTEED FALLBACK: If the configured sender is a @gmail.com
 *     account AND GMAIL_SMTP_PASS (Google App Password) is set in .env,
 *     we will try Gmail SMTP relay as the very LAST channel. This sends
 *     DIRECTLY through Google's own servers and will always deliver for
 *     gmail.com senders, regardless of Brevo's policies.
 */
export async function sendBrevoEmail(params: BrevoSendParams): Promise<{
  ok: boolean;
  channel?: 'rest' | 'smtp' | 'gmail-smtp';
  result?: any;
  error?: string;
}> {
  const toList = ensureTo(params.to);
  const recipients = toList.map((t) => t.email).join(', ');
  const cfg = getBrevoConfig();
  // effectiveSendOrder() returns the 3-channel-aware preferred order that
  // prioritizes Gmail SMTP FIRST for @gmail senders (bypasses Brevo's
  // sender-authentication "suspended" silent-drop policy entirely).
  const order: Array<'rest' | 'smtp' | 'gmail-smtp'> = effectiveSendOrder(cfg.senderEmail);
  const gmailOk = order.includes('gmail-smtp') || gmailSmtpAvailable();
  console.log(
    `[BREVO] sendBrevoEmail ENTRY — subject="${params.subject}" to=[${recipients}] ` +
      `tags=[${(params.tags || []).join(', ')}] sender="${cfg.senderEmail}" ` +
      `order=${order.join('→')}` +
      (gmailOk ? ' (Gmail SMTP ready)' : '')
  );

  for (const channel of order) {
    try {
      let result: any;
      if (channel === 'rest') result = await sendViaRest(params);
      else if (channel === 'smtp') result = await sendViaSmtp(params);
      else result = await sendViaGmailSmtp(params);
      const channelLabel =
        channel === 'rest' ? 'REST' : channel === 'smtp' ? 'SMTP' : 'GMAIL-SMTP';
      const msgId =
        result?.messageId ||
        result?.message_id ||
        (channel !== 'rest' ? result?.messageId : undefined) ||
        'n/a';
      console.log(
        `[BREVO] sendBrevoEmail SUCCESS — channel=${channelLabel} subject="${params.subject}" messageId=${msgId}`
      );
      return { ok: true, channel, result };
    } catch (err: any) {
      const channelLabel =
        channel === 'rest' ? 'REST' : channel === 'smtp' ? 'SMTP' : 'GMAIL-SMTP';
      const idx = order.indexOf(channel);
      const remaining = order.slice(idx + 1);
      const fallBackMsg =
        remaining.length === 0 ? ' — NO FALLBACK LEFT' : ` — falling back to ${remaining.map(c => c.toUpperCase()).join('→')}`;
      console.warn(
        `[BREVO] ${channelLabel} channel FAILED for subject="${params.subject}"${fallBackMsg}. Reason: ${
          err?.message || err
        }`
      );
    }
  }

  const finalError =
    `All ${order.length} channels failed. Sender="${cfg.senderEmail}" order=${order.join('→')}. ` +
    (gmailOk
      ? 'Gmail SMTP was tried last and also failed — double-check GMAIL_SMTP_PASS is a valid 16-char Google App Password.'
      : 'If sender is @gmail.com, add GMAIL_SMTP_PASS (Google App Password) to .env for a guaranteed-delivery fallback.');
  console.error(
    `[BREVO] sendBrevoEmail FAILURE — ALL CHANNELS FAILED for subject="${params.subject}" to=[${recipients}]. ${finalError}`
  );
  return { ok: false, error: finalError };
}

/* --------------------------------------------------------------------
 * Site-wide Brevo notifiers (use these from server.ts).
 * Each is fire-and-forget safe; none throw.
 * ------------------------------------------------------------------ */

/** Newsletter signup: fires on the EXISTING /api/leads endpoint (post DB save).
 *
 *  Deliberately mirrors notifyContactForm's EXACT SEND METHOD:
 *    - SAME two-block structure: 1) admin alert FIRST  2) visitor confirmation SECOND
 *    - SAME sender (Gmail SMTP 1st → REST → Brevo SMTP fallback chain)
 *    - SAME branding shell (emailShell)
 *    - SAME subject-line convention:
 *        admin alert    →  "[Newsletter] New subscriber · me@domain.com"
 *        confirmation   →  "⏳ You're on the list, <Name>"
 *    - SAME reply-to wiring: admin alert has replyTo = the subscriber email
 *      (so admins can hit Reply and it goes STRAIGHT to the user, no copy-paste)
 *    - SAME logging pattern & OK@channel / FAIL result summary line
 */
export async function notifyNewsletterSignup(email: string, source?: string) {
  const firstName = (email.split('@')[0] || 'Subscriber').replace(/[._-]/g, ' ');
  const prettyName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const srcLabel = source || 'Footer Newsletter';

  console.log(
    `[BREVO] NOTIFIER ENTRY → notifyNewsletterSignup(name="${prettyName}", email="${email}", source="${srcLabel}")`
  );
  const adminEmail = getBrevoConfig().adminAlertEmail;

  let adminOk = false;
  let adminChannel: string | undefined;
  let confirmOk = false;
  let confirmChannel: string | undefined;

  // 1) Admin alert FIRST — with replyTo = subscriber email (same as contact page).
  {
    const res = await sendBrevoEmail({
      to: { email: adminEmail, name: 'CrifTech Admin' },
      replyTo: { email, name: prettyName },
      subject: `[Newsletter] New subscriber · ${email}${srcLabel ? ` — ${srcLabel}` : ''}`,
      html: newsletterAdminAlertHtml(email, source, prettyName),
      tags: ['admin-alert', 'newsletter', 'criftech']
    });
    adminOk = res.ok;
    adminChannel = res.channel;
    if (!res.ok) {
      console.warn(
        `[BREVO] NOTIFIER notifyNewsletterSignup — admin alert FAILED. Error: ${res.error || 'unknown'}`
      );
    }
  }

  // 2) Confirmation to the subscriber SECOND — "⏳ You're on the list, <Name>".
  //    Mirrors notifyContactForm's visitor-confirmation block exactly.
  {
    const res = await sendBrevoEmail({
      to: { email, name: prettyName },
      subject: `⏳ You're on the list, ${prettyName}`,
      html: newsletterWelcomeHtml(prettyName, source),
      tags: ['newsletter', 'auto-reply', 'welcome', 'criftech']
    });
    confirmOk = res.ok;
    confirmChannel = res.channel;
    if (!res.ok) {
      console.warn(
        `[BREVO] NOTIFIER notifyNewsletterSignup — subscriber confirmation FAILED. Error: ${
          res.error || 'unknown'
        }`
      );
    }
  }

  console.log(
    `[BREVO] NOTIFIER RESULT → notifyNewsletterSignup(name="${prettyName}", email="${email}"): ` +
      `admin-alert=${adminOk ? 'OK@' + (adminChannel || '?') : 'FAIL'} | ` +
      `subscriber-confirmation=${confirmOk ? 'OK@' + (confirmChannel || '?') : 'FAIL'}`
  );
}

/** Contact form submission: fires on EXISTING /api/mails endpoint (post DB save). */
export async function notifyContactForm(inquiry: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
}) {
  console.log(
    `[BREVO] NOTIFIER ENTRY → notifyContactForm(name="${inquiry.name}", email="${
      inquiry.email
    }", subject="${inquiry.subject || '(none)'}")`
  );
  const adminEmail = getBrevoConfig().adminAlertEmail;

  let adminOk = false;
  let adminChannel: string | undefined;
  let confirmOk = false;
  let confirmChannel: string | undefined;

  // 1) Forward to admins with replyTo = visitor email → Reply goes straight to them.
  {
    const res = await sendBrevoEmail({
      to: { email: adminEmail, name: 'CrifTech Admin' },
      replyTo: { email: inquiry.email, name: inquiry.name },
      subject: `[Contact] ${inquiry.subject ? inquiry.subject : `New message from ${inquiry.name}`}`,
      html: contactAdminAlertHtml(inquiry),
      tags: ['admin-alert', 'contact-form', 'criftech']
    });
    adminOk = res.ok;
    adminChannel = res.channel;
    if (!res.ok) {
      console.warn(
        `[BREVO] NOTIFIER notifyContactForm — admin alert FAILED. Error: ${res.error || 'unknown'}`
      );
    }
  }

  // 2) Auto-confirmation to the visitor: "your request is pending, we reply within 1 business day."
  {
    const res = await sendBrevoEmail({
      to: { email: inquiry.email, name: inquiry.name },
      subject:
        inquiry.subject
          ? `⏳ Request received — ${inquiry.subject}`
          : `⏳ We received your message, ${inquiry.name.split(/\s+/)[0]}`,
      html: contactConfirmationHtml(inquiry.name, { subject: inquiry.subject, message: inquiry.message }),
      tags: ['contact-form', 'auto-reply', 'criftech']
    });
    confirmOk = res.ok;
    confirmChannel = res.channel;
    if (!res.ok) {
      console.warn(
        `[BREVO] NOTIFIER notifyContactForm — visitor confirmation FAILED. Error: ${
          res.error || 'unknown'
        }`
      );
    }
  }

  console.log(
    `[BREVO] NOTIFIER RESULT → notifyContactForm(name="${inquiry.name}", email="${inquiry.email}"): ` +
      `admin-alert=${adminOk ? 'OK@' + (adminChannel || '?') : 'FAIL'} | ` +
      `visitor-confirmation=${confirmOk ? 'OK@' + (confirmChannel || '?') : 'FAIL'}`
  );
}

/**
 * Book-a-call notifier — site-wide helper for any "Book a Call" CTA flow
 * (Navbar / Hero / CTA banner / etc.). Wire a new POST /api/book-call that
 * accepts { name, email, date?, time?, notes? }, save nothing (or to mails
 * if you want), then fire this. No existing flows are touched today.
 */
export async function notifyBookCall(payload: {
  name: string;
  email: string;
  date?: string;
  time?: string;
  notes?: string;
}) {
  console.log(
    `[BREVO] NOTIFIER ENTRY → notifyBookCall(name="${payload.name}", email="${
      payload.email
    }", date="${payload.date || ''}", time="${payload.time || ''}")`
  );
  const adminEmail = getBrevoConfig().adminAlertEmail;

  let adminOk = false;
  let adminChannel: string | undefined;
  let confirmOk = false;
  let confirmChannel: string | undefined;

  {
    const res = await sendBrevoEmail({
      to: { email: adminEmail, name: 'CrifTech Admin' },
      replyTo: { email: payload.email, name: payload.name },
      subject: `[Book a Call] ${payload.name} <${payload.email}>`,
      html: bookCallAdminAlertHtml(payload.name, payload.email, {
        date: payload.date,
        time: payload.time,
        notes: payload.notes
      }),
      tags: ['admin-alert', 'book-a-call', 'criftech']
    });
    adminOk = res.ok;
    adminChannel = res.channel;
    if (!res.ok) {
      console.warn(
        `[BREVO] NOTIFIER notifyBookCall — admin alert FAILED. Error: ${res.error || 'unknown'}`
      );
    }
  }

  {
    const res = await sendBrevoEmail({
      to: { email: payload.email, name: payload.name },
      subject: `📞 Discovery call confirmed${payload.date ? ` · ${payload.date}` : ''}`,
      html: bookCallConfirmationHtml(payload.name, {
        date: payload.date,
        time: payload.time,
        notes: payload.notes
      }),
      tags: ['book-a-call', 'auto-reply', 'criftech']
    });
    confirmOk = res.ok;
    confirmChannel = res.channel;
    if (!res.ok) {
      console.warn(
        `[BREVO] NOTIFIER notifyBookCall — visitor confirmation FAILED. Error: ${
          res.error || 'unknown'
        }`
      );
    }
  }

  console.log(
    `[BREVO] NOTIFIER RESULT → notifyBookCall(name="${payload.name}", email="${payload.email}"): ` +
      `admin-alert=${adminOk ? 'OK@' + (adminChannel || '?') : 'FAIL'} | ` +
      `visitor-confirmation=${confirmOk ? 'OK@' + (confirmChannel || '?') : 'FAIL'}`
  );
}

// Export templates too for any future reuse
export {
  newsletterWelcomeHtml,
  newsletterAdminAlertHtml,
  contactConfirmationHtml,
  contactAdminAlertHtml,
  bookCallConfirmationHtml,
  bookCallAdminAlertHtml,
  emailShell
};
