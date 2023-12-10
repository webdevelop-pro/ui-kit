import type { Meta, StoryFn } from '@storybook/vue3';
import BaseFormCheckbox from './BaseFormCheckbox.vue';
import BaseFormCheckboxGroup from './BaseFormCheckboxGroup.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof BaseFormCheckbox> = {
	title: 'Components/Base/BaseFormCheckbox',
	component: BaseFormCheckbox,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<typeof BaseFormCheckbox> = args => ({
	components: { BaseFormCheckbox, BaseFormCheckboxGroup },
	setup() {
		const modelValue = ['Checkbox 1'];
		return { args, modelValue };
	},
	template: `<div style="display: flex">
	<BaseFormCheckboxGroup
		v-bind="args"
		:options="['Checkbox 1', 'Checkbox 2', 'Checkbox 3']"
		:model-value="modelValue"
	>
	</BaseFormCheckboxGroup>
	</div>`,
});

export const Default = Template.bind({});
Default.args = {};


export const StyleVariables: StoryFn = {
	render: () => ({
		template:
			`<pre>

      </pre>`
	}),
};
