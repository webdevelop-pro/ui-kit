import type { Preview } from "@storybook/vue3";

import '@/styles/index.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true, // 👈 Enables the table of contents
    },
  },
};

export default preview;
