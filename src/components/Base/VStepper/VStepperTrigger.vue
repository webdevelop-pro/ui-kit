<script lang="ts" setup>
import type { StepperTriggerProps } from 'reka-ui';
import { StepperTrigger, useForwardProps } from 'reka-ui';

import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<{ class?: HTMLAttributes['class'] } & /* @vue-ignore */ StepperTriggerProps>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

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
