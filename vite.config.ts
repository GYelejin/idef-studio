import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@cljs-out': path.resolve(import.meta.dirname, '.cljs-out'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    fs: {
      allow: ['.'],
    },
  },
  build: {
    outDir: 'dist',
  },
});
