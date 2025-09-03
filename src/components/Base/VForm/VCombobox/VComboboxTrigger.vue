<script setup lang="ts">
import ChevronDown from 'UiKit/assets/images/chevron-down.svg?component';
import {
  ComboboxTrigger, type ComboboxTriggerProps, useForwardProps,
} from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = withDefaults(defineProps<ComboboxTriggerProps & {
  class?: HTMLAttributes['class'],
  size?: 'large' | 'medium';
}>(), {
  size: 'large',
});

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <ComboboxTrigger
    v-bind="forwardedProps"
    :class="[props.class, `is--size-${size}`]"
    class="VComboboxTrigger v-combobox-trigger"
  >
    <slot />
    <ChevronDown class="v-combobox-trigger__icon" />
  </ComboboxTrigger>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-combobox-trigger {
  display: flex;
  align-items: center;
  width: 100%;

  &__icon {
    width: 14px;
    color: colors.$gray-70;
    transition: all 0.3s;
    transform-origin: center;
    transform: rotate(0);
    margin-left: 9px;
    margin-top: 0 !important;
  }
}

.v-combobox-trigger[data-state="open"] {
  .v-combobox-trigger__icon {
    transform: rotate(180deg);
    transition: all 0.3s;
  }
}
</style>
