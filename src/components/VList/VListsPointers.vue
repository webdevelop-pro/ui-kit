<script setup lang="ts">
import { PropType } from 'vue';
import infoIcon from 'UiKit/assets/images/circle-info.svg';
import VSvgIcon from 'UiKit/components/Base/VSvgIcon/VSvgIcon.vue';
import VTooltip from 'UiKit/components/VTooltip.vue';

interface IListsPointers {
  tooltip?: string;
  text: string;
  title: string;
}

defineProps({
  items: {
    type: Object as PropType<IListsPointers[]>,
    required: true,
  },
  layout: {
    type: String as PropType<'one' | 'two'>,
    default: 'one',
  },
});
</script>

<template>
  <ul
    class="VListsPointers v-list-pointers"
    :class="`is--${layout}-col-grid`"
  >
    <li
      v-for="(caption, index) in items"
      :key="index"
    >
      <VTooltip
        v-if="caption.tooltip"
        :disabled="!caption.tooltip"
      >
        <VSvgIcon
          :icon="infoIcon"
          class="v-list-pointers__icon"
          role="img"
          :aria-label="caption.title ? `${caption.title} - additional information` : 'Additional information'"
        />
        <template #content>
          <div v-dompurify-html="caption.tooltip" />
        </template>
      </VTooltip>
      <span class="v-list-pointers__content">
        <span
          v-if="caption.title"
          v-dompurify-html="caption.title"
          class="is--h5__title"
        />
        {{ ' ' }}
        <span
          v-if="caption.text"
          v-dompurify-html="caption.text"
        />
      </span>
    </li>
  </ul>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;

.v-list-pointers {
  width: 100%;
  padding-left: 0;
  list-style: none;
  max-width: none;

  &.is--one-col-grid {
    display: flex;
    flex-direction: column;
    gap: 19px;
  }

  &.is--two-col-grid {
    gap: 20px 80px;

    @media screen and (width < $tablet) {
      gap: 20px;
    }
  }

  &__icon {
    width: 16px;
    height: 16px;
    color: $primary;
    flex-shrink: 0;
    cursor: help;
    position: relative;
    top: 3px;
  }

  &__content {
    // display: flex;
    // align-items: center;
    // gap: 4px;
    margin: 0;
  }

  li {
    width: 100%;
    display: flex;
    gap: 10px;
    margin: 0 !important;
    padding: 12px 0;
    border-bottom: 1px solid;
    border-color: $primary !important;
    align-items: flex-start;

    @media screen and (width < $tablet) {
      align-items: center;
    }
  }

  span {
    margin: 0 !important;
  }
}
</style>
