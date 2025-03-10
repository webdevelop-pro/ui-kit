<script lang="ts" setup>
import VSkeleton from 'UiKit/components/Base/VSkeleton/VSkeleton.vue';
import defaulImage from 'UiKit/assets/images/default.svg?url';
import { useImage } from '@vueuse/core';
import { watch } from 'vue';

const props = withDefaults(defineProps<{
  src: string | undefined;
  alt: string;
  fit?: 'cover' | 'contain' | 'none';
  loading?: 'lazy' | 'eager' | undefined;
  clientOnly?: boolean;
  isFullWidth?: boolean;
}>(), {
  fit: 'none',
  loading: 'eager',
});

const emit = defineEmits(['loading:src']);

const { isLoading } = useImage({ src: props.src || '' });

watch(() => isLoading.value, () => {
  emit('loading:src', isLoading.value);
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
        v-show="isLoading"
        height="100%"
        width="100%"
        class="v-image__skeleton"
      />
      <img
        v-show="!isLoading"
        v-bind="$attrs"
        :key="src"
        :src="src || defaulImage"
        :alt="alt"
        :loading="loading"
        class="v-image__image"
        :class="[`is--${fit}`, { 'is--default-image': !src }]"
      />
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
