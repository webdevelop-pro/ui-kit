<script setup lang="ts">
import { cn } from 'UiKit/lib/utils';

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('VSidebarContent v-sidebar-content flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-3 py-4', props.class)">
    <slot />
  </div>
</template>
