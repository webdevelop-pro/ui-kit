<script lang="ts" setup="">
import { BaseSvgIcon } from 'UiKit/components/BaseSvgIcon'

withDefaults(defineProps<{
	type?: 'error' | 'warning' | 'success';
	show?: boolean;
	icon?: boolean;
}>(), {
	type: 'error',
});

</script>

<template>
	<!-- eslint-disable vue/no-v-html -->
	<div
		v-if="show"
		class="BaseNotificationInline notification-inline"
		:class="`is--${type}`"
	>
		<p class="notification-inline__body">
			<BaseSvgIcon
				v-if="(type === 'error') && icon"
				class="svg-icon notification-inline__icon"
				alt="exclamation-circle-icon"
				name="fa-circle-exclamation"
			/>
			<BaseSvgIcon
				v-else-if="(type === 'warning') && icon"
				alt="info-circle-icon"
				class="svg-icon notification-inline__icon"
				name="fa-triangle-exclamation"
			/>
			<BaseSvgIcon
				v-else-if="icon"
				alt="info-circle-icon"
				class="svg-icon notification-inline__icon"
				name="fa-circle-check"
			/>
			<span class="notification-inline__content">
				<slot />
			</span>
		</p>
	</div>
</template>

<style lang="sass" scoped>
@import 'index.sass'

.notification-inline
	color: $notification-inline-color
	margin: $notification-inline-margin
	border-left: solid 3px transparent

	&__body
		font-size: $notification-inline-font-size
		line-height: $notification-inline-line-height
		padding: $notification-inline-padding
		margin-bottom: 0
		+font(400)
		display: flex
		align-items: flex-start

	&__icon
		width: $notification-inline-width
		height: $notification-inline-height
		margin-top: -1px
		flex-shrink: 0
	&__content
		margin-left: $notification-inline-margin-left
		:deep(a)
			position: relative
			display: inline
			z-index: 1
			+mt(.3s)
			color: $notification-inline-link-color
			font-size: $notification-inline-font-size
			line-height: $notification-inline-line-height
			+font(400)
			border-bottom: solid 1px $notification-inline-link-color
			&:hover
				+mt(.3s)
				border-bottom: solid 1px transparent
				color: $secondary

	&.is--error
		background-color: $notification-inline-error-background-color
		border-color: $notification-inline-error-color
		.notification-inline__icon
			fill: $notification-inline-error-color
		.notification-inline__content
			:deep(a)
				color: $notification-inline-error-color
				border-color: $notification-inline-error-color
				&:hover
					color: $notification-inline-error-color
					border-color: transparent
	&.is--warning
		background-color: $notification-inline-warning-background-color
		border-color: $notification-inline-warning-color
		.notification-inline__icon
			fill: $notification-inline-warning-color
		.notification-inline__content
			:deep(a)
				color: $notification-inline-warning-color
				border-color: $notification-inline-warning-color
				&:hover
					color: $notification-inline-warning-color
					border-color: transparent
	&.is--success
		background-color: $notification-inline-success-background-color
		border-color: $notification-inline-success-color
		.notification-inline__icon
			fill: $notification-inline-success-color
		.notification-inline__content
			:deep(a)
				color: $notification-inline-success-color
				border-color: $notification-inline-success-color
				&:hover
					color: $notification-inline-success-color
					border-color: transparent
</style>
