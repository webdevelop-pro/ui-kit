<script setup lang="ts">
import { IVCardFeatures } from 'UiKit/components/Cards/VCardFeatures.vue';
import {
  computed, defineAsyncComponent, hydrateOnVisible, PropType,
} from 'vue';


// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VSection = defineAsyncComponent({
  loader: () => import('UiKit/components/VSection/VSection.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VCardFeatures = defineAsyncComponent({
  loader: () => import('UiKit/components/Cards/VCardFeatures.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});

const props = defineProps({
  title: String,
  subTitle: String,
  items: Array as PropType<IVCardFeatures[]>,
  buttonHref: String,
  buttonText: String,
});

const noData = computed(() => props.items?.length === 0);
</script>

<template>
  <VSection
    :title="title"
    :sub-title="subTitle"
    :button-href="buttonHref"
    :button-text="buttonText"
    :no-data="noData"
    class="VCardFeaturesGrid v-card-features-grid"
  >
    <div class="is--three-col-grid">
      <VCardFeatures
        v-for="(slide, i) in items"
        :key="i"
        :href="slide.url"
        button-text="Read More"
      >
        <h3>
          {{ slide.title }}
        </h3>
      </VCardFeatures>
    </div>
  </VSection>
</template>

<style lang="scss">
.v-card-features-grid {
  width: 100%;
}
</style>
