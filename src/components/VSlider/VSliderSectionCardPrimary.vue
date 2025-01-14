<script setup lang="ts">
import VSliderCardPrimary from './VSliderCardPrimary.vue';
import { ICardPrimary } from 'UiKit/components/VCard/VCardPrimary.vue';
import { PropType } from 'vue';
import VSectionShort from 'UiKit/components/VInfo/VInfoShort.vue';

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
    required: true,
  },
});
</script>

<template>
  <section class="VSliderSectionCardPrimary v-slider-section-card-primary">
    <div class="is--container">
      <VSectionShort>
        <slot>
          <h2 v-if="dataTitle.title">
            {{ dataTitle.title }}
          </h2>
          <p
            v-if="dataTitle?.subtitle"
            class="is--subheading-1"
          >
            {{ dataTitle?.subtitle }}
          </p>
          <a
            v-if="dataTitle?.link"
            class="is--link-1"
            :href="encodeURI(`${dataTitle?.link}?topic=${topic}`)"
          >
            {{ dataTitle?.linkText }}
          </a>
        </slot>
      </VSectionShort>
      <VSliderCardPrimary
        :data="data"
      />
    </div>
  </section>
</template>

<style lang="scss">
.v-slider-section-card-primary {
  overflow: hidden;
}
</style>
