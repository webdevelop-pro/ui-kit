<script setup lang="ts">
import { PropType } from 'vue';
import infoIcon from 'UiKit/assets/images/circle-info.svg';
import VSvgIcon from 'UiKit/components/Base/VSvgIcon/VSvgIcon.vue';

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
});
</script>

<template>
  <div class="VListsPointers v-list-pointers">
    <ul>
      <li
        v-for="(caption, index) in items"
        :key="index"
      >
        <VTooltip
          :disabled="!caption.tooltip"
        >
          <VSvgIcon
            :icon="infoIcon"
            class="v-list-pointers__icon"
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
          &nbsp;
          <span
            v-if="caption.text"
            v-dompurify-html="caption.text"
          />
        </span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;

.v-list-pointers {
  width: 100%;

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

  ul {
    width: 100%;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    gap: 19px;
    list-style: none;
    margin: 0;
    max-width: auto;
  }

  li {
    width: 100%;
    display: flex;
    gap: 10px;
    margin: 0 !important;
    padding: 12px 0;
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
