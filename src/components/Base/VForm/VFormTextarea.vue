<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import VSkeleton from 'UiKit/components/Base/VSkeleton/VSkeleton.vue';

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  isError?: boolean;
  loading?: boolean;
}>();

const emits = defineEmits<{(e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

</script>

<template>
  <VSkeleton
    v-if="loading"
    width="100%"
    height="50px"
  />
  <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
  <textarea
    v-else
    v-bind="$attrs"
    v-model="modelValue"
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
