<script setup lang="ts">
import { Navigation } from 'swiper/modules';
import { Swiper } from 'swiper/vue';

defineProps({
  breakpoints: {
    type: Object,
    default: {
      767: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    }
  }
})

const modules = [Navigation];

</script>

<template>
  <Swiper
    :modules="modules"
    :space-between="20"
    navigation
    :slides-per-view="1"
    :breakpoints="breakpoints"
    class="swiper-container SliderSwiper slider-swiper"
  >
    <slot />
  </Swiper>
</template>

<style lang="sass">
.slider-swiper
  display: flex
  flex-direction: row
  position: relative

  @include media-lte(tablet)
    margin-top: 55px

  .swiper-wrapper
    display: flex

.swiper-button-prev,
.swiper-button-next
  position: absolute
  right: 0
  top: -87px
  width: 48px
  height: 48px
  z-index: 2
  cursor: pointer
  padding: 12px
  transition: all 0.3s ease
  &.swiper-button-disabled
    opacity: 0.3
    pointer-events: none

  &:hover
    background-color: $primary-light
    transition: all 0.3s ease

.swiper-button-prev
  right: 51px
  background-image: url("UiKit/assets/arrow-left-primary.svg")
  background-repeat: no-repeat
  background-size: 20px
  background-position: center

.swiper-button-next
  right: -3px
  background-image: url("UiKit/assets/arrow-right-primary.svg")
  background-repeat: no-repeat
  background-size: 20px
  background-position: center
</style>
