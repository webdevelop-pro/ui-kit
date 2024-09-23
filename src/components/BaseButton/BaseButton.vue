<script lang="ts" setup>
	import { withDefaults, computed } from 'vue';
	import BaseSpinner from 'UiKit/components/BaseSpinner';
	
	interface Props {
		tag?: 'button' | 'a' | 'router-link'
		size?: 'large' | 'medium' | 'small' | 'x-small'
		variant?: 'outlined' | 'link'
		color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
		block?: boolean
		disabled?: boolean
		loading?: boolean
		squared?: boolean
		pill?: boolean
		iconOnly?: boolean
		iconPlacement?: 'none' | 'left' | 'right' | 'both'
	}
	const props = withDefaults(defineProps<Props>(), {
		size: 'medium',
		color: 'primary',
		tag: 'button',
		iconPlacement: 'none',
	})
	
	const btnClasses = computed(() => {
		let classes = `is--color-${props.color} `;
		classes += `is--size-${props.size} `;
		classes += `is--variant-${props.variant} `;
		classes += `is--icon-placement-${props.iconPlacement} `;
		return classes;
	});

</script>

<template>
  <component
    :is="tag"
    class="base-button"
    :class="[btnClasses, {'is--block': props.block, 'is--icon-only': iconOnly, 'is--disabled': props.disabled, 'is--squared': squared && !pill, 'is--pill': pill && !squared}]"
    :disabled="loading"
  >
    <span
      class="base-button__content"
    >
      <slot>Button</slot>
	</span>
	  <BaseSpinner
		  v-if="loading"
		  show
		  small
	  />
  </component>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.base-button
	display: inline-flex
	justify-content: center
	align-items: center
	border: unset
	font-family: $base-button-font-family
	line-height: $base-button-line-height
	font-weight: $base-button-font-weight
	height: $base-button-height
	color: $base-button-color
	background-color: transparent
	border-radius: $base-button-border-radius
	padding: $base-button-padding
	font-size: $base-button-font-size
	cursor: pointer
	position: relative
	transition: all .3s
	box-shadow: $base-button-box-shadow
	letter-spacing: 0.3px
	&:hover
		box-shadow: none
		color: $base-button-hover-color
	&__content
		transition: opacity .3s
		display: flex
		align-items: center
		justify-content: center
		flex-shrink: 0
	&.is--icon-placement-both
		:deep(svg),
		:deep(img)
			&:first-child
				margin-right: $base-button-icon-margin
			&:last-child
				margin-left: $base-button-icon-margin
	&.is--icon-placement-left
		:deep(svg),
		:deep(img)
			margin-right: $base-button-icon-margin
	&.is--icon-placement-right
		:deep(svg),
		:deep(img)
			margin-left: $base-button-icon-margin
	&.is--icon-placement-none
		:deep(svg),
		:deep(img)
			margin: 0
	&.is--block
		width: 100%
	&.is--squared
		border-radius: 0
	&.is--pill
		border-radius: $base-button-pill
	&.is--disabled
		opacity: 0.3
		pointer-events: none
	&.is--size-large
		height: $base-button-large-height
		padding: $base-button-large-padding
		font-size: $base-button-large-font-size
		line-height: $base-button-large-line-height
	&.is--size-small
		height: $base-button-small-height
		padding: $base-button-small-padding
		font-size: $base-button-small-font-size
	&.is--size-x-small
		height: $base-button-x-small-height
		padding: $base-button-x-small-padding
	&.is--color-primary
		background-color: $base-button-primary-color
		&:hover
			background-color: $base-button-primary-hover-color
	&.is--color-secondary
		background-color: $base-button-secondary-color
		color: $base-button-secondary-text-color
		&:hover
			background-color: $base-button-secondary-hover-color
			color: $base-button-secondary-text-hover-color
	&.is--color-success
		background-color: $base-button-success-color
		color: $base-button-success-text-color
		&:hover
			background-color: $base-button-success-hover-color
			color: $base-button-success-text-color
	&.is--color-warning
		background-color: $base-button-warning-color
		&:hover
			background-color: $base-button-warning-hover-color
	&.is--color-danger
		background-color: $base-button-danger-color
		&:hover
			background-color: $base-button-danger-hover-color
	&.is--variant-outlined
		background-color: $white
		border-style: solid
		border-width: $base-button-border-width
		&.is--color-primary
			border-color: $base-button-primary-color
			color: $base-button-primary-color
			&:hover
				background-color: $base-button-primary-color
				color: $base-button-color
		&.is--color-secondary
			border-color: $base-button-secondary-color
			color: $base-button-secondary-color
			&:hover
				background-color: $base-button-secondary-color
				color: $base-button-color
		&.is--color-success
			border-color: $base-button-success-color
			&:hover
				background-color: $base-button-success-color
		&.is--color-warning
			border-color: $base-button-warning-color
			color: $base-button-warning-color
			&:hover
				background-color: $base-button-warning-color
				color: $base-button-color
		&.is--color-danger
			border-color: $base-button-danger-color
			color: $base-button-danger-color
			&:hover
				background-color: $base-button-danger-color
				color: $base-button-color
	&.is--variant-link
		background-color: transparent
		box-shadow: none
		&.is--color-primary
			color: $base-button-primary-color
			&:hover
				background-color: $base-button-primary-light-color
		&.is--color-secondary
			color: $base-button-secondary-color
			&:hover
				background-color: rgba($base-button-secondary-color, 0.1)
		&.is--color-success
			color: $base-button-success-text-color
			&:hover
				background-color: rgba($base-button-success-color, 0.1)
		&.is--color-warning
			color: $base-button-warning-color
			&:hover
				background-color: rgba($base-button-warning-color, 0.1)
		&.is--color-danger
			color: $base-button-danger-color
			&:hover
				background-color: rgba($base-button-danger-color, 0.1)
	&.is--icon-only
		padding: $base-button-icon-only-padding
		height: $base-button-icon-only-size
		width: $base-button-icon-only-size
		&.is--size-large
			height: $base-button-icon-only-large-size
			width: $base-button-icon-only-large-size
		&.is--size-small
			height: $base-button-icon-only-small-size
			width: $base-button-icon-only-small-size
			padding: $base-button-icon-only-small-padding
</style>
