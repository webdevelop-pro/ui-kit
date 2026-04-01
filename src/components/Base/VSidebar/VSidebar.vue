<script setup lang="ts">
import { computed } from 'vue';
import { X } from 'lucide-vue-next';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import { cn } from 'UiKit/lib/utils';
import { type SidebarCollapsible, type SidebarSide, useSidebar } from './useSidebar';

const props = withDefaults(defineProps<{
  side?: SidebarSide;
  collapsible?: SidebarCollapsible;
  class?: string;
}>(), {
  side: undefined,
  collapsible: undefined,
  class: undefined,
});

const sidebar = useSidebar();

const resolvedSide = computed(() => props.side ?? sidebar.side.value);
const resolvedCollapsible = computed(() => props.collapsible ?? sidebar.collapsible.value);
</script>

<template>
  <div class="contents">
    <div
      v-if="sidebar.isMobile.value"
      class="VSidebarMobile v-sidebar-mobile md:hidden"
    >
      <VButton
        v-if="sidebar.mobileOpen.value"
        as="button"
        aria-label="Close sidebar overlay"
        class="fixed inset-0 z-[130] border-none bg-slate-950/40 p-0 shadow-none"
        color="secondary"
        icon-only
        size="small"
        type="button"
        variant="tetriary"
        @click="sidebar.setMobileOpen(false)"
      >
        <span class="sr-only">Close sidebar overlay</span>
      </VButton>

      <aside
        :class="cn(
          'VSidebar v-sidebar',
          'fixed inset-y-0 z-[140] flex h-svh w-72 flex-col border-slate-200 bg-white/95 shadow-2xl backdrop-blur transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform',
          resolvedSide === 'left' ? 'left-0 border-r' : 'right-0 border-l',
          sidebar.mobileOpen.value
            ? 'translate-x-0'
            : resolvedSide === 'left'
              ? '-translate-x-full'
              : 'translate-x-full',
          props.class,
        )"
      >
        <div class="flex h-full min-h-0 flex-col">
          <div class="flex items-center justify-end border-b border-slate-200 px-3 py-3">
            <VButton
              as="button"
              aria-label="Close sidebar"
              class="v-sidebar__mobile-close"
              color="secondary"
              data-sidebar-close
              icon-only
              size="small"
              type="button"
              variant="link"
              @click="sidebar.setMobileOpen(false)"
            >
              <X class="h-4 w-4 is--color-gray-70" />
            </VButton>
          </div>

          <div class="flex min-h-0 flex-1 flex-col">
            <slot />
          </div>
        </div>
      </aside>
    </div>

    <aside
      v-else
      :class="cn(
        'VSidebar v-sidebar',
        'hidden fixed inset-y-0 top-0 z-30 h-svh overflow-hidden bg-white/90 backdrop-blur transition-[width,opacity,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:flex md:flex-col',
        resolvedSide === 'left' ? 'left-0 border-r border-slate-200' : 'right-0 border-l border-slate-200',
        resolvedCollapsible === 'icon' && sidebar.isCollapsed.value ? 'md:w-[4.3rem]' : 'md:w-72',
        resolvedCollapsible === 'offcanvas' && sidebar.isCollapsed.value ? 'md:w-0 md:border-none md:opacity-0 md:shadow-none' : '',
        props.class,
      )"
    >
      <div
        :class="cn(
          'VSidebarViewport v-sidebar__viewport',
          'flex h-full min-h-0 flex-1 flex-col overflow-hidden transition-opacity duration-200 ease-out',
          resolvedCollapsible === 'offcanvas' && sidebar.isCollapsed.value ? 'opacity-0' : 'opacity-100',
        )"
      >
        <slot />
      </div>
    </aside>
  </div>
</template>
