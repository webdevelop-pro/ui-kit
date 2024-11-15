<script lang="ts" setup>
import { ref } from 'vue';

const focused = ref(false);

function onFocus() {
  focused.value = true;
}

function onBlur() {
  focused.value = false;
}

withDefaults(defineProps<{
  modelValue: string | number;
  isError?: boolean;
}>(), {
  modelValue: '',
});

defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();
</script>

<template>
  <div
    class="VFormTextarea v-form-textarea"
    :class="{ 'is--error': isError, 'is--focused': focused }"
  >
    <textarea
      :value="modelValue"
      tabindex="1"
      class="v-form-textarea__textarea"
      v-bind="$attrs"
      @change="$emit('update:modelValue', $event.target.value)"
      @focus="onFocus"
      @blur="onBlur"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <slot />
    </textarea>
  </div>
</template>

<style lang="sass">
@use 'UiKit/styles/_colors.sass' as colors
.v-form-textarea
  color: colors.$black
  caret-color: colors.$black
  background-color: colors.$gray-10
  font-size: 16px
  line-height: 26px
  font-weight: 400
  font-family: 'Avenir'
  margin: 0
  -webkit-appearance: none
  display: flex
  align-items: center
  width: 100%
  position: relative
  border: solid 1px colors.$gray-40
  border-radius: 2px
  height: 100%
  &.is--focused
    border-color: colors.$primary
  &.is--error
    border-color: colors.$red
  &__textarea
    padding: 0
    border: none
    color: inherit
    font-size: inherit
    font-weight: inherit
    font-family: inherit
    line-height: inherit
    background-color: transparent
    width: 100% !important
    position: relative
    z-index: 2
    padding: 12px
    &:focus
      outline: none
    &::placeholder
      opacity: 1
      color: colors.$gray-60
</style>
