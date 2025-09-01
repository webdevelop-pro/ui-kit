<script setup lang="ts">
import { SelectSeparator, type SelectSeparatorProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});
</script>

<template>
  <SelectSeparator
    v-bind="delegatedProps"
    :class="props.class"
    class="VSelectSeparator v-select-separator"
  />
</template>
