<script setup lang="ts">
import {
  CollapsibleRoot,
  type CollapsibleRootEmits,
  type CollapsibleRootProps,
  useForwardPropsEmits,
} from 'reka-ui';

const props = defineProps</* @vue-ignore */ CollapsibleRootProps>();
const emits = defineEmits</* @vue-ignore */ CollapsibleRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <CollapsibleRoot
    v-bind="forwarded"
    class="VCollapsible"
  >
    <slot />
  </CollapsibleRoot>
</template>
