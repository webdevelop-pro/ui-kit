<script lang="ts" setup>
import type { StepperRootEmits, StepperRootProps } from 'reka-ui';
import { StepperRoot, useForwardPropsEmits } from 'reka-ui';

import { computed, type HTMLAttributes } from 'vue';

const props = defineProps</* @vue-ignore */ StepperRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits</* @vue-ignore */ StepperRootEmits>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

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
