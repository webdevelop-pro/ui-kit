<script lang="ts" setup>
defineProps({
  hasAsterisk: Boolean,
});
</script>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <label
    v-bind="$attrs"
    class="VFormlabel v-form-label"
  >
    <slot />

    <span
      v-if="hasAsterisk"
      class="v-form-label__required"
    >
      *
    </span>
  </label>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-form-label{
  color: colors.$gray-80;
  font-family: 'Avenir';
  font-weight: 400;
  font-size: 16px;
  display: inline-block;
  position: relative;

  &__required {
    color: colors.$red;
  }
}
</style>
