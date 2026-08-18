<script setup lang="ts">
import { computed } from 'vue';
import { cn } from 'UiKit/lib/utils';
import { useSidebar } from './useSidebar';

const props = defineProps<{
  class?: string;
}>();

const sidebar = useSidebar();

const railPositionClass = computed(() => {
  const offset = sidebar.isCollapsed.value ? '4.3rem' : '18rem';

  return sidebar.side.value === 'left'
    ? `left-[calc(${offset}-0.375rem)]`
    : `right-[calc(${offset}-0.375rem)]`;
});
</script>

<template>
  <button
    :class="cn(
      'VSidebarRail v-sidebar-rail',
      'hidden fixed inset-y-0 z-30 w-1.5 cursor-ew-resize border-0 bg-transparent p-0 transition-[left,right,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-slate-200/70 focus-visible:bg-slate-200/70 focus-visible:outline-none md:block',
      railPositionClass,
      props.class,
    )"
    aria-label="Toggle sidebar"
    type="button"
    @click="sidebar.toggleSidebar"
  />
</template>
