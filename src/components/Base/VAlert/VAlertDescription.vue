<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();
</script>

<template>
  <div
    :class="props.class"
    class="VAlertDescription v-alert-description"
  >
    <slot />
  </div>
</template>
