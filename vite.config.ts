import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    svgLoader({
      svgo: false,
    }),
  ],
  resolve: {
    alias: {
      // "@": join(__dirname, "src"),
      UiKit: path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'UiKit/styles/_colors.scss' as *;
          @use 'UiKit/styles/_variables.scss' as *;
          @use 'UiKit/styles/_mixins.scss' as *;
        `,
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api'],
      },
      sass: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
});
