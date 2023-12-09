import type { Meta, StoryFn } from '@storybook/vue3';
import BaseFormTextarea from './BaseFormTextarea.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof BaseFormTextarea> = {
	title: 'Components/Base/BaseFormTextarea',
	component: BaseFormTextarea,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<typeof BaseFormTextarea> = args => ({
	components: { BaseFormTextarea },
	setup() {
		return { args };
	},
	template: `<div style="display: flex">
	<BaseFormTextarea v-bind="args" /></div>`,
});

export const Default = Template.bind({});
Default.args = {placeholder: 'please add somethink'};


export const StyleVariables: StoryFn = {
	render: () => ({
		template:
			`<pre>
				$textarea-color: $black
				$textarea-caret-color: $black
				$textarea-font-size: 12px
				$textarea-line-height: 12px
				$textarea-font-weight: 600
				$textarea-font-family: 'Avenir'
				$textarea-border: solid 1px $gray-40
				$textarea-border-radius: 6px
				$textarea-height: 100%
				$textarea-padding: 12px
				$textarea-border-focus-color: $gray-50
				$textarea-border-error-color: $red
				$textarea-placeholder-color: $gray-50
      </pre>`
	}),
};
