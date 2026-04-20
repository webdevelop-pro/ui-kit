<script lang="ts" setup>
import type { SlotProps } from 'vue-input-otp';

defineProps<SlotProps>();
</script>

<template>
  <div
    class="VInputOtpSlot v-input-otp-slot"
    :class="{ 'is--active': isActive, 'is--filled': char !== null }"
  >
    <span v-if="char !== null">{{ char }}</span>
    <span
      v-else-if="hasFakeCaret"
      class="v-input-otp-slot__caret"
    />
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-input-otp-slot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: colors.$gray-10;
  border: 1px solid colors.$gray-40;
  border-radius: 2px;
  font-size: 20px;
  font-weight: 600;
  font-family: variables.$familyValue;
  color: colors.$black;
  transition: border-color 0.15s ease;

  &.is--active {
    border-color: colors.$primary;
    outline: none;
  }

  &__caret {
    display: block;
    width: 1px;
    height: 20px;
    background-color: colors.$black;
    animation: v-otp-caret-blink 1s step-start infinite;
  }
}

@keyframes v-otp-caret-blink {
  0%, 100% { opacity: 1; }

  50% { opacity: 0; }
}
</style>
