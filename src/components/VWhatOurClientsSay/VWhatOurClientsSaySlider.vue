<script setup lang="ts">
import { PropType } from 'vue';
import VSliderAutoplay from 'UiKit/components/VSlider/VSliderAutoplay.vue';

export interface IWhatOurClientsSaySlider {
  id: number;
  testimonials: {
    text: string;
    author: string;
  }[];
}

defineProps({
  slider: Array as PropType<IWhatOurClientsSaySlider[]>,
});

</script>

<template>
  <VSliderAutoplay
    v-slot="active"
    :data="slider"
    autoplay
    class="VWhatOurClientsSaySlider what-our-clients-say-slider"
  >
    <div class="what-our-clients-say-slider__item is--card">
      <div
        v-for="(item, itemIndex) in active.testimonials"
        :key="itemIndex"
        class="what-our-clients-say-slider__item-card"
      >
        <div
          :key="active.id"
        >
          <p
            :key="active.id"
            class="what-our-clients-say-slider__text"
          >
            {{ item.text }}
          </p>
          <div
            :key="active.id"
            class="what-our-clients-say-slider__author is--h5__title"
          >
            {{ item.author }}
          </div>
        </div>
      </div>
    </div>
  </VSliderAutoplay>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.what-our-clients-say-slider{

  &__item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    top: 0;
    left: 0;
    width: 100%;

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

  &__item-card{
    display: flex;
    padding: 20px;
    align-self: stretch;
    flex-direction: column;
    border-radius: 2px;
    background: colors.$yellow-light;
    @media screen and (min-width: 260px){
      height: 500px;
    }
    @media screen and (min-width: 272px){
      height: 450px;
    }
    @media screen and (min-width: 296px){
      height: 400px;
    }
    @media screen and (min-width: 327px){
      height: 350px;
    }
    @media screen and (min-width: 375px){
      height: 300px;
    }
    @media screen and (min-width: 458px){
      height: 250px;
    }
    @media screen and (min-width: 525px){
      height: 200px;
    }
    @media screen and (min-width: 650px){
      height: 170px;
    }
    @media screen and (min-width: 767px){
      height: 300px;
    }
    @media screen and (min-width: 850px){
      height: 260px;
    }
    @media screen and (min-width: 1040px){
      height: 196px;
    }
  }
}
</style>
