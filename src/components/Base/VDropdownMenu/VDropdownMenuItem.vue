<script setup lang="ts">
import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<DropdownMenuItemProps & { class?: HTMLAttributes['class']; inset?: boolean }>();

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
@use 'UiKit/styles/_colors.scss' as colors;
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
