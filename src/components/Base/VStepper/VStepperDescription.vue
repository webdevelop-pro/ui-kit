<script lang="ts" setup>
import type { StepperDescriptionProps } from 'radix-vue';
import { StepperDescription, useForwardProps } from 'radix-vue';

import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<StepperDescriptionProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <StepperDescription
    v-slot="slotProps"
    v-bind="forwarded"
    :class="props.class"
    class="VStepperDescription v-stepper-description is--h5__title"
  >
    <slot v-bind="slotProps" />
  </StepperDescription>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-stepper-description {
  color: colors.$gray-60;
  .v-stepper-item[data-state="active"] & {
    color: colors.$black;
  }
  .v-stepper-item[data-state="completed"] & {
    color: colors.$gray-80;
  }
}
</style>
