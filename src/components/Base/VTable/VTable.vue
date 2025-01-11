<script setup lang="ts">
</script>

<template>
  <div class="v-table__wrap">
    <table class="VTable v-table">
      <slot />
    </table>
  </div>
</template>

<style lang="scss">
.v-table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;

  &__wrap {
    width: 100%;
  }
}
</style>
