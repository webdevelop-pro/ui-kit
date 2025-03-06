<script lang="ts" setup>
import type { StepperItemProps } from 'radix-vue';
import { StepperItem, useForwardProps } from 'radix-vue';

import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<StepperItemProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <StepperItem
    v-slot="slotProps"
    v-bind="forwarded"
    :class="props.class"
    class="VStepperItem v-stepper-item"
  >
    <slot v-bind="slotProps" />
  </StepperItem>
</template>

<style lang="scss">
.v-stepper-item {
  position: relative;
  min-height: 0;
}
.v-stepper-item[data-disabled] {
  pointer-events: none;
}

.v-stepper-item[data-orientation="vertical"] {
  min-height: 90px;
}
.v-stepper-item[data-orientation="horizontal"] {
  min-width: 90px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5px;
}
</style>
