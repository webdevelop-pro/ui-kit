<script setup lang="ts">
import {
  NavigationMenuRoot,
  type NavigationMenuRootEmits,
  type NavigationMenuRootProps,
  useForwardPropsEmits,
} from 'radix-vue';
import { computed } from 'vue';
import NavigationMenuViewport from './VNavigationMenuViewport.vue';

const props = defineProps<NavigationMenuRootProps>();

const emits = defineEmits<NavigationMenuRootEmits>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <NavigationMenuRoot
    v-bind="forwarded"
    class="VNavigationMenu v-navigation-menu"
    itemscope
    itemtype="https://schema.org/Menu"
  >
    <slot />
    <NavigationMenuViewport />
  </NavigationMenuRoot>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;
.v-navigation-menu {
  justify-content: flex-end;
  align-items: center;
  display: flex;
  z-index: 10;
  height: 100%;
  width: 100%;
}
</style>
