<script lang="ts" setup>
import type { StepperSeparatorProps } from 'radix-vue';
import { StepperSeparator, useForwardProps } from 'radix-vue';

import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<StepperSeparatorProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <StepperSeparator
    v-bind="forwarded"
    :class="props.class"
    class="VStepperSeparator v-stepper-separator"
  />
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-stepper-separator[data-orientation="vertical"] {
  flex-shrink: 0;
  position: absolute;
  bottom: 0;
  height: calc(100% - 24px);
  left: 12px;
  width: 1px;
  background: colors.$gray-30;
}
.v-stepper-separator[data-orientation="horizontal"] {
  flex-shrink: 0;
  position: absolute;
  left: calc(50% + 12px);
  width: calc(100% - 24px);
  top: 12px;
  height: 1px;
  background: colors.$gray-30;
}
</style>
