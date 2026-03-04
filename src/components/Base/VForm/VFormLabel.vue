<script lang="ts" setup>
defineProps({
  hasAsterisk: Boolean,
  disabled: Boolean,
});
</script>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <label
    v-bind="$attrs"
    class="VFormlabel v-form-label"
    :class="{
      'is--disabled': disabled,
      'v-form-label--required': hasAsterisk,
    }"
  >
    <span class="v-form-label__content">
      <slot />
    </span>
  </label>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-form-label{
  color: colors.$gray-80;
  font-family: Avenir;
  font-weight: 400;
  font-size: 16px;
  display: inline-block;
  position: relative;

  &__content {
    display: inline;
    white-space: normal;
  }

  &.is--disabled {
    color: colors.$gray-80;
    opacity: 0.3;
  }

  &--required {
    .v-form-label__content::after {
      content: ' *';
      color: colors.$red;
      position: absolute;
      padding-left: 2px;
    }
  }
}
</style>