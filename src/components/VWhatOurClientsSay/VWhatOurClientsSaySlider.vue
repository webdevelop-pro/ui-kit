<script setup lang="ts">
import { PropType } from 'vue';
import VSliderWithPaginationAutoPlay from 'UiKit/components/Sliders/VSliderWithPaginationAutoPlay.vue';

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
  <VSliderWithPaginationAutoPlay
    v-slot="active"
    :slider="slider"
    :autoplay="false"
    active-color="#F1AF32"
  >
    <div class="what-our-clients-say-slider__item is--card">
      <div class="what-our-clients-say-slider__item-card">
        <transition
          name="fade"
          mode="out-in"
        >
          <div
            :key="active.id"
            v-bind="active"
          >
            <p
              :key="active.id"
              class="what-our-clients-say-slider__text"
            >
              {{ active?.testimonials[0].text }}
            </p>
            <div
              :key="active.id"
              class="what-our-clients-say-slider__author is--h5__title"
            >
              {{ active?.testimonials[0].author }}
            </div>
          </div>
        </transition>
      </div>
      <div class="what-our-clients-say-slider__item-card">
        <transition
          name="fade"
          mode="out-in"
        >
          <div
            :key="active.id"
            v-bind="active"
          >
            <p
              :key="active.id"
              class="what-our-clients-say-slider__text"
            >
              {{ active?.testimonials[1].text }}
            </p>
            <div
              :key="active.id"
              class="what-our-clients-say-slider__author is--h5__title"
            >
              {{ active?.testimonials[1].author }}
            </div>
          </div>
        </transition>
      </div>
    </div>
  </VSliderWithPaginationAutoPlay>
</template>

<style lang="sass">
@use 'UiKit/styles/_colors.sass' as colors

.what-our-clients-say-slider

  &__item
    display: flex
    flex-direction: column
    justify-content: center
    align-items: flex-start
    gap: 8px
    align-self: stretch
    top: 0
    left: 0
    width: 100%

    &.is--active
      position: relative
      transition: opacity 3s ease

  &__text
    color: colors.$gray-80
    font-style: italic

  &__author
    margin: 0 !important

  &__item-card
    display: flex
    padding: 20px
    align-self: stretch
    flex-direction: column
    border-radius: 2px
    background: colors.$yellow-light
    @media screen and (min-width: 260px)
      height: 500px
    @media screen and (min-width: 272px)
      height: 450px
    @media screen and (min-width: 296px)
      height: 400px
    @media screen and (min-width: 327px)
      height: 350px
    @media screen and (min-width: 375px)
      height: 300px
    @media screen and (min-width: 458px)
      height: 250px
    @media screen and (min-width: 525px)
      height: 200px
    @media screen and (min-width: 650px)
      height: 170px
    @media screen and (min-width: 767px)
      height: 300px
    @media screen and (min-width: 850px)
      height: 260px
    @media screen and (min-width: 1040px)
      height: 196px

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.5s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0

.transition-translate-right
  &-enter-active,
  &-leave-active
    transition: transform 0.2s ease

  &-enter-from,
  &-leave-to
    transform: translateX(100%)
</style>
