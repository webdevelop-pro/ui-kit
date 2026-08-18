<script setup lang="ts">
import type { ComboboxGroupProps } from 'reka-ui';
import { ComboboxGroup, ComboboxLabel } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps</* @vue-ignore */ ComboboxGroupProps & {
  class?: HTMLAttributes['class'];
  heading?: string;
}>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

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
