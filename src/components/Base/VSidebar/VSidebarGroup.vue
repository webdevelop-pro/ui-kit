<script setup lang="ts">
import { cn } from 'UiKit/lib/utils';

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <section :class="cn('VSidebarGroup v-sidebar-group flex flex-col gap-2', props.class)">
    <slot />
  </section>
</template>
