<script setup lang="ts">
import { IVCardFeatures } from 'UiKit/components/VCard/VCardFeatures.vue';
import { computed, PropType } from 'vue';
import VSection from 'UiKit/components/VSection/VSection.vue';
import VCardFeatures from 'UiKit/components/VCard/VCardFeatures.vue';

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
    class="VSectionCardFeaturesGrid v-section-card-features-grid"
  >
    <template #infoShort>
      <slot name="infoShort" />
    </template>
    <div
      class="is--three-col-grid"
      itemscope
      itemtype="https://schema.org/ItemList"
    >
      <VCardFeatures
        v-for="(item, i) in items"
        :key="i"
        :href="encodeURI(item.url)"
        button-text="Read More"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <h3>
          {{ item.title }}
        </h3>
      </VCardFeatures>
    </div>
  </VSection>
</template>

<style lang="scss">
.v-section-card-features-grid {
  width: 100%;
}
</style>
