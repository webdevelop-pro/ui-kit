<script setup lang="ts">
import { DialogClose, type DialogCloseProps } from 'radix-vue';

const props = defineProps<DialogCloseProps>();
</script>

<template>
  <DialogClose
    v-bind="props"
    class="VDialogClose v-dialog-close"
  >
    <slot />
  </DialogClose>
</template>
