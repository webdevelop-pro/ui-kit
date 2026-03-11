import { createInjectionState } from '@vueuse/core';
import emblaCarouselVue from 'embla-carousel-vue';
import { onMounted, onUnmounted, ref } from 'vue';
import type { UnwrapRefCarouselApi as CarouselApi, CarouselEmits, CarouselProps } from './interface';

const [useProvideCarousel, useInjectCarousel] = createInjectionState(
  ({
    opts,
    orientation,
    plugins,
  }: CarouselProps, emits: CarouselEmits) => {
    const [emblaNode, emblaApi] = emblaCarouselVue({
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    }, plugins);

    function scrollPrev() {
      emblaApi.value?.scrollPrev();
    }
    function scrollNext() {
      emblaApi.value?.scrollNext();
    }

    const canScrollNext = ref(false);
    const canScrollPrev = ref(false);

    function onSelect(api: CarouselApi) {
      const nextValue = api?.canScrollNext() || false;
      const prevValue = api?.canScrollPrev() || false;
      if (canScrollNext.value !== nextValue) {
        canScrollNext.value = nextValue;
      }
      if (canScrollPrev.value !== prevValue) {
        canScrollPrev.value = prevValue;
      }
    }

    onMounted(() => {
      if (!emblaApi.value) return;

      emblaApi.value?.on('init', onSelect);
      emblaApi.value?.on('reInit', onSelect);
      emblaApi.value?.on('select', onSelect);

      emits('init-api', emblaApi.value);
    });

    onUnmounted(() => {
      if (!emblaApi.value) return;
      emblaApi.value.off('init', onSelect);
      emblaApi.value.off('reInit', onSelect);
      emblaApi.value.off('select', onSelect);
    });

    return {
      carouselRef: emblaNode, carouselApi: emblaApi, canScrollPrev, canScrollNext, scrollPrev, scrollNext, orientation,
    };
  },
);

function useCarousel() {
  const carouselState = useInjectCarousel();

  if (!carouselState) throw new Error('useCarousel must be used within a <Carousel />');

  return carouselState;
}

export { useCarousel, useProvideCarousel };
