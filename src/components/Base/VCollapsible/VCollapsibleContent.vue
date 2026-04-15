<script setup lang="ts">
import {
  CollapsibleContent,
  type CollapsibleContentProps,
  useForwardProps,
} from 'reka-ui';

const props = defineProps</* @vue-ignore */ CollapsibleContentProps>();

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
