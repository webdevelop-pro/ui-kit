<script setup lang="ts">
import { PropType } from 'vue';
import VCardFeatures from 'UiKit/components/VCard/VCardFeatures.vue';

interface IListsLeftBorderTitle {
  text: string;
  title: string;
  icon: string;
}

defineProps({
  items: {
    type: Object as PropType<IListsLeftBorderTitle[]>,
    required: true,
  },
});
</script>

<template>
  <ul class="VListsCardFeaturesStep v-list-card-features-step">
    <li
      v-for="(caption, index) in items"
      :key="index"
    >
      <VCardFeatures class="v-list-card-features-step__card-features">
        <h5 class="is--color-primary">
          STEP {{ index + 1 }}
        </h5>
        <h3 class="v-list-card-features-step__title">
          {{ caption.title }}
        </h3>
        <p
          v-dompurify-html="caption.text"
          class="v-list-card-features-step__text"
        />
      </VCardFeatures>
    </li>
  </ul>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;

.v-list-card-features-step {
  width: 100%;
    padding-left: 0;
    display: flex;
    flex-flow: row wrap;
    gap: 40px;
    list-style: none;
    margin: 0;
    max-width: none;

  @media screen and (width < $tablet) {
    gap: 20px;
  }

  

  li {
    flex: 1 1 340px;
    // max-width: 260px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    margin: 0 !important;
    // border-left: 2px solid $primary;
  }

  span {
    margin: 0 !important;
  }

  &__title {
    color: $black;
    margin-top: 16px;
  }

  &__text {
    color: $gray-80;
    opacity: 0.9;
    margin-top: 12px;
  }

  &__card-features {
    width: 100%;
    height: 100%;
  }
}
</style>
