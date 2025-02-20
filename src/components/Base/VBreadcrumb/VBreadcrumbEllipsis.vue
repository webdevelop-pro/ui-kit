<script lang="ts" setup>
import dots from 'UiKit/assets/images/three-dots.svg';
</script>

<template>
  <span
    role="presentation"
    aria-hidden="true"
    class="VBreadcumbEllipsis v-breadcrumb-ellipsis"
  >
    <slot>
      <dots
        class="v-breadcrumb-ellipsis__icon"
      />
    </slot>
  </span>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as *;

.v-breadcrumb-ellipsis {
  &__icon {
    color: inherit;
    width: 10px;
    height: auto;
  }
}
</style>
