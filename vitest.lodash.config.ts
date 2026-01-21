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
    alias: [
      { find: /^lodash-es$/, replacement: 'lodash' },
      { find: /^lodash-es\/(.*)\.js$/, replacement: 'lodash/$1.js' },
      { find: /^lodash-es\/(.*)$/, replacement: 'lodash/$1' },
    ],
    coverage: {
      provider: 'v8',
    },
  },
  resolve: {
    alias: [
      { find: /^lodash-es$/, replacement: 'lodash' },
      { find: /^lodash-es\/(.*)\.js$/, replacement: 'lodash/$1.js' },
      { find: /^lodash-es\/(.*)$/, replacement: 'lodash/$1' },
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: 'UiKit', replacement: path.resolve(__dirname, './src') },
    ],
  },
});
