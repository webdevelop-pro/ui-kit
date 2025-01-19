<script setup lang="ts">
import ArrowLeft from 'UiKit/assets/images/arrow-left.svg?component';
import { useCarousel } from './useCarousel';
import { VButton } from '../VButton';

const { canScrollPrev, scrollPrev } = useCarousel();
</script>

<template>
  <VButton
    :disabled="!canScrollPrev"
    variant="link"
    icon-only
    size="large"
    class="VCarouselPrev v-carousel-prev"
    @click="scrollPrev"
  >
    <slot>
      <ArrowLeft />
    </slot>
  </VButton>
</template>


<style lang="scss">
.v-carousel-prev {
  position: absolute;
}
</style>
