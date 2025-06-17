<script setup lang="ts">
import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<DropdownMenuItemProps & { class?: HTMLAttributes['class']; inset?: boolean }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    class="VDropdownMenuItem v-dropdown-menu-item is--body"
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

  &:hover{
    background-color: $light-gray;
  }


  * {
    color: $black;
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
    text-decoration: none;
    padding: 12px;
  }

  .is--active {
    color: $light-blue;
    font-weight: 700;
  }
}
</style>
