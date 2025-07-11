import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import * as path from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT
  },
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      styles: path.resolve(__dirname, 'src/app/styles')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern", "legacy"
        quietDeps: true,
        silenceDeprecations: ['legacy-js-api', 'import']
      }
    }
  },
  build: {
    outDir: path.join(__dirname, 'dist/client')
  }
});
