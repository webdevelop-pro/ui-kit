<script setup lang="ts">
import { DialogTitle, type DialogTitleProps } from 'reka-ui';

const props = defineProps</* @vue-ignore */ DialogTitleProps>();
</script>

<template>
  <DialogTitle
    class="VSheetTitle v-sheet-title is--h4__title"
    v-bind="props"
  >
    <slot />
  </DialogTitle>
</template>
