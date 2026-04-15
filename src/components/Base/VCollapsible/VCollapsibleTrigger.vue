<script setup lang="ts">
import {
  CollapsibleTrigger,
  type CollapsibleTriggerProps,
  useForwardProps,
} from 'reka-ui';

const props = defineProps</* @vue-ignore */ CollapsibleTriggerProps>();

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
