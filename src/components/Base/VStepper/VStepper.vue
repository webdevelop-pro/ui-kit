<script lang="ts" setup>
import type { StepperRootEmits, StepperRootProps } from 'radix-vue';
import { StepperRoot, useForwardPropsEmits } from 'radix-vue';

import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<StepperRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<StepperRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <StepperRoot
    v-slot="slotProps"
    :class="props.class"
    class="VStepper v-stepper"
    v-bind="forwarded"
  >
    <slot v-bind="slotProps" />
  </StepperRoot>
</template>

<style lang="scss">
@use 'UiKit/styles/_variables.scss' as *;
.v-stepper[data-orientation="horizontal"] {
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media screen and (max-width: $tablet){
    min-width: fit-content;
  }
}
</style>
