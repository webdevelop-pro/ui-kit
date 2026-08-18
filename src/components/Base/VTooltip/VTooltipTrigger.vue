<script setup lang="ts">
import { TooltipTrigger, type TooltipTriggerProps } from 'reka-ui';

const props = defineProps</* @vue-ignore */ TooltipTriggerProps>();
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
  vertical-align: middle;
}
</style>
