<script setup lang="ts">
import { PropType } from 'vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import { VCard, VCardContent } from 'UiKit/components/Base/VCard';

export interface ICardPartner {
    color: string;
    icon: string;
    text: string;
}

defineProps({
  items: Array as PropType<ICardPartner[]>,
});
</script>

<template>
  <VCard class="VCardPartner v-card-partner is--card">
    <VCardContent>
      <div
        v-for="(item, i) in items"
        :key="i"
        :style="{ 'background-color': item.color }"
        class="v-card-partner__item"
      >
        <VImage
          :src="item.icon"
          fit="contain"
          alt="service icon"
          class="v-card-partner__icon "
        />
        <p>
          {{ item.text }}
        </p>
      </div>
    </VCardContent>
  </VCard>
</template>

<style lang="scss">
.v-card-partner {

  &__item {
    display: flex;
    min-height: 66px;
    padding: 20px;
    align-items: center;
    gap: 20px;
    align-self: stretch;
    border-radius: 2px;

    & + & {
      margin-top: 8px;
    }
  }

  &__icon {
    max-height: 26px;
    width: 100px;
    flex-shrink: 0;
    margin-top: 0 !important;
  }
}
</style>
