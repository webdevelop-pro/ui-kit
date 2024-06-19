<script lang="ts" setup>
import BaseSkeleton from 'UiKit/components/BaseSkeleton/BaseSkeleton.vue';
import { ref } from 'vue';

const props = withDefaults(defineProps<{
    src: string | undefined,
    alt: string,
	fit: 'cover' | 'contain' | 'inherit'
}>(), {
	fit: 'cover',
});

const isImageLoaded = ref<Boolean>(false)
const onImageLoaded = () => {
  setTimeout(() => {
    isImageLoaded.value = true
  }, 200)
}
</script>

<template>
	<div
		class="BaseImage base-image"
		:class="[`is--${fit}`]"
	>
		<BaseSkeleton
			v-show="!isImageLoaded"
			height="100%"
			width="100%"
			class="base-image__skeleton"
		/>
		<img
			v-show="isImageLoaded"
			:src="src"
			:alt="alt"
			class="base-image__image"
			:class="[`is--${fit}`]"
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
</style>
