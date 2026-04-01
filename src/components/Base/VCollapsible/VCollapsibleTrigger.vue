<script setup lang="ts">
import {
  CollapsibleTrigger,
  type CollapsibleTriggerProps,
  useForwardProps,
} from 'radix-vue';

const props = defineProps<CollapsibleTriggerProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <CollapsibleTrigger
    v-bind="forwarded"
    class="VCollapsibleTrigger"
  >
    <slot />
  </CollapsibleTrigger>
</template>
