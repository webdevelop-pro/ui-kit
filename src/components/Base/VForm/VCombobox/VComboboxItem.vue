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

  color: colors.$black;
    cursor: pointer;
      padding: 12px;
      transition: all 0.3s ease;
    * {
      color: colors.$black;
      font-size: 20px;
      font-weight: 400;
      line-height: 28px;
      text-decoration: none;
    }
    &:hover{
    background-color: $light-gray;
  }
}
.v-combobox-item[data-disabled] {
  pointer-events: none;
  opacity: 0.3;
}
.v-combobox-item[data-highlighted] {
  outline: none;
    // color: $light-blue;
    // font-weight: 700;
}
</style>
