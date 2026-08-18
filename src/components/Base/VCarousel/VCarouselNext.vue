<script setup lang="ts">
import ArrowRight from 'UiKit/assets/images/arrow-right.svg?component';
import { useCarousel } from './useCarousel';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';

const { canScrollNext, scrollNext } = useCarousel();
</script>

<template>
  <VButton
    variant="link"
    icon-only
    size="large"
    :disabled="!canScrollNext"
    class="VCarouselNext v-carousel-next"
    aria-label="Next slide"
    @click="scrollNext"
  >
    <slot>
      <ArrowRight />
    </slot>
  </VButton>
</template>

<style lang="scss">
.v-carousel-next {
  position: absolute;
}
</style>
