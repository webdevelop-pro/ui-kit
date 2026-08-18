<script setup lang="ts">
import { computed, PropType } from 'vue';
import VSliderAutoplay from 'UiKit/components/VSlider/VSliderAutoplay.vue';

export interface IWhatOurClientsSaySlider {
  text: string;
  author: string;
}

const props = defineProps({
  slider: {
    type: Array as PropType<IWhatOurClientsSaySlider[]>,
    required: true,
  },
});

const sliderFormatted = computed(() => props.slider.map((item, index) => ({
  ...item,
  id: index + 1,
})));

</script>

<template>
  <VSliderAutoplay
    v-if="sliderFormatted"
    v-slot="{ active }"
    :data="sliderFormatted"
    :show-pagination="false"
    :autoplay-change-time="60000"
    autoplay
    class="what-our-clients-say-sidebar"
  >
    <div
      v-if="active"
      class="what-our-clients-say-sidebar__item"
    >
      <p class="what-our-clients-say-sidebar__text">
        {{ (active as IWhatOurClientsSaySlider).text }}
      </p>
      <div class="what-our-clients-say-sidebar__author is--h5__title">
        {{ (active as IWhatOurClientsSaySlider).author }}
      </div>
    </div>
  </VSliderAutoplay>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.what-our-clients-say-sidebar{
  overflow: hidden;

  &__item{
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    padding: 20px;
    align-self: stretch;
    flex-direction: column;
    border-radius: 2px;
    background: colors.$yellow-light;

    &.is--active{
      position: relative;
      transition: opacity 3s ease;
    }
  }

  &__text{
    color: colors.$gray-80;
    font-style: italic;
  }

  &__author{
    margin: 0 !important;
  }
}
</style>
