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
    <ul
      v-bind="$attrs"
      class="v-carousel-content__container"
    >
      <slot />
    </ul>
  </div>
</template>

<style lang="scss">
.v-carousel-content {
  display: flex;
  width: 100%;

  &__container {
    width: 100%;
    display: flex;
    padding-left: 0;
  }
}
</style>
