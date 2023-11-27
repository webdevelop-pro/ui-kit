import type { Meta, StoryFn } from '@storybook/vue3';
import BaseSvgIcon from './BaseSvgIcon.vue';

const meta: Meta<typeof BaseSvgIcon> = {
  title: 'Components/Base/BaseSvgIcon',
  component: BaseSvgIcon,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<typeof BaseSvgIcon> = args => ({
  components: { BaseSvgIcon },
  setup() {
    return { args };
  },
  template: `<div style="display: flex">
  <BaseSvgIcon v-bind="args"/>
  </div>`,
});

export const Default = Template.bind({});
Default.args = {name: 'vue'};


export const Setup: StoryFn = {
  render: () => ({
    template: `
      <div>
        <p>For use BaseSvgIcon:</p>
        <code>yarn add vite-svg-loader package</code>
        <br>
        <br>
        <h4>vite.config.ts</h4>
        <code>
            import svgLoader from 'vite-svg-loader'
        </code>
        <br>
        <code>
           <strong>add to plugin config</strong>
           <br>
           plugins: [vue(), svgLoader()],
        </code>
        <br>
        <br>
        <h3>Important!</h3>
        <p>BaseSvgIcon using <strong>assets</strong> folder inside <strong>src</strong></p>
      </div>
    `
  }),
};
