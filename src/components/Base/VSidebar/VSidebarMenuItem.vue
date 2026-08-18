<script setup lang="ts">
import { cn } from 'UiKit/lib/utils';

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <li :class="cn('VSidebarMenuItem v-sidebar-menu-item list-none', props.class)">
    <slot />
  </li>
</template>
