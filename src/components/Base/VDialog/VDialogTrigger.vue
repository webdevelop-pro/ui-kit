<script setup lang="ts">
import { DialogTrigger, type DialogTriggerProps } from 'radix-vue';

const props = defineProps<DialogTriggerProps>();
</script>

<template>
  <DialogTrigger
    v-bind="props"
    class="VDialogTrigger v-dialog-trigger"
  >
    <slot />
  </DialogTrigger>
</template>
