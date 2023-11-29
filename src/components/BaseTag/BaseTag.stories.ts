import type { Meta, StoryFn } from '@storybook/vue3';
import BaseTag from './BaseTag.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof BaseTag> = {
  title: 'Components/Base/BaseTag',
  component: BaseTag,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;
// type Story = StoryObj<typeof BaseTag>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */

const Template: StoryFn<typeof BaseTag> = args => ({
  components: { BaseTag },
  setup() {
    return { args };
  },
  template: `<div style="display: flex"><BaseTag v-bind="args">
    <template v-slot:icon>
      <svg width="112" height="114" viewBox="0 0 112 114" fill="none" xmlns="http://www.w3.org/2000/svg" style="padding: 2px">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5449
        91.6207C12.3805 93.3604 14.8197 94.3025 17.3369 94.244C17.8937 94.2435 18.4498 94.2007 19.0003
        94.1159C18.4603 97.2016 19.3803 100.365 21.4871 102.666L21.8007 102.987C28.3649 109.797 35.8327
        113.271 43.9969 113.31H44.1425C54.8028 113.31 66.0157 107.404 77.4714 95.7573C108.812 63.8891
        115.651 32.247 110.289 26.8288C107.423 23.9341 104.421 24.9443 102.225 25.6849C99.9849 26.4387
        99.1131 26.5914 97.9798 25.4493C94.9684 22.4076 98.23 16.7595 98.2617 16.7068C98.7025 15.9652
        98.5868 15.016 97.981 14.4045C97.3752 13.793 96.4349 13.6762 95.7003 14.1211C95.6424 14.1569
        90.0322 17.4229 87.0395 14.4057C85.9062 13.2599 86.0649 12.3703 86.8061 10.1201L86.8063 10.1195C87.5382
        7.90514 88.5402 4.87318 85.6729 1.98065C80.311 -3.43186 48.9593 3.47135 17.3891 35.1003C5.79723 46.7243
        -0.0519273 58.0921 0.000347299 68.8983C0.0395533 77.1396 3.48034 84.6779 10.2275 91.3041L10.5449
        91.6207ZM99.0496 29.9949L43.3678 86.1931C42.5752 86.9529 41.3319 86.9529 40.5393 86.1931C39.759 85.4043
        39.759 84.1267 40.5393 83.3379L95.297 28.0632C95.3123 28.0793 95.3266 28.0963 95.3399 28.1141C96.3156
        29.1658 97.6311 29.8314 99.0496 29.9912V29.9949ZM82.5401 13.3296C82.7019 14.761 83.3638 16.0873 84.4071
        17.0705C84.4247 17.0839 84.4415 17.0984 84.4575 17.1138L29.6849 72.3885C29.184 72.9215 28.436 73.1379
        27.7315 72.9539C27.027 72.7698 26.477 72.2142 26.2951 71.5029C26.1133 70.7917 26.3282 70.0368
        26.8564 69.5315L82.5401 13.3296ZM20.0197 37.7839C51.9707 5.76677 80.5182 2.10503 83.033 4.64544C83.6207
        5.15269 83.9184 5.92278 83.8265 6.69775L24.2222 66.8648C21.9821 69.1255 21.9817 72.7912 24.2212
        75.0524C26.4608 77.3136 30.0922 77.314 32.3322 75.0533L87.7601 19.1021C89.5919 19.5934 91.5198
        19.5862 93.3479 19.0813C92.8468 20.9271 92.8391 22.874 93.3255 24.7238L37.8995 80.6732C35.716
        82.9437 35.743 86.5633 37.9601 88.8004C40.1773 91.0374 43.7631 91.0631 46.0114 88.8579L105.618
        28.6927C106.385 28.5996 107.148 28.9011 107.649 29.4955C110.169 32.0397 106.54 60.853 74.8203
        93.1038C64.0909 104.01 53.7685 109.541 44.1425 109.541H44.0156C36.8913 109.505 30.3159 106.417
        24.4742 100.359L24.127 100.001C22.1105 97.5779 22.1105 94.0423 24.127 91.6188C24.6123 91.1456
        24.8069 90.4449 24.6361 89.786C24.4652 89.1271 23.9555 88.6125 23.3027 88.4401C22.65 88.2676
        21.9558 88.4641 21.4871 88.954C19.0871 90.99 15.5847 90.99 13.1848 88.954L12.83 88.6035C6.82966
        82.7085 3.76972 76.071 3.73425 68.8795C3.68758 59.123 9.16521 48.6692 20.0197 37.7839ZM40.1808
        29.8898C40.5848 29.8898 40.9779 29.7576 41.301 29.5129C42.3913 28.695 43.471 27.9092 44.5402
        27.1553C45.1156 26.7817 45.4425 26.1204 45.3922 25.4316C45.3418 24.7429 44.9223 24.1371 44.2988
        23.8528C43.6754 23.5685 42.9477 23.6512 42.4025 24.0684C41.3035 24.8411 40.1927 25.6489 39.07
        26.492C38.4271 26.9787 38.1649 27.826 38.419 28.5956C38.6732 29.3651 39.3866 29.8842 40.1902
        29.8842L40.1808 29.8898ZM35.598 31.5883C36.2477 32.3764 36.154 33.5442 35.3872 34.2166C32.0229
        37.0416 28.6867 40.1078 25.4755 43.3247C16.1968 52.6214 11.4846 61.1642 11.4734 68.7213C11.4734
        69.7621 10.6375 70.6059 9.60645 70.6059C8.57536 70.6059 7.7395 69.7621 7.7395 68.7213C7.75444
        60.1258 12.8363 50.6859 22.8413 40.6581C26.1327 37.3506 29.5511 34.2147 32.9994 31.32C33.7937
        30.681 34.9483 30.8002 35.598 31.5883Z" fill="#000"/>
      </svg>
    </template>
    <template v-slot:default>{{ args.defaultSlotContent }}</template>
  </BaseTag></div>`,
});

export const Default = Template.bind({});
Default.args = { background: '#F2F4F5', defaultSlotContent: 'text' };

export const WithIcon = Template.bind({});
WithIcon.args = { background: '#FFC24D', defaultSlotContent: 'Open', showIcon: true };

export const Round = Template.bind({});
Round.args = { background: '#D9FFEE', defaultSlotContent: 'New', round: true };

export const StrongText = Template.bind({});
StrongText.args = { background: '#FFF1F1', defaultSlotContent: 'Strong text', strongText: true };

export const WhiteTextColor = Template.bind({});
WhiteTextColor.args = { background: '#004FFF', defaultSlotContent: 'White text', whiteTextColor: true };

export const StyleVariables: StoryFn = {
  render: () => ({
    template:
      `<pre>
          $base-tag-color: $primary
          $base-tag-white-text-color: $white
          $base-tag-default-border-radius: 0px
          $base-tag-padding: 4px 8px
          
          $base-tag-round-border-radius: 24px
          $base-tag-font-size: 12px
          $base-tag-line-height: 16.8px
          
          $base-tag-icon-padding-left: 6px
          $base-tag-icon-width: 16px
          $base-tag-icon-height: 16px
          $base-tag-icon-margin-after-icon: 4px
        </pre>`
  }),
};
