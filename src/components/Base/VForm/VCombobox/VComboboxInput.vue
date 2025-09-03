<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { ComboboxInput, type ComboboxInputProps } from 'radix-vue';

const props = defineProps<ComboboxInputProps & { class?: HTMLAttributes['class'] }>();
</script>

<template>
  <ComboboxInput
    :class="props.class"
    class="VComboboxInput v-combobox-input"
  />
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-combobox-input {
  padding: 0;
    border: none;
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
    line-height: inherit;
    background-color: transparent;
    width: 100%;
    position: relative;
    z-index: 2;
    height: 100%;

    &:focus {
      outline: none;
    }

    &::placeholder {
      opacity: 1;
      color: colors.$gray-60;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      line-height: inherit;
    }
}
</style>
