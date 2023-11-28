import type { Meta, StoryFn } from '@storybook/vue3';
import BaseBanner from './BaseBanner.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof BaseBanner> = {
	title: 'Components/Base/BaseBanner',
	component: BaseBanner,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
	argTypes: {
		type: {
			options: ['success', 'error', 'info', 'warning'],
			control: { type: 'radio' },
		},
	},
};

export default meta;

const Template: StoryFn<typeof BaseBanner> = args => ({
	components: { BaseBanner },
	setup() {
		return { args };
	},
	template: `<div style="display: flex"><BaseBanner v-bind="args">
    <p>
			Its own DOM tree has been created and inserted into the parent container.
			Note it only guarantees that the component's DOM tree is in-document if
			the application's root container is also in-document.
		</p>
  </BaseBanner></div>`,
});

export const Success = Template.bind({});
Success.args = {show: true, storeKey: 'default'};

export const Error = Template.bind({});
Error.args = {show: true, storeKey: 'default-error', type: 'error'};

export const Info = Template.bind({});
Info.args = {show: true, storeKey: 'default-info', type: 'info'};

export const Warning = Template.bind({});
Warning.args = {show: true, storeKey: 'default-warning', type: 'warning'};

export const StyleVariables: StoryFn = {
	render: () => ({
		template:
			`<pre>
				$base-banner-padding: 10px
				$base-banner-close-button-right: 10px
				$base-banner-default-color: $white
				$base-banner-default-font-size: 12px
				$base-banner-default-line-height: 19px
				$base-banner-z-index: 9
				
				$base-banner-close-button-width: 25px
				$base-banner-close-button-height: 25px
				
				$base-banner-success-background-color: $secondary
				
				$base-banner-error-background-color: $red
				
				$base-banner-warning-background-color: $orange
				
				$base-banner-info-background-color: $blue
      </pre>`
	}),
};
