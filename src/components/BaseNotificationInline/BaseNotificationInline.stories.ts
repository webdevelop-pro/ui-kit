import type { Meta, StoryFn } from '@storybook/vue3';
import BaseNotificationInline from './BaseNotificationInline.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof BaseNotificationInline> = {
  title: 'Components/Base/BaseNotificationInline',
  component: BaseNotificationInline,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['error', 'warning', 'success'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

const Template: StoryFn<typeof BaseNotificationInline> = args => ({
  components: { BaseNotificationInline },
  setup() {
    return { args };
  },
  template: `<div style="display: flex"><BaseNotificationInline v-bind="args">
    <template v-slot:default><span v-html="args.defaultSlotContent" /></template>
  </BaseNotificationInline></div>`,
});

export const Error = Template.bind({});
Error.args = { defaultSlotContent: 'You may be prohibited and need to Contact Us <a href="(111) 111-1111">(888) 958-1470</a>', show: true };

export const Warning = Template.bind({});
Warning.args = { defaultSlotContent: 'You may be prohibited and need to Contact Us <a href="(111) 111-1111">(888) 958-1470</a>', type: 'warning', show: true };

export const Success = Template.bind({});
Success.args = { defaultSlotContent: 'Success Login!', type: 'success', show: true };

export const StyleVariables: StoryFn = {
  render: () => ({
    template:
      `<pre>
        $notification-inline-color: $black
        $notification-inline-margin: 3px 0 20px
        $notification-inline-font-size: 14px
        $notification-inline-line-height: 19px
        $notification-inline-padding: 12px 15px
        
        $notification-inline-width: 20px
        $notification-inline-height: 20px
        
        $notification-inline-margin-left: 15px
        
        $notification-inline-link-color: $secondary
        $notification-inline-error-background-color: $red-light
        $notification-inline-error-color: $red
        
        
        $notification-inline-warning-background-color: $yellow-light
        $notification-inline-warning-color: $yellow
        
        $notification-inline-success-background-color: $secondary-light
        $notification-inline-success-color: $secondary-dark
        </pre>`
  }),
};
