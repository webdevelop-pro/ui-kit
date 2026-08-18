<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>

<template>
  <div
    :class="props.class"
    class="VDialogFooter v-dialog-footer"
  >
    <slot />
  </div>
</template>
