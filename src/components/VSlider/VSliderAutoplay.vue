<script setup lang="ts">
import VSlider from './VSlider.vue';
import { PropType, ref, watch } from 'vue';
import VCarouselItem from 'UiKit/components/Base/VCarousel/VCarouselItem.vue';
import { CarouselApi } from '../Base/VCarousel';

// yarn add embla-carousel-autoplay
// yarn add embla-carousel-fade

interface ISliderAutpoplay {
  id: number;
  testimonials?: {
    text: string;
    author: string;
  }[];
}
const props = defineProps({
  dataInterface: Object,
  data: Array as PropType<ISliderAutpoplay[]>,
  autoplay: {
    type: Boolean,
    default: true,
  },
  activecolor: {
    type: String,
    default: '#F1AF32',
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  autoplayChangeTime: {
    type: Number,
    default: 6000,
  },
});

const api = ref<CarouselApi>();
const active = ref(props.data[0]);

function setApi(val: CarouselApi) {
  api.value = val;
}
const activeElementId = ref(0);

const setActiveElement = () => {
  active.value = props.data[activeElementId.value];
};

const changeSlide = (index: number) => {
  api.value?.scrollTo(index);
  api.value?.plugins()?.autoplay.reset();
};

watch(api, (value) => {
  if (!value) return;

  activeElementId.value = value.selectedScrollSnap();

  value.on('select', () => {
    activeElementId.value = value.selectedScrollSnap();
    setActiveElement();
  });
});
</script>

<template>
  <div class="VSliderAutpoplay v-slider-autoplay">
    <VSlider
      variant="autoplay"
      :autoplay-change-time="autoplayChangeTime"
      :options="{ containScroll: 'trimSnaps' }"
      class="v-slider-autoplay__slider"
      @init-api="setApi"
    >
      <VCarouselItem
        v-for="(_, index) in data"
        :key="index"
        class="v-slider-autoplay__item"
      >
        <slot v-bind="active" />
      </VCarouselItem>
    </VSlider>
    <div
      v-if="showPagination"
      class="v-slider-autoplay__pagination"
    >
      <button
        v-for="(_, indexp) in data"
        :key="indexp"
        :aria-label="'Go to slide ' + (indexp + 1)"
        class="v-slider-autoplay__pagination-item-wrap"
        @click="changeSlide(indexp)"
      >
        <span
          class="v-slider-autoplay__pagination-item"
          :class="{ 'is--active': indexp === activeElementId }"
        />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-slider-autoplay {
  width: 100%;

  &__slider {
    margin: 0;
  }

  &__item {
    flex: 0 0 100%;
  }

  &__pagination {
    display: flex;
    flex-direction: row;
    gap: 4px;
    justify-content: center;
    margin-top: 25px;
  }

  &__pagination-item {
    width: 31px;
    height: 2px;
    background-color: colors.$gray-30;
    display: block;

    &.is--active {
      background-color: v-bind(activecolor);
    }
  }

  &__pagination-item-wrap {
    padding: 9px 0;
    cursor: pointer;
  }
}
</style>
