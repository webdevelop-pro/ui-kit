<script setup lang="ts">
import { PropType } from 'vue';

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
  <article class="VCardPartner v-card-partner is--card">
    <div
      v-for="(item, i) in items"
      :key="i"
      :style="{ 'background-color': item.color }"
      class="v-card-partner__item"
    >
      <div class="v-card-partner__icon-wrap">
        <img
          :src="item.icon"
          alt="service icon"
          class="v-card-partner__icon is--no-margin"
        >
      </div>
      <div class="v-card-partner__text">
        {{ item.text }}
      </div>
    </div>
  </article>
</template>

<style lang="scss">
.v-card-partner {
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  &__item {
    display: flex;
    min-height: 66px;
    padding: 20px;
    align-items: center;
    gap: 20px;
    align-self: stretch;
    border-radius: 2px;
  }

  &__icon-wrap {
    display: flex;
    width: 100px;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }

  &__text {
    opacity: 0.9;
    color: $gray-80;
  }

  &__icon {
    height: 100%;
    width: auto;
    max-height: 26px;
  }
}
</style>
