<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();
</script>

<template>
  <h5
    :class="props.class"
    class="VAlertTitle v-alert-title is--h5__title"
  >
    <slot />
  </h5>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-alert-title {
  color: colors.$black;
}
</style>
