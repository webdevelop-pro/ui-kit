<script lang="ts" setup>
import { withDefaults } from 'vue';

withDefaults(defineProps<{
	round?: boolean;
	showIcon?: boolean;
	strongText?: boolean;
	whiteTextColor?: boolean;
	background?: string;
}>(), {
	background: '#F2F4F5',
});

</script>

<template>
	<div
		class="BaseTag base-tag"
		:style="{ background: background }"
		:class="{'is--round': round, 'is--white-text': whiteTextColor, 'is--strong-text': strongText, 'is--icon': showIcon}"
	>
		<div class="base-tag__icon-wrapper">
			<slot name="icon" />
		</div>
		<p class="base-tag__text">
			<slot />
		</p>
	</div>
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
	$root: &
	&.is--round
		border-radius: $base-tag-round-border-radius
	&.is--strong-text
		#{$root}__text
			+font(500)
	&.is--white-text
		color: $base-tag-white-text-color
	&__text
		font-size: $base-tag-font-size
		+font(400)
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
