<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps } from 'reka-ui';

const props = defineProps</* @vue-ignore */ DialogDescriptionProps>();
</script>

<template>
  <DialogDescription
    class="VSheetDescription v-sheet-description"
    v-bind="props"
  >
    <slot />
  </DialogDescription>
</template>
