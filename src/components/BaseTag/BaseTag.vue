<script lang="ts" setup>
import { computed, withDefaults } from 'vue';

const props = withDefaults(defineProps<{
	round?: boolean;
	showIcon?: boolean;
	strongText?: boolean;
	whiteTextColor?: boolean;
	background?: string;
	tag?: string;
	size?: 'medium' | 'small'
}>(), {
	background: '#F2F4F5',
	tag: 'div',
	size: 'medium',
});

	
const tagClasses = computed(() => {
	let classes = `is--size-${props.size} `;
	return classes;
});
</script>

<template>
	<component
	    :is="tag"
		class="BaseTag base-tag"
		:style="{ background: background }"
		:class="[tagClasses, {
			'is--round': round,
			'is--white-text': whiteTextColor,
			'is--strong-text': strongText,
			'is--icon': showIcon
		}]"
		v-bind="$attrs"
	>
		<div class="base-tag__icon-wrapper">
			<slot name="icon" />
		</div>
		<p class="base-tag__text">
			<slot />
		</p>
	</component>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.base-tag
	padding: $base-tag-padding
	color: $base-tag-color
	display: flex
	flex-direction: row
	align-items: center
	border-radius: $base-tag-default-border-radius
	font-family: $base-tag-font-family
	$root: &
	&.is--size-small
		padding: $base-tag-small-padding
		#{$root}__text
			font-weight: $base-tag-small-font-weight
	&.is--round
		border-radius: $base-tag-round-border-radius
	&.is--strong-text
		#{$root}__text
			font-weight: $base-tag-font-weight
	&.is--white-text
		color: $base-tag-white-text-color
	&__text
		font-size: $base-tag-font-size
		font-weight: $base-tag-font-weight
		line-height: $base-tag-line-height
	&.is--icon
		padding-left: $base-tag-icon-padding-left
		#{$root}__icon-wrapper
			margin-right: $base-tag-icon-margin-after-icon
			display: flex
			align-items: center
			justify-content: center
	&__icon-wrapper
		width: $base-tag-icon-width
		height: $base-tag-icon-height
		display: none
		:deep(svg)
			width: $base-tag-icon-width
			height: $base-tag-icon-height
		:deep(div)
			display: flex
</style>
