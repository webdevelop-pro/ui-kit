<script setup lang="ts">
import { cn } from 'UiKit/lib/utils';
import { computed } from 'vue';
import { useSidebar } from './useSidebar';

const props = defineProps<{
  class?: string;
}>();

const sidebar = useSidebar();

const insetClasses = computed(() => {
  if (sidebar.isMobile.value) {
    return 'md:ml-0 md:mr-0';
  }

  const expandedOffset = sidebar.side.value === 'left' ? 'md:ml-72' : 'md:mr-72';
  const collapsedOffset = sidebar.side.value === 'left' ? 'md:ml-[4.3rem]' : 'md:mr-[4.3rem]';
  const offcanvasOffset = sidebar.side.value === 'left' ? 'md:ml-0' : 'md:mr-0';

  if (sidebar.collapsible.value === 'offcanvas' && sidebar.isCollapsed.value) {
    return offcanvasOffset;
  }

  return sidebar.isCollapsed.value ? collapsedOffset : expandedOffset;
});
</script>

<template>
  <main
    :class="cn(
      'VSidebarInset v-sidebar-inset',
      'flex min-h-screen min-w-0 flex-1 flex-col transition-[margin] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
      insetClasses,
      props.class,
    )"
  >
    <slot />
  </main>
</template>
