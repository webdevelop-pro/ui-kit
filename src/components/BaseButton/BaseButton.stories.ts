import type { Meta, StoryFn, StoryObj } from '@storybook/vue3';
import BaseButton from './BaseButton.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof BaseButton> = {
  title: 'Components/Base/BaseButton',
  component: BaseButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    size: "medium",
    color: "primary",
    variant: "default",
  },
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      control: { type: 'select' },
    },
    size: {
      options: ['large', 'medium', 'small', 'x-small'],
      control: { type: 'select' },
    },
    variant: {
      options: ['default', 'outlined', 'link', 'icon-only'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseButton>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */

const Template: StoryFn<typeof BaseButton> = args => ({
  components: { BaseButton },
  setup() {
    return { args };
  },
  template: `<div style="display: flex">
  <BaseButton v-bind="args">
    <svg width="16" height="16" fill="white" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.92308 2.92308V2H7.07692V2.92308V7.07692H2.92308H2V8.92308H2.92308H7.07692V13.0769V14H8.92308V13.0769V8.92308H13.0769H14V7.07692H13.0769H8.92308V2.92308Z"/>
    </svg>
    {{ args.color || args.size }}
    <svg width="16" height="16" fill="white" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.92308 2.92308V2H7.07692V2.92308V7.07692H2.92308H2V8.92308H2.92308H7.07692V13.0769V14H8.92308V13.0769V8.92308H13.0769H14V7.07692H13.0769H8.92308V2.92308Z"/>
    </svg>
  </BaseButton>
  </div>`,
});

export const Default = Template.bind({});
Default.args = {iconPlacement: 'both'};

export const Colors: StoryFn = {
  render: () => ({
    components: { BaseButton },
    template: '<BaseButton color="primary">Primary</BaseButton>' +
      '<BaseButton style="margin-left: 5px" color="secondary">Secondary</BaseButton>'+
      '<BaseButton style="margin-left: 5px" color="success">Success</BaseButton>' +
      '<BaseButton style="margin-left: 5px" color="warning">Warning</BaseButton>' +
      '<BaseButton style="margin-left: 5px" color="danger">Danger</BaseButton>',
  }),
};

export const OutlineVariant: StoryFn = {
  render: () => ({
    components: { BaseButton },
    template: '<BaseButton variant="outlined" color="primary">Primary</BaseButton>' +
      '<BaseButton style="margin-left: 5px" variant="outlined" color="secondary">Secondary</BaseButton>'+
      '<BaseButton style="margin-left: 5px" variant="outlined" color="success">Success</BaseButton>' +
      '<BaseButton style="margin-left: 5px" variant="outlined" color="warning">Warning</BaseButton>' +
      '<BaseButton style="margin-left: 5px" variant="outlined" color="danger">Danger</BaseButton>',
  }),
};

export const LinkVariant: StoryFn = {
  render: () => ({
    components: { BaseButton },
    template: '<BaseButton variant="link" color="primary">Primary</BaseButton>' +
      '<BaseButton style="margin-left: 5px" variant="link" color="secondary">Secondary</BaseButton>'+
      '<BaseButton style="margin-left: 5px" variant="link" color="success">Success</BaseButton>' +
      '<BaseButton style="margin-left: 5px" variant="link" color="warning">Warning</BaseButton>' +
      '<BaseButton style="margin-left: 5px" variant="link" color="danger">Danger</BaseButton>',
  }),
};

export const BlockVariant: StoryFn = {
  render: () => ({
    components: { BaseButton },
    template: '<BaseButton  block color="primary">Primary</BaseButton>' +
      '<BaseButton style="margin-top: 10px" block color="secondary">Secondary</BaseButton>'+
      '<BaseButton style="margin-top: 10px" block color="success">Success</BaseButton>' +
      '<BaseButton style="margin-top: 10px" block color="warning">Warning</BaseButton>' +
      '<BaseButton style="margin-top: 10px" block color="danger">Danger</BaseButton>',
  }),
};

export const DisabledState: StoryFn = {
  render: () => ({
    components: { BaseButton },
    template: '<BaseButton disabled color="primary">Primary</BaseButton>' +
      '<BaseButton style="margin-left: 5px" disabled color="secondary">Secondary</BaseButton>'+
      '<BaseButton style="margin-left: 5px" disabled color="success">Success</BaseButton>' +
      '<BaseButton style="margin-left: 5px" disabled color="warning">Warning</BaseButton>' +
      '<BaseButton style="margin-left: 5px" disabled color="danger">Danger</BaseButton>',
  }),
};

export const IconOnly: StoryFn = {
  render: () => ({
    components: { BaseButton },
    template: '<BaseButton size="large" iconOnly color="primary"><svg width="16" height="16" fill="#000" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n      <path d="M8.92308 2.92308V2H7.07692V2.92308V7.07692H2.92308H2V8.92308H2.92308H7.07692V13.0769V14H8.92308V13.0769V8.92308H13.0769H14V7.07692H13.0769H8.92308V2.92308Z"/>\n    </svg></BaseButton>' +
      '<BaseButton style="margin-left: 5px" iconOnly variant="outlined"  color="success"><svg width="16" height="16" fill="#000" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n      <path d="M8.92308 2.92308V2H7.07692V2.92308V7.07692H2.92308H2V8.92308H2.92308H7.07692V13.0769V14H8.92308V13.0769V8.92308H13.0769H14V7.07692H13.0769H8.92308V2.92308Z"/>\n    </svg></BaseButton>'+
      '<BaseButton style="margin-left: 5px" iconOnly variant="link" size="small" color="success"><svg width="16" height="16" fill="#000" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n      <path d="M8.92308 2.92308V2H7.07692V2.92308V7.07692H2.92308H2V8.92308H2.92308H7.07692V13.0769V14H8.92308V13.0769V8.92308H13.0769H14V7.07692H13.0769H8.92308V2.92308Z"/>\n    </svg></BaseButton>' +
      '<BaseButton style="margin-left: 5px" iconOnly variant="outlined" size="large" pill color="warning"><svg width="16" height="16" fill="#000" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n      <path d="M8.92308 2.92308V2H7.07692V2.92308V7.07692H2.92308H2V8.92308H2.92308H7.07692V13.0769V14H8.92308V13.0769V8.92308H13.0769H14V7.07692H13.0769H8.92308V2.92308Z"/>\n    </svg></BaseButton>' +
      '<BaseButton style="margin-left: 5px" iconOnly variant="primary" pill color="danger"><svg width="16" height="16" fill="#000" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n      <path d="M8.92308 2.92308V2H7.07692V2.92308V7.07692H2.92308H2V8.92308H2.92308H7.07692V13.0769V14H8.92308V13.0769V8.92308H13.0769H14V7.07692H13.0769H8.92308V2.92308Z"/>\n    </svg></BaseButton>' +
      '<BaseButton style="margin-left: 5px" iconOnly variant="link" size="small" pill color="primary"><svg width="16" height="16" fill="#000" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n      <path d="M8.92308 2.92308V2H7.07692V2.92308V7.07692H2.92308H2V8.92308H2.92308H7.07692V13.0769V14H8.92308V13.0769V8.92308H13.0769H14V7.07692H13.0769H8.92308V2.92308Z"/>\n</svg></BaseButton>'
  }),
};

export const Size: StoryFn = {
  render: () => ({
    components: { BaseButton },
    template: '<BaseButton style="margin-left: 5px" size="large" color="primary">Large</BaseButton>'+
      '<BaseButton style="margin-left: 5px" size="medium" color="secondary">Medium</BaseButton>'+
      '<BaseButton style="margin-left: 5px" size="small" color="success">Small</BaseButton>'+
      '<BaseButton style="margin-left: 5px" size="x-small" color="warning">X Small</BaseButton>',
  }),
};

export const StyleVariables: StoryFn = {
  render: () => ({
    template:
      `<pre>
        $base-button-font-family: 'Avenir'
        $base-button-font-size: 14px
        $base-button-font-weight: 800
        $base-button-line-height: 21px
        $base-button-color: $white
        $base-button-height: 37px
        $base-button-padding: 0 16px
        $base-button-icon-margin: 6px
        $base-button-pill: 30px
        $base-button-border-radius: 2px
        $base-button-border-width: 1px
        $base-button-box-shadow: 0px 3px 4px -2px rgba(18, 22, 31, 0.15)
        $base-button-icon-only-size: 38px
        
        $base-button-large-height: 45px
        $base-button-large-padding: 0 20px
        $base-button-icon-only-large-size: 48px
        
        $base-button-small-height: 32px
        $base-button-small-padding: 0 12px
        $base-button-small-font-size: 14px
        $base-button-icon-only-small-size: 30px
        
        $base-button-x-small-padding: 0 6px
        $base-button-x-small-height: 26px
        
        $base-button-icon-only-padding: 9px
        $base-button-icon-only-small-padding: 7px
        
        $base-button-primary-color: $primary
        $base-button-primary-hover-color: $primary-dark
        $base-button-secondary-color: $gray-40
        $base-button-secondary-hover-color: $gray-50
        $base-button-success-color: $secondary
        $base-button-success-hover-color: $secondary-dark
        $base-button-warning-color: $yellow
        $base-button-warning-hover-color: $yellow-dark
        $base-button-danger-color: $red
        $base-button-danger-hover-color: $red-dark
        </pre>`
  }),
};
