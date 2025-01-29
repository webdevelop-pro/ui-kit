<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from 'radix-vue';
import { ComboboxItem, useForwardPropsEmits } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<ComboboxItemEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ComboboxItem
    v-bind="forwarded"
    :class="props.class"
    class="VCommandItem v-command-item"
  >
    <slot />
  </ComboboxItem>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-command-item {

  font-family: 'Avenir';
    color: colors.$black;
    padding: 12px;
    cursor: pointer;
    font-size: 16px;
    line-height: 26px;
}
.v-command-item[data-disabled] {
  pointer-events: none;
  opacity: 0.3;
}
.v-command-item[data-highlighted] {
  outline: none;
  background-color: colors.$gray-20;
}
</style>
