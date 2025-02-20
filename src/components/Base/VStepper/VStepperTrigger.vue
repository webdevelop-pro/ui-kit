<script lang="ts" setup>
import type { StepperTriggerProps } from 'radix-vue';
import { StepperTrigger, useForwardProps } from 'radix-vue';

import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<StepperTriggerProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <StepperTrigger
    v-bind="forwarded"
    :class="props.class"
    class="VStepperTrigger v-stepper-trigger"
  >
    <slot />
  </StepperTrigger>
</template>

<style lang="scss">
.v-stepper-trigger {
  &:hover {
    cursor: pointer;
  }
}
.v-stepper-item[data-disabled] .v-stepper-trigger {
  &:hover {
    pointer-events: none;
  }
}

.v-stepper-trigger[data-orientation="horizontal"] {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
