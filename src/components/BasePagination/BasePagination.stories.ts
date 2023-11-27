import type { Meta, StoryFn } from '@storybook/vue3';
import BasePagination from './BasePagination.vue';

const meta: Meta<typeof BasePagination> = {
  title: 'Components/Base/BasePagination',
  component: BasePagination,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<typeof BasePagination> = args => ({
  components: { BasePagination },
  setup() {
    return { args };
  },
  template: `<div style="display: flex">
  <BasePagination count="100" offset-from="0" offset-to="10" />
  </div>`,
});

export const Default = Template.bind({});
Default.args = {};

export const StyleVariables: StoryFn = {
  render: () => ({
    template:
      `<pre>
        $pagination-border-top-color: $gray-20
        $pagination-padding-left: 16px
        $pagination-count-of-items-color: $primary
        $pagination-button-border-left-color: $gray-20
        
        $pagination-count-of-items-font-size: 14px
        $pagination-count-of-items-mobile-font-size: 12px
        
        $pagination-count-of-items-line-height: 19.6px
        $pagination-count-of-items-mobile-line-height: 16.8px
        $pagination-button-icon-fill: $gray-20
        
        $pagination-button-width: 48px
        $pagination-button-height: 48px
        $pagination-button-mobile-width: 36px
        $pagination-button-mobile-height: 36px
        </pre>`
  }),
};
