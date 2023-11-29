<script lang="ts" setup>
import {
	computed
} from 'vue';
const props = withDefaults(defineProps<{
	title: string;
	src?: string;
	size?: 'large' | 'medium' | 'small' | 'x-small';
	round?: boolean;
}>(), {
	size: 'medium',
});

function getFirstLetters(value: string): string {
	const words = value.split(' ');
	if (words.length > 1) return `${words[0][0]}${words[words.length -1][0]}`;
	else return words[0][0];
}
const shortTitle = computed(() => {
	return getFirstLetters(props.title);
})
</script>

<template>
	<div
		class="BaseAvatar base-avatar"
		:class="[`is--${props.size}`, {'is--rounded': props.round}]"
	>
		<div
			v-if="src"
			class="base-avatar__image"
			:style="{backgroundImage: `url(${props.src})`}"
		/>
		<div
			v-else
			class="base-avatar__title"
			:title="shortTitle"
		>{{ shortTitle }}</div>
	</div>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.base-avatar
	overflow: hidden
	display: flex
	align-items: center
	justify-content: center
	font-size: $avatar-font-size
	background: $avatar-background
	border: $avatar-border
	border-radius: $avatar-border-radius
	font-weight: 800
	&.is--rounded
		border-radius: 100px
	&.is--large
		width: $avatar-large-size
		height: $avatar-large-size
		font-size: $avatar-large-font-size
	&.is--medium
		width: $avatar-medium-size
		height: $avatar-medium-size
	&.is--small
		width: $avatar-small-size
		height: $avatar-small-size
		font-size: $avatar-small-font-size
	&.is--x-small
		width: $avatar-x-small-size
		height: $avatar-x-small-size
		font-size: $avatar-x-small-font-size
	&__image
		width: 100%
		height: 100%
		background-repeat: no-repeat
		background-size: cover
</style>
