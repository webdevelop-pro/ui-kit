<script setup lang="ts">
import { VCard } from 'UiKit/components/Base/VCard';

defineProps({
  index: [String, Number],
  text: String,
});
</script>

<template>
  <VCard class="VCardWithNumber v-card-with-number">
    <div
      class="v-card-with-number__index is--h2__title"
      itemprop="headline"
    >
      {{ index }}
    </div>
    <p itemprop="description">
      {{ text }}
    </p>
  </VCard>
</template>

<style lang="scss">
.v-card-with-number {
  display: flex;
  padding: 20px;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  border-radius: 2px;
  background: $gray-10;

  &__index {
    color: $primary;
  }

  p {
    margin-top: 0 !important;
  }
}
</style>
