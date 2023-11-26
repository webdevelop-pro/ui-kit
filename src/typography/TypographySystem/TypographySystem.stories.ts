import type { Meta, StoryFn } from '@storybook/vue3';
import Typography from './TypographySystem.vue';
const meta: Meta<typeof Typography> = {
  title: 'System',
  component: Typography,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  // tags: ['autodocs'],
};

export default meta;
// type Story = StoryObj<typeof Typography>;

const Template: StoryFn<typeof Typography> = args => ({
  components: { Typography },
  setup() {
    return { args };
  },
  template: `<div style="display: flex">
    <Typography></Typography>
  </div>`,
});

export const Text = Template.bind({});
Text.args = {};
