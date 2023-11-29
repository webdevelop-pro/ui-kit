<script lang="ts" setup>
import { withDefaults } from 'vue';
import { Tab } from './types';

const props = withDefaults(defineProps<{
  tabs: Tab[];
  modelValue?: string | number;
  type?: 'top-line' | 'bottom-line';
  fullWidth?: boolean,
}>(), {
  type: 'top-line',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: Tab['value']): void;
  (e: 'itemClick', value: Tab): void;
}>();

function onItemClick(tab: Tab) {
  emit('update:modelValue', tab.value);
  emit('itemClick', tab);
}
</script>

<template>
  <div
    class="BaseTabs base-tabs"
    :class="`is--${type}`"
  >
    <div
      v-for="tab in props.tabs"
      :key="tab.value"
      class="base-tabs__item"
      :class="[{ 'is--active': modelValue === tab.value, 'is--full-width': fullWidth}, `is--${type}`]"
      :style="{width: fullWidth ? `${100/(props.tabs.length)}%` : 'auto'}"
      @click="onItemClick(tab)"
    >
      <slot
        name="tab"
        :tab="tab"
      >
        <span
          class="base-tabs__item-label"
          :title="tab.label"
        >
          {{ tab.label }}
        </span>
        <span
          v-if="tab.subTitle"
          class="base-tabs__item-sub-title"
        >
          <span>{{ tab.subTitle }}</span>
        </span>
      </slot>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.base-tabs
  --base-tabs--height: 48px
  height: var(--base-tabs--height)
  display: flex
  flex-direction: row
  width: 100%
  &.is--bottom-line
    border-bottom: solid 2px $tabs-bottom-line-color
  &__item
    cursor: pointer
    padding: 14px 16px
    background: $item-top-line-background-color
    position: relative
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    +mt(.2s)
    &:after
      display: none
      content: attr(title)
      +font(400)
      height: 0
      overflow: hidden
      visibility: hidden
    &:before
      content: ''
      position: absolute
      left: 0
      width: 100%
      height: 2px
      background-color: transparent
    &.is--bottom-line
      background-color: transparent
      &:before
        bottom: -2px
    &.is--top-line
      &:before
        top: 0
    &.is--active
      +mt(.2s)
      &.is--top-line
        background-color: $item-top-line-active-background-color
      .base-tabs__item-label
        +font(400)
        color: $item-top-line-active-label-color
      .base-tabs__item-sub-title
        background-color: $item-top-line-active-sub-title-background-color
        color: $item-top-line-active-sub-title-color
      &:before
        background-color: $item-top-line-active-before-background-color
  &__item-label
    +font(350)
    font-size: 14px
    line-height: 19.6px
    color: $item-label-color
    flex-shrink: 0
  &__item-sub-title
    background-color: $item-sub-title-background-color
    color: $item-sub-title-color
    font-size: 12px
    line-height: 19px
    +font(350)
    margin-left: 8px
    height: 19px
    min-width: 19px
    width: 100%
    padding: 0 5px
    border-radius: 50px
    display: flex
    align-items: center
    justify-content: center
    @media screen and (max-width: 576px)
      display: none
</style>
