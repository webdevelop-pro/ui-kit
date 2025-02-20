<script setup lang="ts">
import {
  NavigationMenuLink,
  type NavigationMenuLinkEmits,
  type NavigationMenuLinkProps,
  useForwardPropsEmits,
} from 'radix-vue';

const props = defineProps<NavigationMenuLinkProps>();
const emits = defineEmits<NavigationMenuLinkEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <NavigationMenuLink
    v-bind="forwarded"
    class="VNavigationMenuLink v-navigation-menu-link is--h6__title is--link"
  >
    <slot />
  </NavigationMenuLink>
</template>

<style lang="scss">
.v-navigation-menu-link {
  text-decoration: none;
}
</style>
