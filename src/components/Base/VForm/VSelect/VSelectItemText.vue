<script setup lang="ts">
import { SelectItemText, type SelectItemTextProps } from 'radix-vue';

const props = defineProps<SelectItemTextProps>();
</script>

<template>
  <SelectItemText
    v-bind="props"
    class="VSelectItemText v-select-item-text"
  >
    <slot />
  </SelectItemText>
</template>
