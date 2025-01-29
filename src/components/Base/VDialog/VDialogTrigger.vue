<script setup lang="ts">
import { DialogTrigger, type DialogTriggerProps } from 'radix-vue';

const props = defineProps<DialogTriggerProps>();
</script>

<template>
  <DialogTrigger
    v-bind="props"
    class="VDialogTriggel v-dialog-trigger"
  >
    <slot />
  </DialogTrigger>
</template>
