<script setup lang="ts">
import { NavigationMenuIndicator, type NavigationMenuIndicatorProps, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps<NavigationMenuIndicatorProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <NavigationMenuIndicator
    v-bind="forwardedProps"
    class="VNavigationMenuIndicator v-navigation-menu-indicator"
  />
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-navigation-menu-indicator {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 10px;
  top: 100%;
  overflow: hidden;
  z-index: 1;
  transition: width, transform 250ms ease;
}

.v-navigation-menu-indicator[data-state='visible'] {
  animation: fadeIn 200ms ease;
}

.v-navigation-menu-indicator[data-state='hidden'] {
  animation: fadeOut 200ms ease;
}
</style>
