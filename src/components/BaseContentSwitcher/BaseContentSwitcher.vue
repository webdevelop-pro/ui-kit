<script lang="ts" setup>
import { withDefaults } from 'vue';
import { Tab } from './types';

const props = withDefaults(defineProps<{
  tabs: Tab[];
  modelValue?: string | number;
  fullWidth?: boolean,
}>(), {
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
    class="BaseContentSwitcher base-content-switcher"
  >
    <div
      v-for="tab in props.tabs"
      :key="tab.value"
      class="base-content-switcher__item"
      :class="[{ 'is--active': modelValue === tab.value, 'is--full-width': fullWidth }]"
      :style="{width: fullWidth ? `${100/(props.tabs.length)}%` : 'auto'}"
      @click="onItemClick(tab)"
    >
      <slot
        name="tab"
        :tab="tab"
      >
        <span
          class="base-content-switcher__item-label is--small-2"
          :title="tab.label"
        >
          {{ tab.label }}
        </span>
      </slot>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.base-content-switcher
  height: 32px
  display: flex
  flex-direction: row
  align-items: center
  gap: 4px
  border-radius: 2px
  background: $gray-20
  padding: 4px

  &.is--full-width
    width: 100%

  &__item
    cursor: pointer
    display: flex
    padding: 3px 12px
    align-items: center
    gap: 4px
    align-self: stretch
    border-radius: 2px
    color: $gray-60
    +mt(.2s)
    &.is--active
      +mt(.2s)
      background-color: $white
      color: $black
    &:hover
      color: $black
  &__item-label
    flex-shrink: 0
</style>
