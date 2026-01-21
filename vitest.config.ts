import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'url';
import svgLoader from 'vite-svg-loader';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
  ],
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      UiKit: path.resolve(__dirname, './src'),
    },
  },
});
