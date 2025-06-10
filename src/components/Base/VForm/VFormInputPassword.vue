<script lang="ts" setup>
import { ref, computed } from 'vue';
import VFormInput from 'UiKit/components/Base/VForm/VFormInput.vue';
import eyeOff from 'UiKit/assets/images/eye-off.svg';
import eye from 'UiKit/assets/images/eye.svg';

interface Props {
  modelValue?: string;
  placeholder?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  isError?: boolean;
  class?: string;
  showStrength?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Enter password',
  name: 'password',
  size: 'medium',
  disabled: false,
  isError: false,
  class: '',
  showStrength: false,
});

const emit = defineEmits<{(e: 'update:modelValue', value: string): void; (e: 'strength-change', score: number): void;}>();

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const calculatePasswordStrength = (password: string): number => {
  let score = 0;

  // Length check
  if (password.length >= 8) score += 1;

  // Contains number
  if (/\d/.test(password)) score += 1;

  // Contains lowercase
  if (/[a-z]/.test(password)) score += 1;

  // Contains uppercase
  if (/[A-Z]/.test(password)) score += 1;

  // Contains special character
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

  return Math.min(score, 4);
};

const passwordScore = computed(() => {
  if (!props.modelValue) return 0;
  return calculatePasswordStrength(props.modelValue);
});

const strengthColor = computed(() => {
  const score = passwordScore.value;
  switch (score) {
    case 1: return '#ff5252';
    case 2: return '#eec32d';
    case 3: return '#a6cd0c';
    case 4: return '#00d395';
    default: return 'transparent';
  }
});

const strengthWidth = computed(() => {
  const score = passwordScore.value;
  return `${(score / 4) * 100}%`;
});
</script>

<template>
  <div class="VFormInputPassword v-form-input-password">
    <VFormInput
      :model-value="modelValue"
      :type="showPassword ? 'text' : 'password'"
      :placeholder="placeholder"
      :name="name"
      :size="size"
      :disabled="disabled"
      :is-error="isError"
      :class="class"
      prepend
      @update:model-value="(val) => {
        emit('update:modelValue', val);
        emit('strength-change', calculatePasswordStrength(val));
      }"
    >
      <template #prepend>
        <div
          class="v-form-input-password__icon-wrap"
          @click="togglePasswordVisibility"
        >
          <component
            :is="showPassword ? eye : eyeOff"
            class="v-form-input-password__icon"
            :alt="showPassword ? 'Hide password' : 'Show password'"
          />
        </div>
      </template>
    </VFormInput>

    <div
      v-if="showStrength"
      class="v-form-input-password__strength-bar"
    >
      <div
        class="v-form-input-password__strength-bar--fill"
        :style="{
          width: strengthWidth,
          backgroundColor: strengthColor,
        }"
      />
      <div class="v-form-input-password__strength-bar-name is--small">
        At least 8 symbols
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-form-input-password {
  &__icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &__icon {
    width: 20px;
    height: 20px;
    color: colors.$gray-70;
  }

  &__strength-bar {
    position: relative;
    height: 3px;
    margin: 8px auto 0;
    background: colors.$gray-30;
    border-radius: 2px;

    &::before,
    &::after {
      position: absolute;
      top: 0;
      z-index: 10;
      display: block;
      width: 25%;
      height: inherit;
      content: "";
      background: transparent;
      border-color: colors.$white;
      border-style: solid;
    }

    &::before {
      left: 25%;
      border-width: 0 8px;
    }

    &::after {
      right: 25%;
      border-width: 0 8px 0 0;
    }
  }

  &__strength-bar--fill {
    position: absolute;
    height: inherit;
    background: transparent;
    border-radius: inherit;
    transition: width 0.5s ease-in-out, background 0.25s;
  }

  &__strength-bar-name {
    padding-top: 8px;
    text-align: end;
    color: colors.$gray-70;
  }
}
</style>
