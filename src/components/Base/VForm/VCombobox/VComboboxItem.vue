<script setup lang="ts">
import {
  ComboboxItem,
  type ComboboxItemProps,
  useForwardProps,
} from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <ComboboxItem
    v-bind="forwardedProps"
    :class="props.class"
    class="VComboboxItem v-combobox-item"
  >
    <slot />
  </ComboboxItem>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-combobox-item {

  font-family: 'Avenir';
    color: colors.$black;
    padding: 12px;
    cursor: pointer;
    font-size: 16px;
    line-height: 26px;
}
.v-combobox-item[data-disabled] {
  pointer-events: none;
  opacity: 0.3;
}
.v-combobox-item[data-highlighted] {
  outline: none;
  background-color: colors.$gray-20;
}
</style>
