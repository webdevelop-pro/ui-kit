<script setup lang="ts">
import {
  VCarouselContent, VCarousel, VCarouselPrevious, VCarouselNext,
} from '../Base/VCarousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { computed } from 'vue';

interface Props {
    variant?: 'default' | 'autoplay';
    autoplay?: boolean;
    fade?: boolean;
    autoplayChangeTime?: number;
    options?: object;
}

const props = withDefaults(defineProps<Props>(), {
  autoplayChangeTime: 6000,
  variant: 'default',
});

const isAutoplay = computed(() => props.variant === 'autoplay');

const plugins = [];
if (props.autoplay || isAutoplay.value) {
  plugins.push(Autoplay({
    delay: props.autoplayChangeTime,
    stopOnInteraction: false,
  }));
}
if (props.fade || isAutoplay.value) {
  plugins.push(Fade());
}
</script>

<template>
  <VCarousel
    class="v-slider"
    :opts="{
      align: 'start',
      ...props.options,
    }"
    :plugins="plugins"
    orientation="horizontal"
    :class="{ 'is--autoplay': isAutoplay }"
  >
    <VCarouselPrevious class="v-slider__prev" />
    <VCarouselNext class="v-slider__next" />
    <VCarouselContent class="v-slider__content">
      <slot />
    </VCarouselContent>
  </VCarousel>
</template>

<style lang="scss">
.v-slider {
  $root: &;
  width: 100%;

  &:not(.is--autoplay) {
    margin-top: 10px;
    @media screen and (max-width: 767px) {
      margin-top: 40px;
    }
  }

  &.is--autoplay {
    #{$root}__prev,
    #{$root}__next {
      display: none;
    }
  }

  &__prev {
    top: -95px;
    right: 70px;
    @media screen and (max-width: 767px) {
     top: -75px;
    }
  }

  &__next {
    top: -95px;
    right: 15px;
    @media screen and (max-width: 767px) {
      top: -75px;
    }
  }

  .with-default-distance #{$root},
  #{$root}.with-default-distance {
      margin-top: 60px;
      @media screen and (max-width: $tablet){
        margin-top: 100px;
      }
  }
}

</style>
