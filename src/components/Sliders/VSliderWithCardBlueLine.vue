<script setup lang="ts">
import { defineAsyncComponent, PropType } from 'vue';
import { filterAndSortByOrderElements } from 'UiKit/helpers/allData';
import { data as allPages } from '@/store/all.data';
import { ICardWithBlueTitleLine } from 'UiKit/components/Cards/VCardWithBlueTitleLine.vue';
import { IFrontmatter } from 'UiKit/types/types';

// Async imports for components and utilities
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const SliderSwiper = defineAsyncComponent(() => import('UiKit/components/Sliders/VSliderSwiper.vue'));
const SwiperSlide = defineAsyncComponent(() => import('swiper/vue').then((module) => module.SwiperSlide));
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
const VCardWithBlueTitleLine = defineAsyncComponent(() => import('UiKit/components/Cards/VCardWithBlueTitleLine.vue').then((module) => module.default));

interface ITitleSlider {
  title?: string;
  subtitle?: string;
  link?: string;
  linkText?: string;
  topic?: string;
}

defineProps({
  data: Array as PropType<ICardWithBlueTitleLine[]>,
  dataTitle: {
    type: Object as PropType<ITitleSlider>,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
});


const getStarted = filterAndSortByOrderElements(allPages as IFrontmatter[], 'slug', 'get-started');
</script>

<template>
  <section class="VSliderWithCardBlueLine v-slider-with-card-blue-line">
    <div class="is--container">
      <div class="is--short-block">
        <h2
          v-if="dataTitle?.title"
        >
          {{ dataTitle?.title }}
        </h2>
        <p
          v-if="dataTitle?.subtitle"
          class="is--subheading-1"
        >
          {{ dataTitle?.subtitle }}
        </p>
        <a
          v-if="dataTitle?.link"
          class="is--link-1"
          tag="a"
          :href="`${getStarted[0].url}?topic=${topic}`"
        >
          {{ dataTitle?.linkText }}
        </a>
      </div>
      <SliderSwiper
        :data="data"
      >
        <SwiperSlide
          v-for="(slide, i) in data"
          :key="i"
        >
          <VCardWithBlueTitleLine
            :data="slide"
          />
        </SwiperSlide>
      </SliderSwiper>
    </div>
  </section>
</template>

<style lang="scss">
.v-slider-with-card-blue-line {
  overflow: hidden;
  width: 100%;
}
</style>
