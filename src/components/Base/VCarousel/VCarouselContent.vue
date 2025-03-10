<script setup lang="ts">
import { useCarousel } from './useCarousel';

defineOptions({
  inheritAttrs: false,
});

const { carouselRef } = useCarousel();
</script>

<template>
  <div
    ref="carouselRef"
    class="VCarouselContent v-carousel-content"
  >
    <div
      v-bind="$attrs"
      class="v-carousel-content__container"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.v-carousel-content {
  display: flex;

  &__container {
    width: 100%;
    display: flex;
  }
}
</style>
