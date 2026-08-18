<script setup lang="ts">
import { DialogTrigger, type DialogTriggerProps } from 'reka-ui';

const props = defineProps</* @vue-ignore */ DialogTriggerProps>();
</script>

<template>
  <DialogTrigger
    v-bind="props"
    class="VSheetTrigger v-sheet-trigger"
  >
    <slot />
  </DialogTrigger>
</template>
