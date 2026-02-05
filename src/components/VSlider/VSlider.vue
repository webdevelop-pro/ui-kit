<script setup lang="ts">
import {
  VCarouselContent, VCarousel, VCarouselPrevious, VCarouselNext,
  CarouselApi,
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
    showButtons?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  autoplayChangeTime: 6000,
  variant: 'default',
  showButtons: true,
});

const emit = defineEmits<{
  'init-api': [api: CarouselApi];
}>();

const isAutoplay = computed(() => props.variant === 'autoplay');
const shouldShowButtons = computed(() => props.showButtons && !isAutoplay.value);

const plugins = [];
if (props.autoplay || isAutoplay.value) {
  plugins.push(Autoplay({
    delay: props.autoplayChangeTime,
    stopOnInteraction: false,
  }));
}
// Only use fade if explicitly enabled via fade prop
if (props.fade) {
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
    :class="{ 'is--autoplay': isAutoplay, 'is--no-buttons': !shouldShowButtons }"
    @init-api="emit('init-api', $event)"
  >
    <VCarouselPrevious
      v-if="shouldShowButtons"
      class="v-slider__prev"
    />
    <VCarouselNext
      v-if="shouldShowButtons"
      class="v-slider__next"
    />
    <VCarouselContent class="v-slider__content">
      <slot />
    </VCarouselContent>
  </VCarousel>
</template>

<style lang="scss">
.v-slider {
  $root: &;

  width: 100%;

  &:not(.is--autoplay, .is--no-buttons) {
    margin-top: 10px;

    @media screen and (width <= 767px) {
      margin-top: 40px;
    }
  }

  &.is--autoplay,
  &.is--no-buttons {
    #{$root}__prev,
    #{$root}__next {
      display: none;
    }
  }

  &__prev {
    top: -95px;
    right: 70px;

    @media screen and (width <= 767px) {
     top: -75px;
    }
  }

  &__next {
    top: -95px;
    right: 15px;

    @media screen and (width <= 767px) {
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
