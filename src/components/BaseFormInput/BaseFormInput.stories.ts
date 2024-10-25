import type { Meta, StoryFn } from '@storybook/vue3';
import BaseFormInput from './BaseFormInput.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof BaseFormInput> = {
	title: 'Components/Base/BaseFormInput',
	component: BaseFormInput,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
	argTypes: {
		size: {
			options: ['large', 'medium', 'small'],
			control: { type: 'select' },
		},
	},
};

export default meta;

const Template: StoryFn<typeof BaseFormInput> = args => ({
	components: { BaseFormInput },
	setup() {
		return { args };
	},
	template: `<div style="display: flex">
	<BaseFormInput v-bind="args" /></div>`,
});

export const Default = Template.bind({});
Default.args = {placeholder: 'please add somethink'};


export const StyleVariables: StoryFn = {
	render: () => ({
		template:
			`<pre>
				$input-color: $black
				$input-caret-color: $black
				$input-font-size: 12px
				$input-line-height: 12px
				$input-font-weight: 600
				$input-font-family: 'Avenir'
				$input-border: solid 1px $gray-40
				$input-border-radius: 6px
				$input-height: 38px
				$input-padding: 0 12px
				$input-border-focus-color: $gray-50
				$input-border-error-color: $red
				$input-placeholder-color: $gray-50
				
				$input-large-size-height: 48px
				$input-large-size-font-size: 13px
				$input-large-size-line-height: 14px
				
				$input-small-size-height: 30px
				$input-small-size-font-size: 10px
				$input-small-size-line-height: 10px
      </pre>`
	}),
};
