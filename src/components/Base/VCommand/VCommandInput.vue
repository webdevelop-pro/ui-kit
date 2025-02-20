<script setup lang="ts">
import { ComboboxInput, type ComboboxInputProps, useForwardProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<ComboboxInputProps & {
  class?: HTMLAttributes['class'];
  size?: 'large' | 'medium' | 'small';
}>(), {
  size: 'medium',
});

const delegatedProps = computed(() => {
  const { class: _, size, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <div
    class="VCommandInput v-command-input"
  >
    <ComboboxInput
      v-bind="{ ...forwardedProps, ...$attrs }"
      auto-focus
      :class="[props.class, `is--size-${size}`]"
      class="v-command-input__input"
    />
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-command-input {
  &__search-icon {
    width: 20px;
    color: colors.$gray-70;
  }

  &__input {
    color: colors.$black;
    caret-color: colors.$black;
    background-color: colors.$gray-10;
    font-size: 16px;
    line-height: 26px;
    font-weight: 400;
    font-family: 'Avenir';
    padding: 0 12px;
    -webkit-appearance: none;
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    border: solid 1px colors.$gray-40;
    border-radius: 2px;
    height: 40px;
    text-align: start;

    &.is--size-large {
      height: 48px;
      font-size: 16px;
      line-height: 26px;
    }

    &.is--size-small {
      height: 32px;
      font-size: 16px;
      line-height: 26px;
    }

    &:focus {
      outline: none;
      border-color: colors.$primary;
    }

    &::placeholder {
      opacity: 1;
      color: colors.$gray-60;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      line-height: inherit;
    }
  }
}
</style>
