<script setup lang="ts">
import {
  DropdownMenuSubContent,
  type DropdownMenuSubContentEmits,
  type DropdownMenuSubContentProps,
  useForwardPropsEmits,
} from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<{ class?: HTMLAttributes['class'] } & /* @vue-ignore */ DropdownMenuSubContentProps>();
const emits = defineEmits</* @vue-ignore */ DropdownMenuSubContentEmits>();

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
  will-change: opacity, transform;
}

.v-dropdown-menu-sub-content[data-side="top"] {
  animation-name: dropdownMenuSubSlideUp;
}

.v-dropdown-menu-sub-content[data-side="bottom"] {
  animation-name: dropdownMenuSubSlideDown;
}

.v-dropdown-menu-sub-content[data-side="left"] {
  animation-name: dropdownMenuSubSlideLeft;
}

.v-dropdown-menu-sub-content[data-side="right"] {
  animation-name: dropdownMenuSubSlideRight;
}

@keyframes dropdownMenuSubSlideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dropdownMenuSubSlideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dropdownMenuSubSlideLeft {
  from {
    opacity: 0;
    transform: translateX(10px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes dropdownMenuSubSlideRight {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
