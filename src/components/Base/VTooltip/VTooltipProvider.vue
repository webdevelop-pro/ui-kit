<script setup lang="ts">
import { TooltipProvider, type TooltipProviderProps } from 'reka-ui';

const props = defineProps</* @vue-ignore */ TooltipProviderProps>();
</script>

<template>
  <TooltipProvider
    v-bind="props"
    class="TooltipProvider v-tooltip-provider"
  >
    <slot />
  </TooltipProvider>
</template>
