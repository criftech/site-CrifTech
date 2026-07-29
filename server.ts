import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

// --- ENV PRELOAD ---
// Load .env BEFORE any further module imports (e.g. server/brevo.ts reads
// process.env inside its BREVO_CONFIG export at module-eval time). Without
// this preload, Brevo credentials can come back empty even though dotenv
// was called inside startServer().
dotenv.config();

import { 
  connectDB, 
  isDbConnected,
  getSettingsData,
  saveSettingsData,
  getServicesData,
  addServiceData,
  updateServiceData,
  deleteServiceData,
  getCaseStudiesData,
  addCaseStudyData,
  updateCaseStudyData,
  deleteCaseStudyData,
  getTeamData,
  addTeamData,
  updateTeamData,
  deleteTeamData,
  getLeadsData,
  addLeadData,
  deleteLeadData,
  getMailsData,
  addMailData,
  updateMailData,
  deleteMailData,
  resetMemoryAndDB
} from './server/db.js';
import { notifyNewsletterSignup, notifyContactForm, notifyBookCall, sendBrevoEmail, BREVO_CONFIG, getBrevoConfig, diagnoseBrevoEnv, isFreeEmailSender, preferredSendOrder, gmailSmtpAvailable, listBrevoSenders, createBrevoSender, resendBrevoSenderVerification } from './server/brevo.js';

async function configureApp(app: express.Express, options?: { vite?: boolean; staticServe?: boolean }) {
  const vite = options?.vite ?? process.env.NODE_ENV !== 'production';
  const staticServe = options?.staticServe ?? process.env.NODE_ENV === 'production';

  // Note: .env already loaded at module top (see dotenv.config() above imports).
  // Re-read env FRESH via getBrevoConfig() at runtime (not the import-time snapshot).
  const envSnapshot = diagnoseBrevoEnv();
  const runtimeCfg = getBrevoConfig();
  const brevoCredsLoaded =
    Boolean(runtimeCfg.apiKey) &&
    Boolean(runtimeCfg.smtpUser) &&
    Boolean(runtimeCfg.smtpPass);
  const senderIsFree = isFreeEmailSender(runtimeCfg.senderEmail);
  const sendOrderBase = preferredSendOrder(runtimeCfg.senderEmail);
  const gmailReady = gmailSmtpAvailable();
  const sendOrderLabel = gmailReady
    ? `${sendOrderBase[0]}→${sendOrderBase[1]}→gmail-smtp`
    : `${sendOrderBase[0]}→${sendOrderBase[1]}`;
  console.log('');
  console.log('──────────────────────────────────────────────────────────────────');
  console.log('[BREVO] Env diagnostics (dotenv injection point):');
  for (const [k, v] of Object.entries(envSnapshot)) {
    console.log(`  ${k.padEnd(28)} → ${v}`);
  }
  console.log(
    `[BREVO] Init (runtime fresh read) — API key: ${runtimeCfg.apiKey ? 'OK' : 'MISSING'}, ` +
      `SMTP user: ${runtimeCfg.smtpUser ? 'OK' : 'MISSING'}, ` +
      `SMTP pass: ${runtimeCfg.smtpPass ? 'OK' : 'MISSING'} — ` +
      `all-creds-loaded=${brevoCredsLoaded ? 'YES' : 'NO'}`
  );
  console.log(
    `[BREVO] Sender identity → "${runtimeCfg.senderName}" <${runtimeCfg.senderEmail}>; ` +
      `admin-alert inbox → <${runtimeCfg.adminAlertEmail}>; ` +
      `send-order=${sendOrderLabel}` +
      (gmailReady ? ' (Gmail SMTP ARMED)' : '')
  );
  if (!brevoCredsLoaded) {
    console.warn(
      '[BREVO] ⚠  Missing credentials — email sending will FAIL until BREVO_API_KEY, ' +
        'BREVO_SMTP_USER and BREVO_SMTP_PASS are set in .env.'
    );
  }
  if (senderIsFree) {
    console.warn('');
    console.warn('┌─────────────────────────────────────────────────────────────────────┐');
    console.warn('│ [BREVO] ⚠  FREE-EMAIL SENDER DETECTED                              │');
    console.warn(`│   Sender = "${runtimeCfg.senderEmail}"`);
    console.warn('│                                                                     │');
    console.warn('│ Why previous "DELIVERED" log lines had no inbox emails:            │');
    console.warn('│   Brevo REST API returns 200 OK + messageId for EVERY request,     │');
    console.warn('│   then SILENTLY drops sends FROM @gmail.com / @outlook.com etc.    │');
    console.warn('│   (Brevo REQUIRES sender-domain DKIM/SPF — impossible for Gmail).  │');
    console.warn('│   Brevo SMTP also said:                                            │');
    console.warn('│     → 535 5.7.8 Authentication failed                              │');
    console.warn('│   (your BREVO_SMTP_USER / PASS combo is rejected by Brevo SMTP)    │');
    console.warn('│                                                                     │');
    if (gmailReady) {
      console.warn('│ ✅ DELIVERABILITY FIX APPLIED: Gmail SMTP IS 1st IN SEND ORDER     │');
      console.warn('│   Order = Gmail SMTP → REST → Brevo SMTP                           │');
      console.warn('│   Emails now go DIRECTLY through Google servers FIRST, which     │');
      console.warn('│   bypasses Brevos sender-domain policy entirely. No Brevo creds  │');
      console.warn('│   matter for Gmail SMTP; only GMAIL_SMTP_PASS (App Password) does.│');
    } else {
      console.warn('│ FIXES APPLIED:                                                      │');
      console.warn('│   ✓ SMTP TLS upgraded from SSLv3 → TLSv1.2+                        │');
      console.warn('│   ✓ SMTP handshake verified via transport.verify() BEFORE sending │');
      console.warn('│                                                                     │');
      console.warn('│ ★ GUARANTEED DELIVERY IN 90 SECONDS — do THIS now:                │');
      console.warn('│   1. Open myaccount.google.com → Security → enable 2-Step VERIFY  │');
      console.warn('│      (for the same Gmail account in BREVO_SENDER_EMAIL)            │');
      console.warn('│   2. myaccount.google.com → App passwords → Generate → select:    │');
      console.warn('│      App: "Mail" · Device: "Windows Computer" → GET 16-CHAR PASS  │');
      console.warn('│   3. Add to .env:                                                  │');
      console.warn('│        GMAIL_SMTP_USER=usmancriftech@gmail.com                     │');
      console.warn('│        GMAIL_SMTP_PASS=abcd efgh ijkl mnop   (16 chars, spaces ok)│');
      console.warn('│   4. Restart server. Send-order auto-flips to Gmail=1st. Done.    │');
    }
    console.warn('│                                                                     │');
    console.warn('│ LONG-TERM FIX (10/10 deliverability with Brevo):                   │');
    console.warn('│   1. Register "criftech.com" as Sender Domain in Brevo dashboard   │');
    console.warn('│      (Senders → Domains → Add a domain → Authenticate DNS).        │');
    console.warn('│   2. Change .env BREVO_SENDER_EMAIL to hello@criftech.com          │');
    console.warn('│   3. send-order auto-flips back to REST→SMTP (faster).            │');
    console.warn('└─────────────────────────────────────────────────────────────────────┘');
    console.warn('');
  }
  console.log('──────────────────────────────────────────────────────────────────');
  console.log('');

  app.use(express.json({ limit: '10mb' }));

  // Attempt to connect to MongoDB Atlas (with non-blocking 3s timeout)
  await connectDB();

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    const connected = isDbConnected();
    res.json({ 
      status: 'ok', 
      database: connected ? 'MongoDB Atlas' : 'In-Memory Resilient Store',
      connected 
    });
  });

  // Admin Auth
  app.post('/api/auth/login', (req, res) => {
    const { password } = req.body;
    if (password === 'Crif@Tech513' || password === 'criftech2026admin' || password === 'admin') {
      return res.json({ success: true, token: 'criftech-admin-jwt-token-2026' });
    }
    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  });

  // Re-seed DB endpoint
  app.post('/api/seed', async (req, res) => {
    try {
      await resetMemoryAndDB();
      res.json({ success: true, message: 'Database reset and seeded successfully' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Book a Call — Brevo-only. Saves nothing to DB; never blocks existing flows.
  app.post('/api/book-call', async (req, res) => {
    try {
      const { name, email, date, time, notes } = req.body || {};
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required to book a call.' });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(email).trim())) {
        return res.status(400).json({ error: 'A valid email address is required.' });
      }
      console.log(
        `[server → BREVO] TRIGGER: book-a-call from name="${name}" email="${email}" ` +
          (date || time || notes ? `(date=${date || ''} time=${time || ''})` : '')
      );
      // Fire Brevo asynchronously (do not block HTTP return)
      notifyBookCall({ name, email, date, time, notes }).catch((e) =>
        console.warn('[server → BREVO] book-a-call notifier wrapper failed:', e?.message || e)
      );
      res.json({
        success: true,
        message:
          'Thanks — your call request is queued. CrifTech will reach out within 1 business day to confirm a specific time.'
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Brevo smoke test — one-click verification (open http://localhost:3000/api/brevo/smoke-test
  // in browser OR curl it). Uses both REST + SMTP channels and returns raw results.
  app.get('/api/brevo/smoke-test', async (req, res) => {
    const cfg = getBrevoConfig();
    const target = (req.query.email as string) || cfg.adminAlertEmail;
    const subject = '[Smoke Test] CrifTech ↔ Brevo integration';
    const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;line-height:1.6;">
      <h2 style="color:#0066FF;">Brevo Smoke Test Passed ✅</h2>
      <p>If you're reading this, Brevo is successfully delivering emails from the CrifTech server.</p>
      <ul>
        <li>API key: <strong>${cfg.apiKey ? 'LOADED' : 'MISSING'}</strong></li>
        <li>SMTP user: <strong>${cfg.smtpUser || 'MISSING'}</strong></li>
        <li>SMTP host:port: <strong>${cfg.smtpHost}:${cfg.smtpPort}</strong></li>
        <li>Sender email: <strong>${cfg.senderEmail}</strong></li>
      </ul>
      <p style="color:#64748B;font-size:12px;margin-top:24px;">Sent automatically from CrifTech server → Brevo gateway.</p>
    </div>`;
    const text =
      'Brevo Smoke Test Passed — If you are reading this, Brevo is delivering emails for CrifTech.';
    console.log(`[server → BREVO] SMOKE-TEST: sending to ${target}`);
    const result = await sendBrevoEmail({
      to: { email: target, name: 'CrifTech Brevo Smoke Test' },
      subject,
      html,
      text,
      tags: ['smoke-test', 'criftech']
    });
    console.log(`[server → BREVO] SMOKE-TEST RESULT for ${target}:`, JSON.stringify(result));
    res.json({
      success: result.ok,
      channel: result.channel || 'none',
      target,
      message: result.ok
        ? `Email delivered via ${result.channel} — check ${target} inbox.`
        : `Both Brevo channels failed. Error: ${result.error || 'Unknown'}`,
      raw: result
    });
  });

  // List all Brevo senders configured in the Brevo account.
  // Browser: open http://localhost:3000/api/brevo/senders
  app.get('/api/brevo/senders', async (req, res) => {
    console.log('[server → BREVO] SENDERS: list requested');
    const result = await listBrevoSenders();
    res.json({
      success: result.ok,
      count: result.count || 0,
      senders: result.senders,
      error: result.error,
      help: result.ok
        ? `You have ${result.count} sender(s). Each needs active:true before Brevo will send emails from it. If active=false, check the sender inbox for the Brevo verification email.`
        : undefined
    });
  });

  // Create a NEW Brevo sender.
  //   Default (no body): registers the .env BREVO_SENDER_EMAIL + BREVO_SENDER_NAME.
  //   With JSON body { email, name, ips? }: registers a custom one.
  //
  // Browser friendly via GET-query alias:
  //   http://localhost:3000/api/brevo/senders/create?email=hello@criftech.com&name=CrifTech
  app.post('/api/brevo/senders', async (req, res) => {
    const cfg = getBrevoConfig();
    const email: string = req.body?.email || cfg.senderEmail;
    const name: string = req.body?.name || cfg.senderName;
    const ips = req.body?.ips;
    console.log(
      `[server → BREVO] SENDERS: create requested email="${email}" name="${name}" ipsProvided=${
        Array.isArray(ips) && ips.length ? 'yes' : 'no'
      }`
    );
    const result = await createBrevoSender({ email, name, ips });
    if (result.ok) {
      res.status(201).json({
        success: true,
        id: result.id,
        dkimError: result.dkimError,
        spfError: result.spfError,
        created: { email, name },
        nextStep: result.nextStep
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error || 'Failed to create sender'
      });
    }
  });

  // GET convenience alias for /api/brevo/senders (create) — usable directly in browser URL bar.
  app.get('/api/brevo/senders/create', async (req, res) => {
    const cfg = getBrevoConfig();
    const email: string = (req.query.email as string) || cfg.senderEmail;
    const name: string = (req.query.name as string) || cfg.senderName;
    console.log(
      `[server → BREVO] SENDERS: create (GET alias) requested email="${email}" name="${name}"`
    );
    const result = await createBrevoSender({ email, name });
    if (result.ok) {
      res.status(201).json({
        success: true,
        id: result.id,
        dkimError: result.dkimError,
        spfError: result.spfError,
        created: { email, name },
        nextStep: result.nextStep
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error || 'Failed to create sender'
      });
    }
  });

  // Resend the Brevo verification email for a sender ID that hasn't been verified yet.
  //   POST /api/brevo/senders/:id/resend-verification
  //   Browser: http://localhost:3000/api/brevo/senders/15/resend-verification
  app.post('/api/brevo/senders/:id/resend-verification', async (req, res) => {
    const id = Number(req.params.id);
    console.log(`[server → BREVO] SENDERS: resend-verification requested for senderId=${id}`);
    const result = await resendBrevoSenderVerification(id);
    if (result.ok) {
      res.json({ success: true, senderId: id, nextStep: result.nextStep });
    } else {
      res.status(400).json({
        success: false,
        senderId: id,
        error: result.error || 'Failed to resend verification'
      });
    }
  });

  // GET convenience alias for resend-verification — usable directly in browser URL bar.
  app.get('/api/brevo/senders/:id/resend-verification', async (req, res) => {
    const id = Number(req.params.id);
    console.log(`[server → BREVO] SENDERS: resend-verification (GET alias) for senderId=${id}`);
    const result = await resendBrevoSenderVerification(id);
    if (result.ok) {
      res.json({ success: true, senderId: id, nextStep: result.nextStep });
    } else {
      res.status(400).json({
        success: false,
        senderId: id,
        error: result.error || 'Failed to resend verification'
      });
    }
  });

  // --- SETTINGS API ---
  app.get('/api/settings', async (req, res) => {
    try {
      const data = await getSettingsData();
      res.json(data || null);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/settings', async (req, res) => {
    try {
      const data = await saveSettingsData(req.body);
      res.json(data);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // --- SERVICES API ---
  app.get('/api/services', async (req, res) => {
    try {
      const services = await getServicesData();
      res.json(services);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/services', async (req, res) => {
    try {
      const newService = await addServiceData(req.body);
      res.status(201).json(newService);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.put('/api/services/:id', async (req, res) => {
    try {
      const updated = await updateServiceData(req.params.id, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.delete('/api/services/:id', async (req, res) => {
    try {
      await deleteServiceData(req.params.id);
      res.json({ success: true, id: req.params.id });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- CASE STUDIES API ---
  app.get('/api/casestudies', async (req, res) => {
    try {
      const caseStudies = await getCaseStudiesData();
      res.json(caseStudies);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/casestudies', async (req, res) => {
    try {
      const newStudy = await addCaseStudyData(req.body);
      res.status(201).json(newStudy);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.put('/api/casestudies/:id', async (req, res) => {
    try {
      const updated = await updateCaseStudyData(req.params.id, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.delete('/api/casestudies/:id', async (req, res) => {
    try {
      await deleteCaseStudyData(req.params.id);
      res.json({ success: true, id: req.params.id });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- TEAM MEMBERS API ---
  app.get('/api/team', async (req, res) => {
    try {
      const members = await getTeamData();
      res.json(members);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/team', async (req, res) => {
    try {
      const newMember = await addTeamData(req.body);
      res.status(201).json(newMember);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.put('/api/team/:id', async (req, res) => {
    try {
      const updated = await updateTeamData(req.params.id, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.delete('/api/team/:id', async (req, res) => {
    try {
      await deleteTeamData(req.params.id);
      res.json({ success: true, id: req.params.id });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- LEADS API (Newsletter Subscribers) ---
  app.get('/api/leads', async (req, res) => {
    try {
      const leads = await getLeadsData();
      res.json(leads);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/leads', async (req, res) => {
    try {
      const { email, source } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Email is required', success: false, isDuplicate: false });
      }
      const result = await addLeadData(email, source);
      const { lead, isDuplicate, firstSubscribedAt, subscribedAt } = result;
      if (isDuplicate) {
        // Already subscribed: SKIP Brevo re-welcome / re-alert emails.
        // Return 200 OK (not an error) with explicit signal for the UI to say "Already subscribed".
        console.log(
          `[server → BREVO] DUPLICATE: newsletter signup email="${email}" (source="${source || 'Footer Newsletter'}") — SKIPPING Brevo notifier. Lead first subscribed at ${firstSubscribedAt}.`
        );
        return res.status(200).json({
          success: true,
          isDuplicate: true,
          lead,
          firstSubscribedAt,
          subscribedAt,
          message: 'This email address is already subscribed to the CrifTech newsletter.'
        });
      }
      console.log(
        `[server → BREVO] TRIGGER: newsletter signup email="${email}" (source="${source || 'Footer Newsletter'}") — DB-saved lead id=${lead?.id || 'unknown'}`
      );
      // Fire-and-forget Brevo email (does NOT touch DB save; never blocks response)
      notifyNewsletterSignup(email, source).catch((e) =>
        console.warn('[server → BREVO] newsletter notifier wrapper failed:', e?.message || e)
      );
      res.status(201).json({
        success: true,
        isDuplicate: false,
        lead,
        firstSubscribedAt,
        subscribedAt,
        message: 'Subscribed successfully.'
      });
    } catch (err: any) {
      res.status(400).json({ error: err.message, success: false, isDuplicate: false });
    }
  });

  app.delete('/api/leads/:id', async (req, res) => {
    try {
      await deleteLeadData(req.params.id);
      res.json({ success: true, id: req.params.id });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- MAILS API (Contact Form Detailed Inquiries) ---
  app.get('/api/mails', async (req, res) => {
    try {
      const mails = await getMailsData();
      res.json(mails);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/mails', async (req, res) => {
    try {
      const { name, email, message, phone, company, subject } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
      }
      const newMail = await addMailData(req.body);
      console.log(
        `[server → BREVO] TRIGGER: contact-form submission name="${name}" email="${email}" ` +
          (subject ? `subject="${subject}" ` : '') +
          `— DB-saved inquiry id=${newMail?.id || 'unknown'}`
      );
      // Fire-and-forget Brevo email (does NOT touch DB save; never blocks response)
      notifyContactForm({
        name,
        email,
        message,
        phone,
        company,
        subject
      }).catch((e) =>
        console.warn('[server → BREVO] contact-form notifier wrapper failed:', e?.message || e)
      );
      res.status(201).json(newMail);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.patch('/api/mails/:id', async (req, res) => {
    try {
      const updated = await updateMailData(req.params.id, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.delete('/api/mails/:id', async (req, res) => {
    try {
      await deleteMailData(req.params.id);
      res.json({ success: true, id: req.params.id });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- VITE MIDDLEWARE / PRODUCTION SERVING ---
  if (vite) {
    const viteServer = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(viteServer.middlewares);
  } else if (staticServe) {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    const spaRoutes: RegExp[] = [
      /^\/$/i,
      /^\/services\/?$/i,
      /^\/services\/[^/]+\/?$/i,
      /^\/case-studies\/?$/i,
      /^\/about\/?$/i,
      /^\/team\/?$/i,
      /^\/careers\/?$/i,
      /^\/blog\/?$/i,
      /^\/contact\/?$/i,
      /^\/privacy\/?$/i,
      /^\/terms\/?$/i
    ];

    app.get('*', (req, res) => {
      const reqPath = req.path || '/';
      const fileLike = path.posix.basename(reqPath).includes('.');
      if (fileLike) {
        res.status(404).send('Not Found');
        return;
      }

      const isSpaRoute = spaRoutes.some((r) => r.test(reqPath));
      if (isSpaRoute) {
        res.sendFile(path.join(distPath, 'index.html'));
        return;
      }

      res.status(404).sendFile(path.join(distPath, '404.html'), (err) => {
        if (err) res.status(404).send('Not Found');
      });
    });
  }

  return app;
}

async function startServer() {
  const app = express();
  await configureApp(app);
  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 CrifTech Full-Stack Server running on:`);
    console.log(`   Local:    http://localhost:${PORT}`);
    console.log(`   Network:  http://127.0.0.1:${PORT}`);
  });
}

if (typeof require !== 'undefined' && require.main === module) {
  startServer();
}
if (typeof process !== 'undefined' && (process as any).argv?.[1]?.endsWith?.('server.ts')) {
  startServer();
}

export { configureApp, startServer };
