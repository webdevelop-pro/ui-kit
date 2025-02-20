<script setup lang="ts">
import {
  NavigationMenuContent,
  type NavigationMenuContentEmits,
  type NavigationMenuContentProps,
  useForwardPropsEmits,
} from 'radix-vue';
import { computed } from 'vue';

const props = defineProps<NavigationMenuContentProps>();

const emits = defineEmits<NavigationMenuContentEmits>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <NavigationMenuContent
    v-bind="forwarded"
    class="VNavigationMenuContent v-navigation-menu-content"
  >
    <slot />
  </NavigationMenuContent>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;
@use 'UiKit/styles/_transitions.scss' as *;
.v-navigation-menu-content {
  position: absolute;
  top: 0;
  left: 0;
  animation-duration: 0.3s;
  animation-timing-function: ease;
  width: auto;
}
.v-navigation-menu-content[data-motion="from-start"] {
  animation-name: enterFromLeft;
}
.v-navigation-menu-content[data-motion="from-end"] {
  animation-name: enterFromRight;
}
.v-navigation-menu-content[data-motion="to-start"] {
  animation-name: exitToLeft;
}
.v-navigation-menu-content[data-motion="to-end"] {
  animation-name: exitToRight;
}
</style>
