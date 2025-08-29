<script lang="ts" setup>
import { computed } from 'vue';
import questionIcon from 'UiKit/assets/images/circle-question.svg';
import VTooltip from 'UiKit/components/VTooltip.vue';

const props = defineProps<{
  label?: string;
  errorText?: string[];
  required?: boolean;
  dark?: boolean;
}>();


const errorText = computed(() => {
  return props.errorText?.join(', ') || '';
});
const isError = computed(() => (errorText.value?.length > 0));

</script>

<template>
  <div class="VFormGroup v-form-group">
    <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
    <label
      v-if="label"
      class="v-form-group__label is--h6__title"
      :class="{ 'is--dark': dark }"
    >
      <span class="v-form-group__label-text">{{ label }}</span>
      <span
        v-if="required"
        class="v-form-group__label-required"
      >*</span>
      <VTooltip v-if="$slots.tooltip">
        <questionIcon
          class="v-form-group__label-icon"
        />
        <template #content>
          <slot name="tooltip" />
        </template>
      </VTooltip>
    </label>
    <div class="v-form-group__input">
      <slot
        :is-field-error="isError"
      />
    </div>
    <div
      v-if="isError"
      class="v-form-group__error is--small"
      :class="{ 'is--error': isError }"
      data-testid="input-error"
    >
      <slot
        name="error"
      >
        {{ errorText }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-form-group {
  display: flex;
  flex-direction: column;
  position: relative;

  &__label {
    display: inline-flex;
    position: relative;
    color: colors.$gray-70;
    text-align: left;
    align-items: center;
    margin-bottom: 7px;
    &.is--dark {
      color: colors.$white;
    }
  }

  &__label-icon {
    width: 16px;
    height: 16px;
    margin-left: 4px;
    color: colors.$gray-70;
    cursor: pointer;
  }

  &__label-required {
    color: colors.$red;
  }

  &__error {
    margin-top: 4px;
    color: colors.$red-dark;
    transition: all 0.3s ease;
    transform: translateY(-5px);
    &.is--error{
      height: auto;
      transition: all 0.3s ease;
      transform: translateY(0);
    }
  }

  &__input {
    width: 100%;
    position: relative;
  }
}
</style>
