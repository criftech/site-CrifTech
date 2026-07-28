// Vercel Serverless Function entry point for all /api/* routes.
// Reuses the prebuilt esbuild bundle (dist/server.cjs) so import paths,
// .js vs .ts extensions, and ESM/CJS module resolution are identical to
// the local full-stack server — no TSconfig or module resolution surprises.
//
// File extension is .js (package.json "type": "module" → ESM) to satisfy
// Vercel's Serverless Function detection, which only accepts api/*.{js,ts,mjs}.

import express from 'express';

let appPromise = null;

async function getApp() {
    if (appPromise) return appPromise;

    appPromise = (async () => {
        try {
            // Load env BEFORE importing server bundle (Brevo + MongoDB depend on it)
            try {
                const dotenv = await import('dotenv');
                dotenv.default ? .config ? .();
            } catch (_) {
                /* ignore — vercel env already injected */
            }

            // server.cjs is produced by `npm run build` via esbuild --bundle.
            // Named exports `configureApp` and `startServer` are available.
            const bundle = await import('../dist/server.cjs');
            const configureApp = bundle ? .configureApp;
            if (typeof configureApp !== 'function') {
                throw new Error(
                    'server.cjs did not export configureApp. ' +
                    'Check dist/server.cjs and ensure `export { configureApp }` is compiled.'
                );
            }

            const app = express();
            // For serverless: only register routes, no Vite middleware and no
            // static/index.html serving (those are served by Vercel's CDN directly
            // from the dist/ directory via the catch-all rewrite).
            await configureApp(app, {
                vite: false,
                staticServe: false
            });

            return app;
        } catch (err) {
            // Log the real error (shows up in Vercel Runtime Logs) and save it
            // so every request can surface it instead of a generic 500.
            console.error('[api/index] FATAL: configureApp failed to build Express app:', err);
            appPromise = null;
            return {
                initError: err && err.stack ? err.stack : String(err),
                initErrorMessage: err && err.message ? err.message : String(err)
            };
        }
    })();

    return appPromise;
}

async function _handler(req, res) {
    const result = await getApp();

    // Init failed — surface the actual exception to the client for debugging.
    if (result && result.initError) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Cache-Control', 'no-store');
        return res.end(JSON.stringify({
            error: 'Server init failed',
            message: result.initErrorMessage,
            stack: result.initError
        }, null, 2));
    }

    // Success: pass the Vercel request/response through to Express.
    const app = result;
    return app(req, res);
}

// Wrap with one more top-level safety net so any uncaught reject from
// getApp or Express still returns a JSON error (no generic HTML 500).
export default async function handler(req, res) {
    try {
        return await _handler(req, res);
    } catch (err) {
        console.error('[api/index] UNHANDLED function error:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Cache-Control', 'no-store');
        res.end(JSON.stringify({
            error: 'Unhandled API function error',
            message: err ? .message || String(err),
            stack: err ? .stack || undefined
        }, null, 2));
    }
}