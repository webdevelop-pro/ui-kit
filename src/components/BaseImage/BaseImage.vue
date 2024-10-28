<script lang="ts" setup>
import BaseSkeleton from 'UiKit/components/BaseSkeleton/BaseSkeleton.vue';
import defaulImage from 'UiKit/assets/default.svg?url';
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<{
    src: string | undefined,
    alt: string,
	fit?: 'cover' | 'contain' | 'inherit'
	loading?: 'lazy' | 'eager' | undefined,
}>(), {
	fit: 'cover',
	loading: 'eager',
});

const isImageLoaded = ref<Boolean>(false)
const onImageLoaded = () => {
  setTimeout(() => {
    isImageLoaded.value = true
  }, 200)
}
const showImage = computed(() => {
	return isImageLoaded.value || (props.loading === 'lazy')
});
</script>

<template>
	<div
		class="BaseImage base-image"
		:class="[`is--${fit}`, { 'is--bg': !src }]"
	>
		<BaseSkeleton
			v-show="!showImage"
			height="100%"
			width="100%"
			class="base-image__skeleton"
		/>
		<img
			v-show="showImage"
			:src="src || defaulImage"
			:alt="alt"
			:key="src"
            :loading="loading"
			class="base-image__image"
            :class="[`is--${fit}`, { 'is--default-image': !src }]"
			@load="onImageLoaded"
		/>
	</div>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.base-image
	$root:&
	width: 100%
	height: 100%
	display: flex
	justify-content: center
	align-items: center
	overflow: hidden

	&.is--bg
		background-color: $default-background-color

	&__image
		height: 100%
		width: 100%
		&.is--cover
			object-fit: cover
		&.is--contain
			object-fit: contain
		&.is--inherit
			object-fit: inherit

	&__skeleton
		min-height: inherit

	.is--default-image
		max-height: 25%
		width: auto
</style>
