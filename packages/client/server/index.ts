import dotenv from 'dotenv';
dotenv.config();

import express, { Request as ExpressRequest } from 'express';
import path from 'path';
import fs from 'fs/promises';
import { pathToFileURL } from 'url';
import serialize from 'serialize-javascript';
import cookieParser from 'cookie-parser';

const port = process.env.CLIENT_PORT || 3000;
const isDev = process.env.VITE_MODE === 'development';
const clientPath = path.join(__dirname, '..');

async function createServer() {
  const app = express();
  app.use(express.static(path.resolve(__dirname)));
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

  app.use(async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let render: (req: ExpressRequest) => Promise<{ html: string; initialState: unknown }>;
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
      const { html: appHtml, initialState } = await render(req);

      const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(
        `<!--ssr-initial-state-->`,
        `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
          isJSON: true
        })}</script>`
      );

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (vite && vite.ssrFixStacktrace) {
        vite.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`Client is started on: http://localhost:${port}`);
  });
}

createServer();
