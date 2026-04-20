<script lang="ts" setup>
</script>

<template>
  <span
    role="separator"
    class="VInputOtpSeparator v-input-otp-separator"
  >
    —
  </span>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-input-otp-separator {
  color: colors.$gray-50;
  font-size: 16px;
  line-height: 1;
  user-select: none;
}
</style>
