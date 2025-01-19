<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <header
    :class="props.class"
    class="VDialogHeader v-dialog-header"
  >
    <slot />
  </header>
</template>
