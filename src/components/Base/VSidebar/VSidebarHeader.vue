<script setup lang="ts">
import { cn } from 'UiKit/lib/utils';

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('VSidebarHeader v-sidebar-header flex flex-col gap-3 border-b border-slate-200 px-3 py-3', props.class)">
    <slot />
  </div>
</template>
