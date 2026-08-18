<script setup lang="ts">
import {
  TooltipRoot, type TooltipRootEmits, type TooltipRootProps, useForwardPropsEmits,
} from 'reka-ui';

const props = defineProps</* @vue-ignore */ TooltipRootProps>();
const emits = defineEmits</* @vue-ignore */ TooltipRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TooltipRoot
    v-bind="forwarded"
    class="VTooltip v-tooltip"
  >
    <slot />
  </TooltipRoot>
</template>
