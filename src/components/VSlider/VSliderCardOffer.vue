<script setup lang="ts">
import VSlider from './VSlider.vue';
import VCardOffer from 'UiKit/components/VCard/VCardOffer.vue';
import { PropType } from 'vue';
import VCarouselItem from 'UiKit/components/Base/VCarousel/VCarouselItem.vue';
import { IOffer } from 'InvestCommon/types/api/offers';

defineProps({
  items: Array as PropType<IOffer[]>,
});
</script>

<template>
  <VSlider
    class="VSliderCardOffer v-slider-offer"
  >
    <VCarouselItem
      v-for="(offer, index) in items"
      :key="index"
      class="v-slider-offer__item"
    >
      <VCardOffer
        :offer="offer"
        funded
        :image-loading="(index < 7) ? 'eager' : 'lazy'"
      />
    </VCarouselItem>
  </VSlider>
</template>

<style lang="scss">
@use 'UiKit/styles/_variables.scss' as *;
.v-slider-offer {
  margin: 0 -15px;
  width: calc(100% + 30px);

    &__item {
      padding: 15px;
      flex: 0 0 33.33%;

      @media screen and (max-width: $desktop-lg){
        flex: 0 0 36%;
      }

      @media screen and (max-width: $desktop-md){
        flex: 0 0 46%;
      }

      @media screen and (max-width: $tablet){
        flex: 0 0 76%;
      }
    }
}
</style>
