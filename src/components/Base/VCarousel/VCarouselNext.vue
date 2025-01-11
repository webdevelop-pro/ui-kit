<script setup lang="ts">
import ArrowRight from 'UiKit/assets/images/arrow-right-primary.svg?component';
import { useCarousel } from './useCarousel';
import { VButton } from '../VButton';

const { canScrollNext, scrollNext } = useCarousel();
</script>

<template>
  <VButton
    variant="link"
    icon-only
    size="large"
    :disabled="!canScrollNext"
    class="VCarouselNext v-carousel-next"
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
