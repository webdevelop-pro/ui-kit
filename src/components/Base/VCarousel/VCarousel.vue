<script setup lang="ts">
import type { CarouselEmits, CarouselProps } from './interface';
import { useProvideCarousel } from './useCarousel';

// yarn add embla-carousel-vue

const props = withDefaults(defineProps<CarouselProps>(), {
  orientation: 'horizontal',
});

const emits = defineEmits<CarouselEmits>();

const {
  canScrollNext, canScrollPrev, carouselApi, carouselRef, orientation, scrollNext, scrollPrev,
} = useProvideCarousel(props, emits);

defineExpose({
  canScrollNext,
  canScrollPrev,
  carouselApi,
  carouselRef,
  orientation,
  scrollNext,
  scrollPrev,
});

function onKeyDown(event: KeyboardEvent) {
  const prevKey = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
  const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';

  if (event.key === prevKey) {
    event.preventDefault();
    scrollPrev();

    return;
  }

  if (event.key === nextKey) {
    event.preventDefault();
    scrollNext();
  }
}
</script>

<template>
  <div
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    class="VCarousel v-carousel"
    itemscope
    itemtype="https://schema.org/MediaGallery"
    @keydown="onKeyDown"
  >
    <slot
      :can-scroll-next
      :can-scroll-prev
      :carousel-api
      :carousel-ref
      :orientation
      :scroll-next
      :scroll-prev
    />
  </div>
</template>

<style lang="scss">
.v-carousel {
  position: relative;
}
</style>
