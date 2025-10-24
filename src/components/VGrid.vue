<script setup lang="ts">
</script>

<template>
  <div
    class="VGrid v-grid"
  >
    <slot />
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as *;

.v-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}
</style>
