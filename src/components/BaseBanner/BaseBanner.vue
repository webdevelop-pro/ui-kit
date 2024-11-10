<script lang="ts" setup>
import {
	computed,
	ref,
	onBeforeUnmount,
	onMounted,
	nextTick,
	useSlots,
} from 'vue';

const props = withDefaults(defineProps<{
	storeKey: string,
	show: boolean,
	type?: 'success' | 'error' | 'info' | 'warning',
}>(), {
	type: 'success',
});

const slots = useSlots();
const isMounted = ref(false);
const isClosedBanner = ref(false);
const isVisibleBanner = computed(() => props.show && !isClosedBanner.value);


onMounted(async () => {
	await nextTick();
	isMounted.value = true;
});

onBeforeUnmount(() => {
	sessionStorage.removeItem(props.storeKey);
});

function setCloseBannerDuringSession() {
	sessionStorage.setItem(props.storeKey, 'true');
}

function getCloseBannerDuringSession() {
	const stringValue = sessionStorage.getItem(props.storeKey);
	isClosedBanner.value = (stringValue === 'true');
}

function closeBanner() {
	isClosedBanner.value = true;
	setCloseBannerDuringSession();
}

getCloseBannerDuringSession();

</script>

<template>
	<div
		v-if="isVisibleBanner && isMounted"
		class="BaseBanner base-banner"
		:class="[`is--${type}`]"
	>
		<div
			class="base-banner__content"
		>
			<slot />
		</div>
		<button
			class="base-banner__close-button"
			type="button"
			aria-label="Close modal"
			@click="closeBanner"
		>
			<span
				v-if="slots.closeIcon"
				class="base-banner__close-icon"
			>
				<slot name="closeIcon" />
			</span>
			<span
				v-else
				class="base-banner__close-icon is--default"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
					version="1.1"
					width="25"
					height="25"
					viewBox="0 0 25 25"
				>
          <path d="M18.4898 8.52162L19.5 7.51589L17.4841 5.5L16.4784 6.50572L12.5 10.4841L8.52162
          6.51017L7.51589 5.5L5.5 7.51589L6.50572 8.52162L10.4841 12.5L6.51017 16.4784L5.5 17.4841L7.51589
          19.5L8.52162 18.4943L12.5 14.5159L16.4784 18.4943L17.4841 19.5L19.5 17.4841L18.4943
          16.4784L14.5159 12.5L18.4943 8.52162H18.4898Z"
          />
				</svg>
			</span>
		</button>
	</div>
</template>

<style lang="sass" scoped>
@use 'index.sass' as *
.base-banner
	width: 100%
	height: auto
	padding: $base-banner-padding
	position: relative
	z-index: $base-banner-z-index
	color: $base-banner-default-color
	fill: $base-banner-default-color
	font-size: $base-banner-default-font-size
	line-height: $base-banner-default-line-height
	&.is--success
		background-color: $base-banner-success-background-color
	&.is--error
		background-color: $base-banner-error-background-color
	&.is--warning
		background-color: $base-banner-warning-background-color
	&.is--info
		background-color: $base-banner-info-background-color
	&__content
		width: calc(100% - #{$base-banner-close-button-right} - #{$base-banner-close-button-width})
	&__close-button
		position: absolute
		right: $base-banner-close-button-right
		top: 50%
		transform: translate(0, -50%)
		width: $base-banner-close-button-width
		height: $base-banner-close-button-height
		cursor: pointer
	&__close-icon
		&.is--default
			width: $base-banner-close-button-width
			height: $base-banner-close-button-height
</style>
