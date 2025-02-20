<script setup lang="ts">
import { ComboboxGroup, type ComboboxGroupProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<ComboboxGroupProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ComboboxGroup
    :class="props.class"
    v-bind="delegatedProps"
    class="VComboboxGroup v-combobox-group"
  >
    <slot />
  </ComboboxGroup>
</template>

<style lang="scss">
.v-combobox-group {
  width: 100%;
}
</style>
