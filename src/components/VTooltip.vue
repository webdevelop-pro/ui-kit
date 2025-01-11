<script lang="ts" setup>
import {
  VTooltipTrigger, VTooltip, VTooltipContent, VTooltipProvider,
} from './Base/VTooltip';

</script>

<template>
  <VTooltipProvider
    :delay-duration="100"
  >
    <VTooltip>
      <VTooltipTrigger>
        <slot />
      </VTooltipTrigger>
      <VTooltipContent>
        <slot name="content" />
      </VTooltipContent>
    </VTooltip>
  </VTooltipProvider>
</template>
