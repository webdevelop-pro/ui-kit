<script lang="ts" setup>
import {
  VTooltipTrigger, VTooltip, VTooltipContent, VTooltipProvider,
} from './Base/VTooltip';

defineProps({
  asChild: Boolean,
});

</script>

<template>
  <VTooltipProvider
    :delay-duration="100"
  >
    <VTooltip>
      <VTooltipTrigger
        :as-child="asChild"
      >
        <slot />
      </VTooltipTrigger>
      <VTooltipContent>
        <slot name="content" />
      </VTooltipContent>
    </VTooltip>
  </VTooltipProvider>
</template>
