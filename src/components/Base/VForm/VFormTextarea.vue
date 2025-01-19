<script lang="ts" setup>
import { useVModel } from '@vueuse/core';


const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  isError?: boolean;
}>();

const emits = defineEmits<{(e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
  <textarea
    v-model="modelValue"
    v-bind="$attrs"
    class="VFormTextarea v-form-textarea"
    :class="{ 'is--error': isError }"
  />
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-form-textarea{
  color: colors.$black;
  caret-color: colors.$black;
  background-color: colors.$gray-10;
  font-size: 16px;
  line-height: 26px;
  font-weight: 400;
  font-family: 'Avenir';
  -webkit-appearance: none;
  border: solid 1px colors.$gray-40;
  border-radius: 2px;
  padding: 12px;
  width: 100%;
  &:focus {
    border-color: colors.$primary;
    outline: none;
  }
  &.is--error {
    border-color: colors.$red;
  }
  &::placeholder{
    opacity: 1;
    color: colors.$gray-60;
  }
}
</style>
