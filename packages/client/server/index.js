"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const url_1 = require("url");
const port = process.env.CLIENT_PORT || 80;
const isDev = process.env.NODE_ENV === 'development';
const clientPath = path_1.default.join(__dirname, '..');
async function createServer() {
    const app = (0, express_1.default)();
    const { createServer: createViteServer } = await import('vite');
    let vite;
    if (isDev) {
        vite = await createViteServer({
            server: { middlewareMode: true },
            root: clientPath,
            appType: 'custom'
        });
        app.use(vite.middlewares);
    }
    else {
        app.use(express_1.default.static(path_1.default.join(clientPath, 'dist/client'), { index: false }));
    }
    app.use(async (req, res, next) => {
        const url = req.originalUrl;
        try {
            let render;
            let template;
            if (vite) {
                template = await promises_1.default.readFile(path_1.default.resolve(clientPath, 'index.html'), 'utf-8');
                template = await vite.transformIndexHtml(url, template);
                render = (await vite.ssrLoadModule((0, url_1.pathToFileURL)(path_1.default.join(clientPath, 'src/entry-server.tsx')).href)).render;
            }
            else {
                template = await promises_1.default.readFile(path_1.default.join(clientPath, 'dist/client/index.html'), 'utf-8');
                const pathToServer = path_1.default.join(clientPath, 'dist/server/entry-server.mjs');
                render = (await import((0, url_1.pathToFileURL)(pathToServer).href)).render;
            }
            const { html: appHtml } = await render(req);
            const html = template.replace(`<!--ssr-outlet-->`, appHtml);
            res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
        }
        catch (e) {
            if (vite && vite.ssrFixStacktrace) {
                vite.ssrFixStacktrace(e);
            }
            next(e);
        }
    });
    app.listen(port, () => {
        console.log(`Client is started on: http://localhost:${port}`);
    });
}
createServer();
