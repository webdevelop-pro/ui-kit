<script setup lang="ts">
import {
  computed,
  provide,
} from 'vue';
import { cn } from 'UiKit/lib/utils';
import {
  createSidebarState,
  sidebarContextKey,
  type SidebarCollapsible,
  type SidebarSide,
} from './useSidebar';

const props = withDefaults(defineProps<{
  defaultOpen?: boolean;
  open?: boolean;
  collapsible?: SidebarCollapsible;
  side?: SidebarSide;
  mobileBreakpoint?: number;
  class?: string;
}>(), {
  defaultOpen: true,
  collapsible: 'icon',
  side: 'left',
  mobileBreakpoint: 768,
  class: undefined,
});

const emit = defineEmits<{
  'update:open': [value: boolean];
}>();

const sidebar = createSidebarState({
  defaultOpen: props.defaultOpen,
  open: computed(() => props.open),
  collapsible: computed(() => props.collapsible),
  side: computed(() => props.side),
  mobileBreakpoint: computed(() => props.mobileBreakpoint),
  onOpenChange: (value) => emit('update:open', value),
});

provide(sidebarContextKey, sidebar);
</script>

<template>
  <div
    :class="cn(
      'VSidebarProvider v-sidebar-provider',
      'group/sidebar-wrapper flex min-h-screen w-full bg-slate-100/70 text-slate-950',
      props.class,
    )"
    :data-state="sidebar.open.value ? 'expanded' : 'collapsed'"
    :data-collapsible="sidebar.collapsible.value"
    :data-side="sidebar.side.value"
  >
    <slot
      :is-collapsed="sidebar.isCollapsed.value"
      :is-mobile="sidebar.isMobile.value"
      :mobile-open="sidebar.mobileOpen.value"
      :open="sidebar.open.value"
    />
  </div>
</template>
