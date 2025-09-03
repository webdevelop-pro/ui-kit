<script setup lang="ts">
import { NavigationMenuList, type NavigationMenuListProps, useForwardProps } from 'radix-vue';

const props = defineProps<NavigationMenuListProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <NavigationMenuList
    v-bind="forwardedProps"
    class="VNavigationMenuList v-navigation-menu-list"
  >
    <slot />
  </NavigationMenuList>
</template>

<style lang="scss">
.v-navigation-menu-list {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 28px;
  height: 100%;
  list-style: none;
  padding: 0;
}

.v-navigation-menu-list[data-orientation="vertical"] {
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
</style>
