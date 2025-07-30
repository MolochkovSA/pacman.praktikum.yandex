import dotenv from 'dotenv';
dotenv.config();

import express, { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import path from 'path';
import fs from 'fs/promises';
import { pathToFileURL } from 'url';
import serialize from 'serialize-javascript';
import cookieParser from 'cookie-parser';

const clientPort = process.env.CLIENT_PORT || 3000;
const serverPort = process.env.SERVER_PORT || 3001;
const serverHost = process.env.SERVER_HOST || 'http://localhost';
const serverHostProd = process.env.SERVER_HOST_PROD || 'https://localhost';

const isDev = process.env.VITE_MODE === 'development';
const serverUrl = `${isDev ? serverHost : serverHostProd}:${serverPort}`;
const clientPath = path.join(__dirname, '..');

async function createServer() {
  const app = express();
  app.use(express.static(path.resolve(__dirname)));
  app.use(express.json());
  app.use(cookieParser());

  const { createServer: createViteServer } = await import('vite');

  type ViteDevServer = Awaited<ReturnType<typeof createViteServer>>;

  let vite: ViteDevServer | undefined;

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom'
    });

    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(clientPath, 'dist/client'), { index: false }));
  }

  app.use('/api/v2/resources', async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const resourceUrl = `${serverUrl}${req.originalUrl}`;

      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (Array.isArray(value)) {
          headers.set(key, value.join(','));
        } else if (typeof value === 'string') {
          headers.set(key, value);
        }
      }

      const proxyRes = await fetch(resourceUrl, {
        method: req.method,
        headers,
        credentials: 'include'
      });

      proxyRes.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });

      const buffer = await proxyRes.arrayBuffer();
      res.status(proxyRes.status).send(Buffer.from(buffer));
    } catch (err) {
      console.error('Proxy error (resource):', err);
      res.status(500).json({ message: 'Proxy error' });
    }
  });

  app.use('/api/v2', async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const apiUrl = `${serverUrl}${req.originalUrl}`;

      const body = ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body);

      const headers = new Headers();

      for (const [key, value] of Object.entries(req.headers)) {
        if (key.toLowerCase() === 'content-length') continue;

        if (Array.isArray(value)) {
          headers.set(key, value.join(','));
        } else if (typeof value === 'string') {
          headers.set(key, value);
        }
      }

      if (!headers.has('content-type')) {
        headers.set('content-type', 'application/json');
      }

      headers.set('host', serverUrl);

      const proxyRes = await fetch(apiUrl, {
        method: req.method,
        headers,
        body,
        credentials: 'include'
      });

      const setCookieHeaders: string[] = [];

      for (const [key, value] of proxyRes.headers.entries()) {
        if (key.toLowerCase() === 'set-cookie') {
          setCookieHeaders.push(value);
        } else {
          res.setHeader(key, value);
        }
      }

      if (setCookieHeaders.length > 0) {
        res.setHeader('Set-Cookie', setCookieHeaders);
      }

      const contentType = proxyRes.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await proxyRes.json();
        res.status(proxyRes.status).json(data);
      } else {
        const text = await proxyRes.text();
        res.status(proxyRes.status).send(text);
      }
    } catch (err) {
      console.error('Proxy error:', err);
      res.status(500).json({ message: 'Proxy error' });
    }
  });

  app.use(async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let render: (
        req: ExpressRequest,
        apiUrl: string
      ) => Promise<{ html: string; initialState: unknown; cspNonce: string }>;
      let template: string;

      if (vite) {
        template = await fs.readFile(path.resolve(clientPath, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);

        render = (await vite.ssrLoadModule(pathToFileURL(path.join(clientPath, 'src/entry-server.tsx')).href)).render;
      } else {
        template = await fs.readFile(path.join(clientPath, 'dist/client/index.html'), 'utf-8');

        const pathToServer = path.join(clientPath, 'dist/server/entry-server.mjs');

        render = (await import(pathToFileURL(pathToServer).href)).render;
      }
      const { html: appHtml, initialState, cspNonce } = await render(req, `${serverUrl}/api/v2`);

      if (!vite) {
        res.setHeader(
          'Content-Security-Policy',
          `default-src 'self'; script-src 'self' 'nonce-${cspNonce}'; connect-src 'self' https://ya-praktikum.tech https://oauth.yandex.ru; style-src 'self' 'unsafe-inline'; img-src 'self' https://ya-praktikum.tech data: https:; font-src 'self' data:; worker-src 'self';`
        );
      }

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script nonce="${cspNonce}">window.APP_INITIAL_STATE = ${serialize(initialState, {
            isJSON: true
          })}</script>`
        )
        .replace('<!--nonce-->', cspNonce);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (e instanceof Response && e.status >= 300 && e.status < 400) {
        const location = e.headers.get('Location');

        if (location) {
          return res.redirect(e.status, location);
        }
      }

      if (vite && vite.ssrFixStacktrace) {
        vite.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(clientPort, () => {
    console.log(`Client is started on: http://localhost:${clientPort}`);
  });
}

createServer();
