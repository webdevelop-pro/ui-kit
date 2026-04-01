<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import { cn } from 'UiKit/lib/utils';
import { useSidebar } from './useSidebar';

const props = withDefaults(defineProps<{
  as?: string;
  asChild?: boolean;
  isActive?: boolean;
  size?: 'sm' | 'default' | 'lg';
  class?: HTMLAttributes['class'];
}>(), {
  as: 'button',
  asChild: false,
  isActive: false,
  size: 'default',
  class: undefined,
});

const sidebar = useSidebar();

const sizeClasses = computed(() => {
  if (props.size === 'sm') return 'h-8 text-xs';
  if (props.size === 'lg') return 'h-11 text-sm';
  return 'h-10 text-sm';
});

const buttonSize = computed(() => {
  if (props.size === 'sm') return 'small';
  if (props.size === 'lg') return 'large';
  return 'medium';
});
</script>

<template>
  <VButton
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'VSidebarMenuButton v-sidebar-menu-button',
      'flex w-full items-center gap-3 rounded-sm px-3 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950',
      sizeClasses,
      sidebar.isCollapsed.value ? 'justify-center px-0' : '',
      props.class,
    )"
    :icon-only="sidebar.isCollapsed.value"
    :size="buttonSize"
    :variant="props.isActive ? 'default' : 'link'"
    v-bind="$attrs"
  >
    <slot />
  </VButton>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-sidebar-menu-button {
  text-decoration: none !important;

  &.is--variant-link.is--button-color-primary {
    color: colors.$gray-70;
    border-color: transparent;
    box-shadow: none;

    &:hover {
      background: colors.$gray-10;
      color: colors.$black;
    }
  }

  &.is--variant-default.is--button-color-primary {
    border-color: colors.$primary;
    background: colors.$primary;
    box-shadow: 0 12px 24px -18px rgba(colors.$primary, 0.85);

    &:hover {
      border-color: colors.$primary-dark;
      background: colors.$primary-dark;
    }
  }
}
</style>
