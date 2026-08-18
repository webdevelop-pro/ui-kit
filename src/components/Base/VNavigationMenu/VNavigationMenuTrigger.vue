<script setup lang="ts">
import {
  NavigationMenuTrigger,
  type NavigationMenuTriggerProps,
  useForwardProps,
} from 'reka-ui';
import { computed } from 'vue';

const props = defineProps</* @vue-ignore */ NavigationMenuTriggerProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <NavigationMenuTrigger
    v-bind="forwardedProps"
    class="VNavigationMenuTrigger v-navigation-menu-trigger is--h6__title is--link"
  >
    <slot />
  </NavigationMenuTrigger>
</template>

<style lang="scss">
@use 'UiKit/styles/_variables.scss' as *;

.v-navigation-menu-trigger {
  height: $header-height;
}
</style>
