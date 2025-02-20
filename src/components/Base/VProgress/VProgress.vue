<script setup lang="ts">
import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = withDefaults(
  defineProps<ProgressRootProps & {
    class?: HTMLAttributes['class'];
    style?: HTMLAttributes['style'];
    withText?: boolean;
  }>(),
  {
    modelValue: 0,
  },
);

const delegatedProps = computed(() => {
  const { class: _, withText, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <div
    class="VProgressBar v-progressbar"
    :class="props.class"
  >
    <div
      v-if="withText"
      class="v-progressbar__top is--h5__title"
    >
      {{ modelValue }}% Funded
    </div>
    <ProgressRoot
      v-bind="delegatedProps"
      class="v-progressbar__progress"
    >
      <ProgressIndicator
        class="v-progressbar__progress-bar"
        :style="[`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`, props.style]"
      />
    </ProgressRoot>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-progressbar {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;

  &__top {
    color: colors.$secondary-dark
  }

  &__progress {
    width: 100%;
    display: flex;
    align-items: flex-end;
    align-self: stretch;
    height: 3px;
    border-radius: 2px;
    background: colors.$gray-30;
    position: relative;
    overflow: hidden;
  }

  &__progress-bar{
    width: 100%;
    height: 100%;
    transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);
    background: colors.$secondary;
  }
}
</style>
