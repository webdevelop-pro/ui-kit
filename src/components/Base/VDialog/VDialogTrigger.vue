<script setup lang="ts">
import { DialogTrigger, type DialogTriggerProps } from 'reka-ui';

const props = defineProps</* @vue-ignore */ DialogTriggerProps>();
</script>

<template>
  <DialogTrigger
    v-bind="props"
    class="VDialogTriggel v-dialog-trigger"
  >
    <slot />
  </DialogTrigger>
</template>
