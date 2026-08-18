<script setup lang="ts">
import type { ComboboxEmptyProps } from 'reka-ui';
import { ComboboxEmpty } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps</* @vue-ignore */ ComboboxEmptyProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});
</script>

<template>
  <ComboboxEmpty
    v-bind="delegatedProps"
    :class="props.class"
    class="VCommandEmpty v-command-empty"
  >
    <slot />
  </ComboboxEmpty>
</template>
