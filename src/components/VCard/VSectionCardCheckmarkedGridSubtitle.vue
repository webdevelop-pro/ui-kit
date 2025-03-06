<script setup lang="ts">
import { PropType } from 'vue';
import VCardCheckmarked from 'UiKit/components/VCard/VCardCheckmarked.vue';
import VSection from 'UiKit/components/VSection/VSection.vue';

interface ICardCheckmarked {
  title: string;
  description: string;
}

defineProps({
  functionsLeft: {
    type: Object as PropType<ICardCheckmarked[]>,
    required: true,
  },
  functionsRight: {
    type: Object as PropType<ICardCheckmarked[]>,
    required: true,
  },
  title: String,
  subtitleLeft: String,
  subtitleRight: String,
});
</script>

<template>
  <VSection
    :title="title"
    class="VSectionCardCheckmarkedGridSubtitle v-section-card-checkmarked-grid-subtitle"
  >
    <template #infoShort>
      <slot name="infoShort" />
    </template>
    <div
      class="v-section-card-checkmarked-grid-subtitle__content"
    >
      <div class="v-section-card-checkmarked-grid-subtitle__column">
        <h3>{{ subtitleLeft }}</h3>
        <VCardCheckmarked
          v-for="(item, i) in functionsLeft"
          :key="i"
          :title="item.title"
          :description="item.description"
          card
        />
      </div>
      <div class="v-section-card-checkmarked-grid-subtitle__column">
        <h3>{{ subtitleRight }}</h3>
        <VCardCheckmarked
          v-for="(item, i) in functionsRight"
          :key="i"
          card
          :title="item.title"
          :description="item.description"
        />
      </div>
    </div>
  </VSection>
</template>

<style  lang="scss">
.v-section-card-checkmarked-grid-subtitle {
  width: 100%;

  &__content {
    display: flex;
    align-items: flex-start;
    gap: 30px;
    align-self: stretch;
    @include media-lte(tablet) {
      flex-direction: column;
    }
  }

  &__column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    flex: 1 0 0;
  }
}
</style>
