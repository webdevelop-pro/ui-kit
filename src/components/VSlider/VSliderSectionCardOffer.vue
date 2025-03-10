<script setup lang="ts">
import VSliderCardoffer from './VSliderCardOffer.vue';
import { PropType } from 'vue';
import { IOffer } from 'InvestCommon/types/api/offers';
import VSection from 'UiKit/components/VSection/VSection.vue';

interface ITitleSlider {
  title?: string;
  subtitle?: string;
  href?: string;
  linkText?: string;
  topic?: string;
}

defineProps({
  items: Array as PropType<IOffer[]>,
  dataTitle: {
    type: Object as PropType<ITitleSlider>,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <VSection
    :title="dataTitle.title"
    :sub-title="dataTitle?.subtitle"
    :link-href="encodeURI(`${dataTitle?.href}?topic=${topic}`)"
    :link-text="dataTitle?.linkText"
    class="VSliderSectionCardOffer v-slider-section-card-offer"
  >
    <VSliderCardoffer
      :items="items"
    />
  </VSection>
</template>

<style lang="scss">
.v-slider-section-card-offer {
  overflow: hidden;
}
</style>
