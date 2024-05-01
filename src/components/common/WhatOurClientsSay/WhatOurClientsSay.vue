<script setup lang="ts">
import WhatOurClientsSaySlider, { IWhatOurClientsSaySlider } from './WhatOurClientsSaySlider.vue';
import { PropType } from 'vue';

defineProps({
  title: String,
  text: String,
  slider: Array as PropType<IWhatOurClientsSaySlider[]>,
});
</script>

<template>
  <div class="WhatOurClientsSay what-our-clients-say">
    <div class="wd-container what-our-clients-say__container">
      <div class="what-our-clients-say__left">
        <WhatOurClientsSaySlider
          :slider="slider"
        />
      </div>
      <div class="what-our-clients-say__right">
        <div class="what-our-clients-say__content">
          <h2 class="what-our-clients-say__title">
            {{ title }}
          </h2>
          <p class="what-our-clients-say__text is--subheading-2">
            {{ text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.what-our-clients-say

  &__container
    display: flex
    align-items: center
    gap: 80px
    align-self: stretch
    @include media-lte(tablet)
      flex-direction: column-reverse
      justify-content: center
      align-items: flex-start
      gap: 60px

  &__left
    display: flex
    flex-direction: column
    align-items: center
    gap: 8px
    width: 49%
    @include media-lte(tablet)
      width: 100%

  &__right
    width: 44%
    display: flex
    flex-direction: column
    align-items: flex-start
    flex: 1 0 0
    @include media-lte(tablet)
      width: 100%

  &__title
    margin-bottom: 10px
</style>
