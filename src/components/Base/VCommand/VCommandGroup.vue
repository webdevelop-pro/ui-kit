<script setup lang="ts">
import type { ComboboxGroupProps } from 'radix-vue';
import { ComboboxGroup, ComboboxLabel } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<ComboboxGroupProps & {
  class?: HTMLAttributes['class'];
  heading?: string;
}>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ComboboxGroup
    v-bind="delegatedProps"
    :class="props.class"
    class="VCommandGroup v-command-group"
  >
    <ComboboxLabel
      v-if="heading"
      class="v-command-group__label"
    >
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>

<style lang="scss">
.v-command-group {
  width: 100%;
}
</style>
