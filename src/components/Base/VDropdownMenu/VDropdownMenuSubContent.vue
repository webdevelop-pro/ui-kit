<script setup lang="ts">
import {
  DropdownMenuSubContent,
  type DropdownMenuSubContentEmits,
  type DropdownMenuSubContentProps,
  useForwardPropsEmits,
} from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<DropdownMenuSubContentProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<DropdownMenuSubContentEmits>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DropdownMenuSubContent
    v-bind="forwarded"
    class="VDropdownMenuSubContent v-dropdown-menu-sub-content"
  >
    <slot />
  </DropdownMenuSubContent>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-dropdown-menu-sub-content {
  padding: 8px 0;
  border-radius: 2px;
  border: 1px solid colors.$gray-10;
  background: colors.$white;
  box-shadow: variables.$box-shadow-medium;
  z-index: 1;
  min-width: var(--radix-dropdown-menu-trigger-width);
  max-width: 100%;
  overflow: auto;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  max-height: min(var(--radix-dropdown-menu-content-available-height), 80vh);
}
</style>
