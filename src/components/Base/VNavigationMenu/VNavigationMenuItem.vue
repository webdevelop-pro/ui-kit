<script setup lang="ts">
import { NavigationMenuItem, type NavigationMenuItemProps } from 'reka-ui';

const props = defineProps</* @vue-ignore */ NavigationMenuItemProps>();
</script>

<template>
  <NavigationMenuItem
    v-bind="props"
    class="VNavigationMenuItem v-navigation-menu-item"
    itemscope
    itemtype="https://schema.org/MenuItem"
  >
    <slot />
  </NavigationMenuItem>
</template>
