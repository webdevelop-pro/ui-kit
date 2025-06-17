<script setup lang="ts">
import {
  DropdownMenuContent,
  type DropdownMenuContentEmits,
  type DropdownMenuContentProps,
  DropdownMenuPortal,
  useForwardPropsEmits,
} from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = withDefaults(
  defineProps<DropdownMenuContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    sideOffset: 8,
  },
);
const emits = defineEmits<DropdownMenuContentEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      v-bind="forwarded"
      class="VDropdownMenuContent v-dropdown-menu-content"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-dropdown-menu-content {
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.3s ease;
  width: fit-content;
  max-height: var(--radix-dropdown-menu-content-available-height);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  z-index: 100;
  max-width: 100%;
  min-width: var(--radix-dropdown-menu-trigger-width);
  border: 1px solid colors.$light-gray;
  background: colors.$grayscale-white;
  box-shadow: variables.$box-shadow-medium;
}

.v-dropdown-menu-content[data-side="top"] {
  // animation-name: slideUp;
  border-radius: 4px 4px 0 0;
}

.v-dropdown-menu-content[data-side="bottom"] {
  animation-name: slideDown;
  border-radius: 0 0 4px 4px;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(2px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
