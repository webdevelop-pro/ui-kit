<script setup lang="ts">
import {
  SelectItem,
  type SelectItemProps,
  SelectItemText,
  useForwardProps,
} from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectItem
    v-bind="forwardedProps"
    :class="[props.class, { 'is--disabled': disabled }]"
    class="VSelectItem v-select-item"
  >
    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-select-item {
  font-family: Avenir;
    color: colors.$black;
    padding: 12px;
    cursor: pointer;
    font-size: 16px;
    line-height: 26px;
}

.v-select-item[data-disabled] {
  pointer-events: none;
  opacity: 0.3;
}

.v-select-item[data-highlighted] {
  outline: none;
  background-color: colors.$gray-20;
}
</style>
