<script lang="ts" setup>
import { computed, watch } from 'vue';
import { Tab } from './types';

const props = withDefaults(defineProps<{
  tabs: Tab[];
  modelValue?: string | number;
  type?: 'top-line' | 'bottom-line';
  fullWidth?: boolean,
  queryTab?: string,
}>(), {
  type: 'top-line',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: Tab['value']): void;
  (e: 'itemClick', value: Tab): void;
  (e: 'setUrl', value: string | number): void;
}>();

function onItemClick(tab: Tab) {
  emit('update:modelValue', tab.value);
  emit('itemClick', tab);
}

const queryTab = computed(() => props.queryTab);


function setActiveItemToURL() {
  const currentItemByURL = queryTab.value || '';
  let newItem = props.modelValue;
  if (currentItemByURL === newItem) return;
  if (!newItem) {
    if (currentItemByURL === undefined) return;
    newItem = undefined;
  }
  if (newItem) emit('setUrl', newItem);
}


function setActiveItemByURL(currentItemByURL = queryTab.value) {
  const itemFromURL = currentItemByURL?.toString();
  // Check if the item from the URL is present in the list of tab values
  const tabItem = props.tabs.filter(tab => tab.value.toString() === itemFromURL);
  // If the item is invalid, set the active item in the URL to the current model value
  if (!tabItem) {
    setActiveItemToURL();
  } else if (tabItem && tabItem[0]) {
    onItemClick(tabItem[0]);
  }
}


watch(() => props.modelValue, () => {
  if (props.modelValue) setActiveItemToURL();
});

watch(() => queryTab.value, () => {
  if (props.modelValue) {
    setActiveItemByURL(queryTab.value);
  }
},
  { immediate: true }
);
</script>

<template>
  <div class="BaseTabs base-tabs" :class="`is--${type}`">
    <div v-for="tab in props.tabs" :key="tab.value" class="base-tabs__item"
      :class="[{ 'is--active': modelValue === tab.value, 'is--full-width': fullWidth }, `is--${type}`]"
      :style="{ width: fullWidth ? `${100 / (props.tabs.length)}%` : 'auto' }" @click="onItemClick(tab)">
      <slot name="tab" :tab="tab">
        <span class="base-tabs__item-label is--h5__title" :title="tab.label">
          {{ tab.label }}
        </span>
        <span v-if="tab.subTitle" class="base-tabs__item-sub-title">
          <span>{{ tab.subTitle }}</span>
        </span>
      </slot>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@use 'index.sass' as *
@use 'UiKit/styles/_mixins.sass' as *
.base-tabs
  --base-tabs--height: 48px
  height: var(--base-tabs--height)
  display: flex
  flex-direction: row
  width: 100%
  gap: $tabs-gap
  &.is--bottom-line
    border-bottom: solid 2px $tabs-bottom-line-color
  &__item
    cursor: pointer
    padding: $item-top-line-item-padding
    background: $item-top-line-background-color
    position: relative
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    @include mt(.2s)
    &:after
      display: none
      content: attr(title)
      @include font(400)
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
      @include mt(.2s)
      &.is--top-line
        background-color: $item-top-line-active-background-color
      .base-tabs__item-label
        color: $item-top-line-active-label-color
      .base-tabs__item-sub-title
        background-color: $item-top-line-active-sub-title-background-color
        color: $item-top-line-active-sub-title-color
      &:before
        background-color: $item-top-line-active-before-background-color
    &:hover
      .base-tabs__item-label
        color: $item-label-hover-color
  &__item-label
    color: $item-label-color
    flex-shrink: 0
  &__item-sub-title
    background-color: $item-sub-title-background-color
    color: $item-sub-title-color
    font-size: 12px
    line-height: 19px
    @include font(400)
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
