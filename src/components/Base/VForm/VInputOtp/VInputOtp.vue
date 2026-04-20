<script lang="ts" setup>
import { OTPInput, type OTPInputProps } from 'vue-input-otp';

type Props = Omit<OTPInputProps, 'maxlength'> & {
  maxlength?: number;
  isError?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  maxlength: 6,
  inputmode: 'numeric',
  isError: false,
});

const modelValue = defineModel<string>({ default: '' });

const emit = defineEmits<{
  complete: [value: string];
}>();
</script>

<template>
  <OTPInput
    v-model="modelValue"
    v-bind="props"
    class="VInputOtp v-input-otp"
    :class="{ 'is--error': isError }"
    @complete="emit('complete', $event)"
  >
    <template #default="slotProps">
      <div class="v-input-otp__content">
        <slot v-bind="slotProps" />
      </div>
    </template>
  </OTPInput>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-input-otp {
  display: flex;
  align-items: center;
  gap: 8px;

  &.is--error .v-input-otp-slot {
    border-color: colors.$red;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
