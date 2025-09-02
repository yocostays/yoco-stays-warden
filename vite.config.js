import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  envDir: '.', // Set the root directory for environment files
  envPrefix: 'VITE_', // Only load variables prefixed with VITE_
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@features': path.resolve(__dirname, './src/features'),
      '@theme': path.resolve(__dirname, './src/theme'),
    },
  },
});
