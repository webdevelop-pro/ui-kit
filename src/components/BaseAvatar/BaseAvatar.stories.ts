import type { Meta, StoryFn } from '@storybook/vue3';
import BaseAvatar from './BaseAvatar.vue';
import BaseButton from "@/components/BaseButton/BaseButton.vue";

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof BaseAvatar> = {
	title: 'Components/Base/BaseAvatar',
	component: BaseAvatar,
	// This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
	tags: ['autodocs'],
	argTypes: {
		size: {
			options: ['large', 'medium', 'small', 'x-small'],
			control: { type: 'radio' },
		},
	},
};

export default meta;

const Template: StoryFn<typeof BaseAvatar> = args => ({
	components: { BaseAvatar },
	setup() {
		return { args };
	},
	template: `<div style="display: flex"><BaseAvatar v-bind="args"></BaseAvatar></div>`,
});

export const Default = Template.bind({});
Default.args = {title: 'John Smith'};

export const Size: StoryFn = {
	render: () => ({
		components: { BaseAvatar },
		template: '<div style="display: flex; align-items: center"><BaseAvatar style="margin: 20px" size="large" title="John Smith" />'+
			'<BaseAvatar style="margin: 20px" size="medium" title="Aohn Work" />'+
			'<BaseAvatar style="margin: 20px" size="small" title="Day One" />'+
			'<BaseAvatar style="margin: 20px" size="x-small" title="John Smith" /></div>' +
			'<div style="display: flex; align-items: center"><BaseAvatar style="margin: 20px" size="large" round title="John Smith" />'+
			'<BaseAvatar style="margin: 20px" round size="medium" title="Aohn Work" />'+
			'<BaseAvatar style="margin: 20px" round size="small" title="Day One" />'+
			'<BaseAvatar style="margin: 20px" round size="x-small" title="John Smith" /></div>',
	}),
};

export const WithAvatarImage: StoryFn = {
	render: () => ({
		components: { BaseAvatar },
		template: '<div style="display: flex; align-items: center">' +
			'<BaseAvatar style="margin: 20px" size="large" title="John Smith" src="https://miro.medium.com/v2/resize:fit:600/1*PiHoomzwh9Plr9_GA26JcA.png"/>'+
			'<BaseAvatar style="margin: 20px" size="medium" title="Aohn Work" src="https://miro.medium.com/v2/resize:fit:600/1*PiHoomzwh9Plr9_GA26JcA.png"/>'+
			'<BaseAvatar style="margin: 20px" size="small" title="Day One" src="https://miro.medium.com/v2/resize:fit:600/1*PiHoomzwh9Plr9_GA26JcA.png"/>'+
			'<BaseAvatar style="margin: 20px" size="x-small" title="John Smith" src="https://miro.medium.com/v2/resize:fit:600/1*PiHoomzwh9Plr9_GA26JcA.png"/></div>' +
			'<div style="display: flex; align-items: center"><BaseAvatar style="margin: 20px" size="large" round title="John Smith" src="https://miro.medium.com/v2/resize:fit:600/1*PiHoomzwh9Plr9_GA26JcA.png"/>'+
			'<BaseAvatar style="margin: 20px" round size="medium" title="Aohn Work" src="https://miro.medium.com/v2/resize:fit:600/1*PiHoomzwh9Plr9_GA26JcA.png"/>'+
			'<BaseAvatar style="margin: 20px" round size="small" title="Day One" src="https://miro.medium.com/v2/resize:fit:600/1*PiHoomzwh9Plr9_GA26JcA.png"/>'+
			'<BaseAvatar style="margin: 20px" round size="x-small" title="John Smith" src="https://miro.medium.com/v2/resize:fit:600/1*PiHoomzwh9Plr9_GA26JcA.png"/></div>',
	}),
};

export const StyleVariables: StoryFn = {
	render: () => ({
		template:
			`<pre>
					$avatar-border: none
					$avatar-border-radius: 6px
					$avatar-font-size: 20px
					$avatar-background: $red-light
					
					$avatar-large-size: 140px
					$avatar-large-font-size: 40px
					
					$avatar-medium-size: 70px
					
					$avatar-small-size: 35px
					$avatar-small-font-size: 14px
					
					$avatar-x-small-size: 20px
					$avatar-x-small-font-size: 11px
      </pre>`
	}),
};
