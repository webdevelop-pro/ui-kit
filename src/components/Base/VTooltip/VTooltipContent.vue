<script setup lang="ts">
import {
  TooltipContent, type TooltipContentEmits, type TooltipContentProps, TooltipPortal, useForwardPropsEmits,
  TooltipArrow,
} from 'radix-vue';
import { computed } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TooltipContentProps>(), {
  sideOffset: 4,
});

const emits = defineEmits<TooltipContentEmits>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      v-bind="{ ...forwarded, ...$attrs }"
      class="VTooltipContent v-tooltip-content is--small"
    >
      <slot />
      <TooltipArrow class="v-tooltip-arrow" />
    </TooltipContent>
  </TooltipPortal>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;
@use 'UiKit/styles/_transitions.scss' as *;

.v-tooltip-content {
  padding: 8px;
  box-shadow: variables.$box-shadow-small;
  border-radius: 2px;
  background: colors.$gray-10;
  color: colors.$black;
  animation-duration: 0.2s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  max-width: 270px;
  width: 100%;
}

.v-tooltip-content[data-state='delayed-open'][data-side='top'] {
  animation-name: slideDownAndFade;
}

.v-tooltip-content[data-state='delayed-open'][data-side='right'] {
  animation-name: slideLeftAndFade;
}

.v-tooltip-content[data-state='delayed-open'][data-side='bottom'] {
  animation-name: slideUpAndFade;
}

.v-tooltip-content[data-state='delayed-open'][data-side='left'] {
  animation-name: slideRightAndFade;
}

.v-tooltip-arrow {
  fill: white;
}
</style>
