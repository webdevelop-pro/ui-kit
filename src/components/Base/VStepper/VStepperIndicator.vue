<script lang="ts" setup>
import type { StepperIndicatorProps } from 'radix-vue';
import { StepperIndicator, useForwardProps } from 'radix-vue';
import checkIcon from 'UiKit/assets/images/check.svg?component';

import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<StepperIndicatorProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <StepperIndicator
    v-bind="forwarded"
    :class="props.class"
    class="VStepperIndicator v-stepper-indicator"
  >
    <slot>
      <div class="v-stepper-indicator__circle">
        <checkIcon
          class="v-stepper-indicator__check-icon"
        />
      </div>
    </slot>
  </StepperIndicator>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-stepper-indicator {
  position: relative;
  z-index: 1;

  &__circle {
    display: flex;
    width: 24px;
    height: 24px;
    align-items: flex-start;
    gap: 10px;
    border-radius: 100%;
    border: 5px solid colors.$gray-30;
  }

  &__check-icon {
    display: none;
    width: 16px;
    height: 16px;
  }
}

.v-stepper-item[data-state="active"] .v-stepper-indicator {
  &__circle {
    border-color: colors.$primary;
  }
}

.v-stepper-item[data-state="completed"] .v-stepper-indicator {
  &__circle {
    border-color: colors.$primary;
    background: colors.$primary;
    color: colors.$white;
  }

  &__check-icon {
    display: block;
  }
}
</style>
