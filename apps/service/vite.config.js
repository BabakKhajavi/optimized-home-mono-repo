import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    target: 'node20', // Explicitly specify Node.js 20 as the target
    ssr: true, // Ensure server-side rendering (SSR) mode is enabled
    rollupOptions: {
      input: path.resolve(__dirname, 'server.js'), // Your Express.js app entry point
      output: {
        format: 'cjs', // CommonJS format for Node.js
      },
      external: ['@packages/common'], // Mark monorepo dependencies as external
    },
  },
});
