<script setup lang="ts">
import {
  SelectItem,
  SelectItemIndicator,
  type SelectItemProps,
  SelectItemText,
  useForwardProps,
} from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

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

    color: colors.$black;
    cursor: pointer;
      padding: 12px;
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
.v-select-item[data-disabled] {
  pointer-events: none;
  opacity: 0.3;
}
.v-select-item[data-highlighted] {
  outline: none;
    color: $light-blue;
    font-weight: 700;
}
</style>
