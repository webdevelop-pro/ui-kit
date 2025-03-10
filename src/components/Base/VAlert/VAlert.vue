<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant?: 'error' | 'success' | 'info';
}>();
</script>

<template>
  <div
    :class="[`is--${variant}`, props.class]"
    role="alert"
    class="VAlert v-alert"
  >
    <slot />
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-alert {
  color: colors.$gray-80;
  margin: 3px 0 20px;
  border-left: solid 2px transparent;
  padding: 12px 20px 12px 18px;
  display: flex;
  justify-content: space-between;

  &.is--error {
    background-color: colors.$red-light;
    border-color: colors.$red;
    a {
      color: colors.$red;
      border-color: colors.$red;
    }
  }
  &.is--success {
    background-color: colors.$secondary-light;
    border-color: colors.$secondary;
    a {
      color: colors.$secondary;
      border-color: colors.$secondary;
    }
  }
  &.is--info {
    background-color: colors.$primary-light;
    border-color: colors.$primary;
    a {
      color: colors.$primary;
      border-color: colors.$primary;
    }
  }
}
</style>
