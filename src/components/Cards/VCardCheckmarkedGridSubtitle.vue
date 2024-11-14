<script setup lang="ts">
import { PropType } from 'vue';
import VCardCheckmarked from 'UiKit/components/Cards/VCardCheckmarked.vue';

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
});
</script>

<template>
  <section class="VCardCheckmarkedGridSubtitle v-card-checkmarked-grid-subtitle">
    <div class="is--container">
      <h2 v-if="title">
        {{ title }}
      </h2>
      <div class="v-card-checkmarked-grid-subtitle__content">
        <div class="v-card-checkmarked-grid-subtitle__column">
          <h3>For Investors:</h3>
          <div class="v-card-checkmarked-grid-subtitle__items">
            <VCardCheckmarked
              v-for="(item, i) in functionsLeft"
              :key="i"
              :title="item.title"
              :description="item.description"
              card
              class="v-card-checkmarked-grid-subtitle__item"
            />
          </div>
        </div>
        <div class="v-card-checkmarked-grid-subtitle__column">
          <h3>For Administrators:</h3>
          <div class="v-card-checkmarked-grid-subtitle__items">
            <VCardCheckmarked
              v-for="(item, i) in functionsRight"
              :key="i"
              card
              :title="item.title"
              :description="item.description"
              class="v-card-checkmarked-grid-subtitle__item"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style  lang="scss">
.v-card-checkmarked-grid-subtitle {
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

  &__items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    flex: 1 0 0;
  }

  &__title {
    margin-bottom: 40px;
  }
}
</style>
