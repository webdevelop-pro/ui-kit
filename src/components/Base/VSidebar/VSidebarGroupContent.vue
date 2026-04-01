<script setup lang="ts">
import { cn } from 'UiKit/lib/utils';

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('VSidebarGroupContent v-sidebar-group-content flex flex-col gap-1', props.class)">
    <slot />
  </div>
</template>
