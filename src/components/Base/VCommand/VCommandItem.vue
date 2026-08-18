<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui';
import { ComboboxItem, useForwardPropsEmits } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<{ class?: HTMLAttributes['class'] } & /* @vue-ignore */ ComboboxItemProps>();
const emits = defineEmits</* @vue-ignore */ ComboboxItemEmits>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

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
@use 'UiKit/styles/_variables.scss' as variables;

.v-command-item {
  font-family: variables.$familyValue;
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
