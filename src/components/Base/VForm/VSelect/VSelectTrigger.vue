<script setup lang="ts">
import ChevronDown from 'UiKit/assets/images/chevron-down.svg?component';
import {
  SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps,
} from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = withDefaults(defineProps<SelectTriggerProps & {
  class?: HTMLAttributes['class'],
  size?: 'large' | 'medium';
}>(), {
  size: 'large',
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="[props.class, `is--size-${size}`]"
    class="VSelectTrigger v-select-trigger"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="v-select-trigger__icon" />
    </SelectIcon>
  </SelectTrigger>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-select-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  position: relative;
  color: colors.$black;
  caret-color: colors.$black;
  background-color: colors.$grayscale-white;
  position: relative;
  border: solid 1px colors.$gray;
  border-radius: 4px;
  height: 40px;
  min-height: 32px;
  padding: 12.5px 20px;
  transition: all 0.3s ease;

  &.is--size-large {
    height: 48px;
    font-size: 16px;
    line-height: 26px;
  }

  &.is--size-small {
    height: 32px;
    font-size: 16px;
    line-height: 26px;
  }

  &.is--focused {
    border-color: colors.$light-blue;
    border-width: 2px;
  }

  &.is--error {
    border-color: colors.$primary-red;
  }

  &.is--readonly {
    border-radius: 0;
    border: none;
    pointer-events: none;
    background-color: colors.$light-gray;
  }

  &.is--disabled {
    opacity: 0.3;
    pointer-events: none;
  }

  &__icon {
    width: 20px;
    color: colors.$dark-gray;
    transition: all 0.3s;
    transform-origin: center;
    transform: rotate(0);
    margin-left: 9px;
    margin-top: 0 !important;
  }
}
.v-select-trigger[data-state="open"]{
  border-color: colors.$light-blue;
    border-width: 2px;
  outline: none;
  .v-select-trigger__icon {
    transform: rotate(180deg);
    transition: all 0.3s;
  }
}
.v-select-trigger[data-placeholder] {
  opacity: 1;
      color: colors.$gray-60;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      line-height: inherit;
}
</style>
