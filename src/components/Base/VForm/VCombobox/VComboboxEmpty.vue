<script setup lang="ts">
import { ComboboxEmpty, type ComboboxEmptyProps } from 'radix-vue';

const props = defineProps<ComboboxEmptyProps>();
</script>

<template>
  <ComboboxEmpty
    v-bind="props"
    class="VComboboxEmpty v-combobox-empty"
  >
    <slot />
  </ComboboxEmpty>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-combobox-empty {
  font-family: variables.$familyValue;
    color: colors.$black;
    padding: 12px;
    cursor: pointer;
    font-size: 16px;
    line-height: 26px;
}
</style>
