import type { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';
import BaseTabs from './BaseTabs.vue';

const tabs = [
  {
    value: 'first-tab',
    label: 'I\'m the first tab',
  }, {
    value: 'second-tab',
    label: 'I\'m the second tab',
  }, {
    value: 'last-tab',
    label: 'I\'m the last tab',
  },
];
const tabsContent = [
  {
    value: 'first-tab',
    content: 'I\'m the first tab content',
  }, {
    value: 'second-tab',
    content: 'I\'m the second tab',
  }, {
    value: 'last-tab',
    content: 'To provide a better user experience with bottom placed controls, ensure that the content of each tab pane is the same height and fits completely within the visible viewport, otherwise the user will need to scroll up to read the start of the tabbed content.',
  },
];

const meta: Meta<typeof BaseTabs> = {
  title: 'Components/Base/BaseTabs',
  component: BaseTabs,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['top-line', 'bottom-line'],
      control: { type: 'select' },
    },
  },
};

export default meta;

const Template: StoryFn<typeof BaseTabs> = args => ({
  components: { BaseTabs },
  setup() {
    const currentTab = ref('first-tab');

    function onCurrentTabChange(newCurrentTab: string) {
      currentTab.value = newCurrentTab;
    }
    return { args, tabs, currentTab, tabsContent, onCurrentTabChange };
  },
  template: `<div style="display: flex; flex-direction: column">
  <BaseTabs
    :model-value="currentTab"
    v-bind="args"
    :tabs="args.tabs"
    @update:model-value="onCurrentTabChange"
  />
  <div class="base-tabs__container">
    <div
      v-for="(itemContent, i) in tabsContent"
      :key="i"
      class="base-tabs__container-item"
      :style="{fontFamily: 'Roboto', marginTop: '20px'}"
    >
      <div class="base-tabs__container-item-content" v-if="itemContent.value === currentTab">
        {{ itemContent.content }}
      </div>
    </div>
  </div>
  </div>`,
});

export const TopLineType = Template.bind({});
TopLineType.args = { tabs };

export const BottomLineType = Template.bind({});
BottomLineType.args = { type: 'bottom-line', tabs };

const tabsWithAdditionalParameters = [
  {
    value: 'first-tab',
    label: 'I\'m the first tab',
    subTitle: 10,
  }, {
    value: 'second-tab',
    label: 'I\'m the second tab',
  }, {
    value: 'last-tab',
    label: 'I\'m the last tab',
    subTitle: 3,
  },
];

export const BottomLineTypeWithAdditionalParameters = Template.bind({});
BottomLineTypeWithAdditionalParameters.args = { type: 'bottom-line', tabs: tabsWithAdditionalParameters };

export const FullWidth = Template.bind({});
FullWidth.args = { tabs, fullWidth: true };

export const StyleVariables: StoryFn = {
  render: () => ({
    template:
      `<pre>
        $tabs-bottom-line-color: $gray-10
        
        $item-top-line-background-color: $gray-20
        $item-top-line-active-background-color: $white
        $item-top-line-active-label-color: $primary
        $item-top-line-active-sub-title-background-color: $secondary
        $item-top-line-active-before-background-color: $secondary
        $item-top-line-active-sub-title-color: $white
        
        $item-label-color: $primary
        $item-sub-title-background-color: $gray-30
        $item-sub-title-color: $primary
        </pre>`
  }),
};
