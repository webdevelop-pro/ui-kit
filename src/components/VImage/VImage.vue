<script lang="ts" setup>
import VSkeleton from 'UiKit/components/VSkeleton/VSkeleton.vue';
import defaulImage from 'UiKit/assets/images/default.svg?url';
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<{
  src: string | undefined;
  alt: string;
  fit?: 'cover' | 'contain' | 'inherit';
  loading?: 'lazy' | 'eager' | undefined;
}>(), {
  fit: 'cover',
  loading: 'eager',
});

const isImageLoaded = ref<boolean>(false);
const onImageLoaded = () => {
  setTimeout(() => {
    isImageLoaded.value = true;
  }, 200);
};
const showImage = computed(() => isImageLoaded.value || (props.loading === 'lazy'));
</script>

<template>
  <div
    class="VImage v-image"
    :class="[`is--${fit}`, { 'is--bg': !src }]"
  >
    <ClientOnly>
      <VSkeleton
        v-show="!showImage"
        height="100%"
        width="100%"
        class="v-image__skeleton"
      />
      <img
        v-show="showImage"
        :key="src"
        :src="src || defaulImage"
        :alt="alt"
        :loading="loading"
        class="v-image__image"
        :class="[`is--${fit}`, { 'is--default-image': !src }]"
        @load="onImageLoaded"
      />
    </ClientOnly>
  </div>
</template>

<style lang="sass">
@use 'index.sass' as *
.v-image
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
