<script setup lang="ts">
import {
  CollapsibleContent,
  type CollapsibleContentProps,
  useForwardProps,
} from 'radix-vue';

const props = defineProps<CollapsibleContentProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <CollapsibleContent
    v-bind="forwarded"
    class="VCollapsibleContent"
  >
    <slot />
  </CollapsibleContent>
</template>
