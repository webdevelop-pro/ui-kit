<script setup lang="ts">
import { cn } from 'UiKit/lib/utils';
import { useSidebar } from './useSidebar';

const props = defineProps<{
  class?: string;
}>();

const sidebar = useSidebar();
</script>

<template>
  <p
    v-if="!sidebar.isCollapsed.value"
    :class="cn('VSidebarGroupLabel v-sidebar-group-label px-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400', props.class)"
  >
    <slot />
  </p>
</template>
