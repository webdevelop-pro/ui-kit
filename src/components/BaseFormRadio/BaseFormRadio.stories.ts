import type { Meta, StoryFn } from '@storybook/vue3';
import BaseFormRadio from './BaseFormRadio.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof BaseFormRadio> = {
	title: 'Components/Base/BaseFormRadio',
	component: BaseFormRadio,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<typeof BaseFormRadio> = args => ({
	components: { BaseFormRadio },
	setup() {
		return { args };
	},
	template: `<div style="display: flex">
	<BaseFormRadio v-bind="args" /></div>`,
});

export const Default = Template.bind({});
Default.args = {options: ['First Radio', 'Second Radio'], modelValue: 'Second Radio'};


export const StyleVariables: StoryFn = {
	render: () => ({
		template:
			`<pre>
					$radio-input-size: 16px
					$radio-input-border: solid 1px $gray-40
					$radio-input-circle-color: $gray-60
					
					$radio-input-label-color: $black
					$radio-input-label-font-weight: 500
					$radio-input-label-font-family: 'Avenir'
					$radio-input-label-font-size: 16px
      </pre>`
	}),
};
