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
    :class="{ 'is--disabled': disabled }"
  >
    <span class="v-form-label__content">
      <slot />
    
      <span
        v-if="hasAsterisk"
        class="v-form-label__required"
      >
        *
      </span>
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

  &__content::after {
    content: '';
    display: inline-block;
    width: 0;
  }

  &__required {
    color: colors.$red;
    margin-left: 0.2em;
  }

  &.is--disabled {
    color: colors.$gray-80;
    opacity: 0.3;
  }
}
</style>