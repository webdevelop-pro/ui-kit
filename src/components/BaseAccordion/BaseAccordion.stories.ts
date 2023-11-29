import type { Meta, StoryFn } from '@storybook/vue3';
import BaseAccordion from './BaseAccordion.vue';
import BaseAccordionItem from './BaseAccordionItem.vue';

const meta: Meta<typeof BaseAccordionItem> = {
  title: 'Components/Base/BaseAccordion',
  component: BaseAccordionItem,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['small', 'large'],
      control: { type: 'select' },
    },
    color: {
      options: ['primary', 'white'],
      control: { type: 'select' },
    },
  },
};

export default meta;
// type Story = StoryObj<typeof BaseTag>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */

const Template: StoryFn<typeof BaseAccordionItem> = args => ({
  components: { BaseAccordionItem, BaseAccordion },
  setup() {
    return { args };
  },
  template: `<div style="display: flex; padding: 10px" :style="{background: args.color === 'white' ? '#36BE83' : 'white'}">
  <div style="width: 100%">
    <BaseAccordion >
      <BaseAccordionItem v-bind="args">
        <template #title>Accordion 1</template>
        <template #content>
          <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
            squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa
            nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
            single-origin coffee nulla assumenda shoreditch et.
          </p>
          <ul>
            <li>We select a tiny fraction</li>
            <li>We select a tiny fraction2</li>
            <li>We select a tiny fraction3</li>
          </ul>
        </template>
      </BaseAccordionItem>
      <BaseAccordionItem v-bind="args">
        <template #title>Accordion 2</template>
        <template #content>
	        Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
	        single-origin coffee nulla assumenda shoreditch et.
          <p>Each entity is divided into fractional shares.<a href="test.com">test link</a></p>
        </template>
      </BaseAccordionItem>
      <BaseAccordionItem v-bind="args">
        <template #title>Accordion 2</template>
        <template #content>
	        <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
		        squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa
		        nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
		        single-origin coffee nulla assumenda shoreditch et.
	        </p>
        </template>
      </BaseAccordionItem>
    </BaseAccordion>
  </div>
  </div>`,
});

export const Default = Template.bind({});
Default.args = {};

export const LargeSize = Template.bind({});
LargeSize.args = {size: 'large'};

export const WhiteColor = Template.bind({});
WhiteColor.args = {color: 'white'};

export const StyleVariables: StoryFn = {
  render: () => ({
    template:
      `<pre>
        $border-color: $gray-30
        $border-color-white: $gray-10
        $white-color: $white
        $white-link-color: $gray-10
        $link-color: $primary
        
        $open-close-icon-fill: $black
        </pre>`
  }),
};
