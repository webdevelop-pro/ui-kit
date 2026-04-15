<script lang="ts" setup>
import type { StepperTitleProps } from 'reka-ui';
import { StepperTitle, useForwardProps } from 'reka-ui';

import { computed, type HTMLAttributes } from 'vue';

const props = defineProps</* @vue-ignore */ StepperTitleProps & {
  class?: HTMLAttributes['class'];
}>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

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
