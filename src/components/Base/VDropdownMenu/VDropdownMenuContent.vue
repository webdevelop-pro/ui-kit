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
    sideOffset: 4,
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
  padding: 8px 0;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 2px;
  border: 1px solid colors.$gray-10;
  background: colors.$white;
  box-shadow: variables.$box-shadow-medium;
  transition: all 0.3s ease;
  width: fit-content;
  max-height: var(--radix-dropdown-menu-content-available-height);
  animation-duration: 0.6s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
  max-width: 100%;
  min-width: var(--radix-dropdown-menu-trigger-width);
}
.v-dropdown-menu-content[data-side="top"] {
  animation-name: slideUp;
}
.v-dropdown-menu-content[data-side="bottom"] {
  animation-name: slideDown;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
