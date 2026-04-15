<script setup lang="ts">
defineProps({
  disabled: Boolean,
});
</script>

<template>
  <tr
    class="VTableRow v-table-row"
    :class="{ 'is--disabled': disabled }"
  >
    <slot />
  </tr>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;

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

    &.is--disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>
