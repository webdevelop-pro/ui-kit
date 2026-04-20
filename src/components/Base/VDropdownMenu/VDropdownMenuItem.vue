<script setup lang="ts">
import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'reka-ui';
import { type HTMLAttributes } from 'vue';

const props = defineProps<{ class?: HTMLAttributes['class']; inset?: boolean } & /* @vue-ignore */ DropdownMenuItemProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    class="VDropdownMenuItem v-dropdown-menu-item is--h6__title"
  >
    <slot />
  </DropdownMenuItem>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;
@use 'UiKit/styles/_variables.scss' as variables;

.v-dropdown-menu-item {
  display: block;
  color: $black;
  width: 100%;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: $gray-20;
  }

  &.is--active {
    color: $primary;
  }
}
</style>
