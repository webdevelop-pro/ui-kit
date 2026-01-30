<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  items: {
    type: Object as PropType<undefined[]>,
    required: true,
  },
});
</script>

<template>
  <ul class="VListTwoColGrid v-list-two-col-grid">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="v-list-two-col-grid__item"
    >
      <div
        class="v-list-two-col-grid__content is--gap-80"
        :class="item.class"
      >
        <slot :item="item" />
      </div>
    </li>
  </ul>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;

.v-list-two-col-grid {
  width: 100%;
  padding-left: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 130px;

  @media screen and (width < $tablet) {
    gap: 60px;
  }

  &__item {
    margin: 0;
    padding: 0;
  }

  &__content {
    display: flex;
    flex-direction: row;

    &.is--reverse {
      @media screen and (width > $tablet) {
        flex-direction: row-reverse;
      }
    }

    @media screen and (width < $tablet) {
      flex-direction: column;
      gap: 20px !important;
    }
  }

  .v-image-with-button {
    &__image {
      @media screen and (width < $tablet) {
        max-height: 288px;
      }
    }
  }
}
</style>


