<script setup lang="ts">
import {
  DropdownMenuContent,
  type DropdownMenuContentEmits,
  type DropdownMenuContentProps,
  DropdownMenuPortal,
  useForwardPropsEmits,
} from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import { cn } from 'UiKit/lib/utils';

const props = withDefaults(
  defineProps<{ class?: HTMLAttributes['class'] } & /* @vue-ignore */ DropdownMenuContentProps>(),
  {
    sideOffset: 4,
  },
);
const emits = defineEmits</* @vue-ignore */ DropdownMenuContentEmits>();

defineOptions({ inheritAttrs: false });

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="cn('VDropdownMenuContent v-dropdown-menu-content', props.class)"
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
  max-height: var(--reka-dropdown-menu-content-available-height);
  animation-duration: 0.6s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1101;
  max-width: 100%;
  min-width: var(--reka-dropdown-menu-trigger-width);
  will-change: opacity, transform;
}

.v-dropdown-menu-content[data-side="top"] {
  animation-name: dropdownMenuSlideUp;
}

.v-dropdown-menu-content[data-side="bottom"] {
  animation-name: dropdownMenuSlideDown;
}

.v-dropdown-menu-content[data-side="left"] {
  animation-name: dropdownMenuSlideLeft;
}

.v-dropdown-menu-content[data-side="right"] {
  animation-name: dropdownMenuSlideRight;
}

@keyframes dropdownMenuSlideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dropdownMenuSlideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dropdownMenuSlideLeft {
  from {
    opacity: 0;
    transform: translateX(10px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes dropdownMenuSlideRight {
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
