<script setup lang="ts">
import { PropType } from 'vue';
import {
  VStepper, VStepperDescription, VStepperIndicator, VStepperItem, VStepperSeparator,
  VStepperTitle, VStepperTrigger,
} from 'UiKit/components/Base/VStepper';
import { storeToRefs } from 'pinia';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';

const { isTablet } = storeToRefs(useBreakpoints());

interface IStepper {
    step: number;
    title: string;
    description: string;
}

const props = defineProps({
  steps: Array as PropType<IStepper[]>,
  defaultValue: {
    type: Number,
    default: 1,
  },
  maxAvailableStep: {
    type: Number,
    default: undefined,
  },
});

const stepIndex = defineModel<number>();

const generateStepState = (step: number) => {
  if (props.maxAvailableStep && (step < props.maxAvailableStep) && (step !== stepIndex.value)) return true;
  return false;
};
</script>

<template>
  <VStepper
    v-model="stepIndex"
    :default-value="defaultValue"
    :orientation="isTablet ? 'horizontal' : 'vertical'"
    :linear="false"
    class="VStepper v-stepper"
  >
    <VStepperItem
      v-for="step in steps"
      :key="step.step"
      :step="step.step"
      :disabled="step.step > (maxAvailableStep ?? stepIndex)"
      :completed="generateStepState(step.step)"
      class="v-stepper__item"
    >
      <VStepperSeparator
        v-if="step.step !== steps[steps.length - 1].step"
      />

      <VStepperTrigger
        class="v-stepper__trigger"
      >
        <VStepperIndicator />

        <div class="v-stepper__text-wrap">
          <VStepperTitle>
            {{ step.title || `Step ${step.step}` }}
          </VStepperTitle>
          <VStepperDescription>
            {{ step.description }}
          </VStepperDescription>
        </div>
      </VStepperTrigger>
    </VStepperItem>
  </VStepper>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as *;

.v-stepper {
    &__text-wrap {
        text-align: start;

        @media screen and (max-width: $tablet){
          text-align: center;
        }
    }

    &__trigger {
        display: flex;
        gap: 8px;
    }
}
</style>
