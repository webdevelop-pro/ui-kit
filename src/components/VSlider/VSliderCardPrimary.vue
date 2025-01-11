<script setup lang="ts">
import VSlider from './VSlider.vue';
import VCardPrimary, { ICardPrimary } from 'UiKit/components/VCard/VCardPrimary.vue';
import { PropType } from 'vue';
import VCarouselItem from 'UiKit/components/Base/VCarousel/VCarouselItem.vue';

defineProps({
  data: Array as PropType<ICardPrimary[]>,
});
</script>

<template>
  <VSlider
    class="VSliderCardPrimary v-slider-primary"
  >
    <VCarouselItem
      v-for="(slide, index) in data"
      :key="index"
      class="v-slider-primary__item"
    >
      <VCardPrimary
        :data="slide"
      />
    </VCarouselItem>
  </VSlider>
</template>

<style lang="scss">
.v-slider-primary {
  margin: 0 -15px;
  width: calc(100% + 30px);

    &__item {
      padding: 15px;
      flex: 0 0 44%;

      @media screen and (max-width: 767px){
        flex: 0 0 76%;
      }
    }
}
</style>
