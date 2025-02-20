<script setup lang="ts">
import { ComboboxAnchor, type ComboboxAnchorProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = withDefaults(defineProps<ComboboxAnchorProps & {
  class?: HTMLAttributes['class'];
  size?: 'large' | 'medium';
  isError?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  focused?: boolean;
}>(), {
  size: 'large',
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ComboboxAnchor
    v-bind="delegatedProps"
    :class="[props.class, `is--size-${size}`, {
      'is--error': isError, 'is--focused': focused, 'is--readonly': readonly, 'is--disabled': disabled,
    }]"
    class="VComboboxAnchor v-combobox-anchor"
  >
    <slot />
  </ComboboxAnchor>
</template>


<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-combobox-anchor {
  position: relative;
  color: colors.$black;
  caret-color: colors.$black;
  background-color: colors.$gray-10;
  font-size: 16px;
  line-height: 26px;
  font-weight: 400;
  font-family: 'Avenir';
  padding: 0 12px;
  margin: 0;
  -webkit-appearance: none;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  border: solid 1px colors.$gray-40;
  border-radius: 2px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;

  &.is--focused {
    border-color: colors.$primary;
  }

  &.is--error {
    border-color: colors.$red;
  }

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

  &.is--readonly {
    border-radius: 0;
    border: none;
    pointer-events: none;
  }

  &.is--disabled {
    opacity: 0.3;
    pointer-events: none;
  }
}
</style>
