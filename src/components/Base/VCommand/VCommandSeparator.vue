<script setup lang="ts">
import type { ComboboxSeparatorProps } from 'radix-vue';
import { ComboboxSeparator } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<ComboboxSeparatorProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ComboboxSeparator
    v-bind="delegatedProps"
    :class="props.class"
    class="VCommandSeparator v-command-separator"
  >
    <slot />
  </ComboboxSeparator>
</template>
