<script setup lang="ts">
import { PopoverTrigger, type PopoverTriggerProps } from 'reka-ui';

const props = defineProps</* @vue-ignore */ PopoverTriggerProps>();
</script>

<template>
  <PopoverTrigger
    v-bind="props"
    class="VPopoverTrigger v-popover-trigger"
  >
    <slot />
  </PopoverTrigger>
</template>
