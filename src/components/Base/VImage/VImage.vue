<script lang="ts" setup>
import VSkeleton from 'UiKit/components/Base/VSkeleton/VSkeleton.vue';
import defaulImage from 'UiKit/assets/images/default.svg?url';
import { useImage } from '@vueuse/core';
import { computed, watch } from 'vue';

const props = withDefaults(defineProps<{
  src: string | undefined;
  alt: string;
  fit?: 'cover' | 'contain' | 'none';
  loading?: 'lazy' | 'eager' | undefined;
  clientOnly?: boolean;
  isFullWidth?: boolean;
  isLoading?: boolean;
  fetchpriority?: 'high' | 'low' | 'auto';
}>(), {
  fit: 'none',
  loading: 'eager',
});

const emit = defineEmits(['loading:src']);

const { isLoading } = useImage({ src: props.src || '' });

const isLoadingLocal = computed(() => props.isLoading || isLoading.value);

watch(() => isLoadingLocal.value, () => {
  emit('loading:src', isLoadingLocal.value);
}, { immediate: true });
</script>

<template>
  <div
    class="VImage v-image"
    :class="[`is--${fit}`, { 'is--bg': !src, 'is--full-width': isFullWidth }]"
    itemscope
    itemtype="https://schema.org/ImageObject"
  >
    <component
      :is="clientOnly ? 'ClientOnly' : 'div'"
      class="v-image__client"
    >
      <VSkeleton
        v-show="isLoadingLocal"
        height="100%"
        width="100%"
        class="v-image__skeleton"
      />
      <img
        v-show="!isLoadingLocal"
        v-bind="$attrs"
        :key="src"
        :src="src || defaulImage"
        :alt="alt"
        :loading="loading"
        :fetchpriority="fetchpriority"
        class="v-image__image"
        :class="[`is--${fit}`, { 'is--default-image': !src }]"
      >
    </component>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-image {
  $root:&;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &.is--bg{
    background-color: colors.$primary-light;
  }

  &.is--full-width {
    width: 100%;
  }

  &__client {
    height: 100%;
    width: 100%;
    min-height: inherit;
  }

  &__image {
    height: 100%;
    width: 100%;
    margin: 0 auto !important;

    &.is--cover{
      object-fit: cover;
    }

    &.is--contain{
      object-fit: contain;
    }

    &.is--inherit{
      object-fit: inherit;
    }
  }

  &__skeleton{
    min-height: inherit;
  }

  .is--default-image {
    max-height: 45%;
    width: auto;
    left: 50%;
    top: 50%;
    position: relative;
    transform: translate(-50%, -50%);
  }
}
</style>
