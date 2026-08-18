<script setup lang="ts">
import {
  NavigationMenuLink,
  type NavigationMenuLinkEmits,
  type NavigationMenuLinkProps,
  useForwardPropsEmits,
} from 'reka-ui';

const props = defineProps</* @vue-ignore */ NavigationMenuLinkProps>();
const emits = defineEmits</* @vue-ignore */ NavigationMenuLinkEmits>();

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
