import type { Meta, StoryFn } from '@storybook/vue3';
import BaseFormInput from './BaseFormInput.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof BaseFormInput> = {
	title: 'Components/Base/BaseFormInput',
	component: BaseFormInput,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
	argTypes: {
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
      </pre>`
	}),
};
