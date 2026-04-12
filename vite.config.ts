import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  /**
   * base — the public path your site is served from.
   *
   * GitHub Pages serves a project site at:
   *   https://<username>.github.io/<repo-name>/
   *
   * Set VITE_BASE_PATH to "/<repo-name>/" in your GitHub Actions workflow
   * (see .github/workflows/deploy.yml).  Locally it defaults to '/' so
   * `npm run dev` continues to work without any changes.
   */
  base: process.env.VITE_BASE_PATH ?? '/',

  resolve: {
    alias: {
      // '@' maps to ./src for clean absolute imports
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
