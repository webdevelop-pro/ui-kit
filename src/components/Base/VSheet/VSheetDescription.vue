<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps } from 'radix-vue';

const props = defineProps<DialogDescriptionProps>();
</script>

<template>
  <DialogDescription
    class="VSheetDescription v-sheet-description"
    v-bind="props"
  >
    <slot />
  </DialogDescription>
</template>
