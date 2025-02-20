<script setup lang="ts">
import { TooltipTrigger, type TooltipTriggerProps } from 'radix-vue';

const props = defineProps<TooltipTriggerProps>();
</script>

<template>
  <TooltipTrigger
    v-bind="props"
    class="VTooltipTrigger v-tooltip-trigger"
  >
    <slot />
  </TooltipTrigger>
</template>

<style lang="scss">
.v-tooltip-trigger {
  cursor: default;
}
</style>
