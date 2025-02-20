<script lang="ts" setup>
import type { StepperTitleProps } from 'radix-vue';
import { StepperTitle, useForwardProps } from 'radix-vue';

import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<StepperTitleProps & {
  class?: HTMLAttributes['class'];
}>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <StepperTitle
    v-bind="forwarded"
    :class="props.class"
    class="VStepperTitle v-stepper-title is--small"
  >
    <slot />
  </StepperTitle>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-stepper-title {
  color: colors.$gray-60;
  .v-stepper-item[data-state="active"] & {
    color: colors.$primary;
  }
  .v-stepper-item[data-state="completed"] & {
    color: colors.$gray-60;
  }
}

</style>
