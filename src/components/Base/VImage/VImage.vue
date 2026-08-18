<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});

import VSkeleton from 'UiKit/components/Base/VSkeleton/VSkeleton.vue';
import defaultImage from 'UiKit/assets/images/default.svg?url';
import {
  computed,
  nextTick,
  onMounted,
  shallowRef,
  useAttrs,
  watch,
} from 'vue';

const props = withDefaults(defineProps<{
  src: string | undefined;
  srcset?: string;
  sizes?: string;
  alt: string;
  fit?: 'cover' | 'contain' | 'inherit' | 'none';
  loading?: 'lazy' | 'eager' | undefined;
  clientOnly?: boolean;
  isFullWidth?: boolean;
  isLoading?: boolean;
  decoding?: 'async' | 'sync' | 'auto';
  fetchpriority?: 'high' | 'low' | 'auto';
}>(), {
  fit: 'none',
  loading: 'eager',
  decoding: 'async',
});

const emit = defineEmits<{
  'loading:src': [isLoading: boolean];
}>();

const attrs = useAttrs();
const imageElement = shallowRef<HTMLImageElement | null>(null);
const hasError = shallowRef(false);
const isImageLoading = shallowRef(Boolean(props.src));
const isFallbackImage = computed(() => hasError.value || !props.src);
const currentSrc = computed(() => {
  if (isFallbackImage.value) {
    return defaultImage;
  }

  return props.src;
});

const currentSrcset = computed(() => {
  if (isFallbackImage.value) {
    return undefined;
  }

  return props.srcset;
});

const currentSizes = computed(() => {
  if (isFallbackImage.value) {
    return undefined;
  }

  return props.sizes;
});

const imageKey = computed(() => [currentSrc.value, currentSrcset.value ?? '', currentSizes.value ?? ''].join('::'));
const isLoadingLocal = computed(() => Boolean(props.isLoading) || isImageLoading.value);

const rootClasses = computed(() => [
  `is--${props.fit}`,
  {
    'is--bg': !props.src,
    'is--full-width': props.isFullWidth,
  },
]);

const imageClasses = computed(() => [
  `is--${props.fit}`,
  {
    'is--default-image': isFallbackImage.value,
    'is--loading': isLoadingLocal.value,
  },
]);

const getImageAttrs = () => {
  const imageAttrs = { ...attrs };
  delete imageAttrs.class;
  delete imageAttrs.style;

  return imageAttrs;
};

watch(() => isLoadingLocal.value, () => {
  emit('loading:src', isLoadingLocal.value);
}, { immediate: true });

watch(() => [props.src, props.srcset, props.sizes], () => {
  hasError.value = false;
  isImageLoading.value = Boolean(props.src);
}, { immediate: true });

const handleImageLoad = () => {
  isImageLoading.value = false;
};

const handleImageError = () => {
  // Only set error if we're not already showing the default image
  // This prevents infinite error loops if the default image itself fails
  if (!hasError.value && props.src) {
    hasError.value = true;
  }

  isImageLoading.value = false;
};

const syncImageState = () => {
  if (!isImageLoading.value || !imageElement.value?.complete) {
    return;
  }

  if (imageElement.value.naturalWidth > 0) {
    handleImageLoad();
    return;
  }

  handleImageError();
};

watch(imageKey, async () => {
  await nextTick();
  syncImageState();
}, { flush: 'post' });

onMounted(() => {
  syncImageState();
});
</script>

<template>
  <div
    class="VImage v-image"
    :class="[$attrs.class, rootClasses]"
    :style="$attrs.style"
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
        v-bind="getImageAttrs()"
        ref="imageElement"
        :key="imageKey"
        :src="currentSrc"
        :srcset="currentSrcset"
        :sizes="currentSizes"
        :alt="alt"
        :loading="loading"
        :decoding="decoding"
        :fetchpriority="fetchpriority"
        class="v-image__image"
        :class="[$attrs.class, imageClasses]"
        @load="handleImageLoad"
        @error="handleImageError"
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
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  &__image {
    height: 100%;
    width: 100%;
    margin: 0 auto !important;
    display: block;

    &.is--loading {
      opacity: 0;
      visibility: hidden;
    }

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
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  .is--default-image {
    max-height: 45%;
    width: auto;
    position: relative;
  }
}
</style>
