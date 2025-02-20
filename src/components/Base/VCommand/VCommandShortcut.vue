<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <span
    :class="props.class"
    class="VCommandShortcut v-command-shortcut"
  >
    <slot />
  </span>
</template>
