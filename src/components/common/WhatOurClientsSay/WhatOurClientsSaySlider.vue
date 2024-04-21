<script setup lang="ts">
import { slider } from './utils';
import SliderWithPaginationAutoPlay from 'UiKit/components/common/SliderWithPaginationAutoPlay.vue';

</script>

<template>
  <SliderWithPaginationAutoPlay
    v-slot="active"
    :slider="slider"
    :autoplay="false"
    active-color="#F1AF32"
  >
    <div
      class="what-our-clients-say-slider__item is--card"
      v-bind="active"
    >
      <div class="what-our-clients-say-slider__item-card">
        <p class="what-our-clients-say-slider__text">
          {{ active?.text1 }}
        </p>
        <div class="what-our-clients-say-slider__author is--h5__title">
          {{ active?.author1 }}
        </div>
      </div>
      <div class="what-our-clients-say-slider__item-card">
        <p class="what-our-clients-say-slider__text">
          {{ active?.text2 }}
        </p>
        <div class="what-our-clients-say-slider__author is--h5__title">
          {{ active?.author2 }}
        </div>
      </div>
    </div>
  </SliderWithPaginationAutoPlay>
</template>

<style lang="scss" scoped>
.what-our-clients-say-slider {

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
  }

  &__text {
    color: $gray-80;
    font-style: italic;
  }

  &__item-card {
    display: flex;
    padding: 20px;
    align-self: stretch;
    flex-direction: column;
    border-radius: 2px;
    background: $yellow-light;
    @include media-gte(tablet) {
      height: 196px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
