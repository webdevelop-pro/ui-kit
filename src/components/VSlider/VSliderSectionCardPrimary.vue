<script setup lang="ts">
import VSliderCardPrimary from './VSliderCardPrimary.vue';
import { ICardPrimary } from 'UiKit/components/VCard/VCardPrimary.vue';
import { PropType } from 'vue';
import VSection from 'UiKit/components/VSection/VSection.vue';

interface ITitleSlider {
  title?: string;
  subtitle?: string;
  link?: string;
  linkText?: string;
  topic?: string;
}

defineProps({
  data: Array as PropType<ICardPrimary[]>,
  dataTitle: {
    type: Object as PropType<ITitleSlider>,
    required: true,
  },
  topic: {
    type: String,
  },
  showButton: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <VSection
    :title="dataTitle.title"
    :sub-title="dataTitle?.subtitle"
    :link-href="encodeURI(`${dataTitle?.link}?topic=${topic}`)"
    :link-text="dataTitle?.linkText"
    class="VSliderSectionCardPrimary v-slider-section-card-primary"
  >
    <VSliderCardPrimary
      :data="data"
      :show-button="showButton"
    />
  </VSection>
</template>

<style lang="scss">
.v-slider-section-card-primary {
  overflow: hidden;
}
</style>
