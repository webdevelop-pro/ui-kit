<script setup lang="ts">
import { cn } from 'UiKit/lib/utils';

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <ul
    class="VSidebarMenu v-sidebar-menu"
    :class="cn('flex list-none flex-col gap-1 p-0', props.class)"
  >
    <slot />
  </ul>
</template>

<style lang="scss">
.v-sidebar-menu {
  padding: 0;
}
</style>
