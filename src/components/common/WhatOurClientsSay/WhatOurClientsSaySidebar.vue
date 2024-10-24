<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
import SliderWithPaginationAutoPlay from 'UiKit/components/common/SliderWithPaginationAutoPlay/SliderWithPaginationAutoPlay.vue';

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

const sliderFormatted = computed(() => {
  return props.slider.map((item, index) => ({
    ...item,
    id: index + 1, // Add id as index + 1 to each item
  }));
});

</script>

<template>
  <SliderWithPaginationAutoPlay
    v-if="sliderFormatted"
    v-slot="active"
    :slider="sliderFormatted"
    :show-pagination="false"
    :autoplay-change-time="60000"
  >
    <transition
      name="fade"
      mode="out-in"
    >
      <div :key="active.id" v-bind="active" class="what-our-clients-say-sidebar__item">
        <p :key="active.id" class="what-our-clients-say-sidebar__text">
          {{ active?.text }}
        </p>
        <div :key="active.id" class="what-our-clients-say-sidebar__author is--h5__title">
          {{ active?.author }}
        </div>
      </div>
    </transition>
  </SliderWithPaginationAutoPlay>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.what-our-clients-say-sidebar

  &__item
    top: 0
    left: 0
    width: 100%
    display: flex
    padding: 20px
    align-self: stretch
    flex-direction: column
    border-radius: 2px
    background: $yellow-light

    &.is--active
      position: relative
      transition: opacity 3s ease

  &__text
    color: $gray-80
    font-style: italic

  &__author
    margin: 0 !important


.fade-enter-active,
.fade-leave-active
  transition: opacity 0.5s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
