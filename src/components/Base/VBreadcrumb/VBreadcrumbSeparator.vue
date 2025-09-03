<script lang="ts" setup>
</script>

<template>
  <li
    role="presentation"
    aria-hidden="true"
    class="VBreadcumbSeparator v-breadcrumb-separator"
  >
    <slot>
      >
    </slot>
  </li>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-breadcrumb-separator {
  color: colors.$gray-50;
  margin-top: 0 !important;

  &:last-of-type {
    display: none;
  }
}
</style>
