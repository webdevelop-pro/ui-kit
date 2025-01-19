<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { SelectLabel, type SelectLabelProps } from 'radix-vue';

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>();
</script>

<template>
  <SelectLabel
    :class="props.class"
    class="VSelectLabel v-select-llabel"
  >
    <slot />
  </SelectLabel>
</template>
