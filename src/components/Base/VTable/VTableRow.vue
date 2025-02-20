<script setup lang="ts">
</script>

<template>
  <tr class="VTableRow v-table-row">
    <slot />
  </tr>
</template>

<style lang="scss">
.v-table-body {
  .v-table-row {
    border-top: 1px solid $gray-20;
    cursor: default;
    transition: all 0.3s ease;

    &:hover {
      background-color: $gray-10;
    }

    &:last-of-type {
      border-bottom: 1px solid $gray-20;
    }
  }
}
</style>
