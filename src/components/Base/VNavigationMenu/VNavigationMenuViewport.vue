<script setup lang="ts">
import {
  NavigationMenuViewport,
  type NavigationMenuViewportProps,
  useForwardProps,
} from 'radix-vue';
import { computed } from 'vue';

const props = defineProps<NavigationMenuViewportProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <div class="v-navigation-menu-viewport__wrap">
    <NavigationMenuViewport
      v-bind="forwardedProps"
      class="VNavigationMenuViewport v-navigation-menu-viewport"
    />
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;
@use 'UiKit/styles/_transitions.scss' as *;

.v-navigation-menu-viewport {
  position: relative;
  transform-origin: top center;
  overflow: hidden;
  width: var(--radix-navigation-menu-viewport-width);
  height: var(--radix-navigation-menu-viewport-height);
  transition: width, height, 0.3s ease;
  border-radius: 2px;
  border: 1px solid colors.$gray-10;
  background: colors.$white;
  box-shadow: variables.$box-shadow-medium;

  &__wrap {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    top: 100%;
    left: 0;
    perspective: 2000px;
  }
}

.v-navigation-menu-viewport[data-state='open'] {
  animation: scaleIn 200ms ease;
}

.v-navigation-menu-viewport[data-state='closed'] {
  animation: scaleOut 200ms ease;
}
</style>
