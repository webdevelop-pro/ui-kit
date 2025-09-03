<script setup lang="ts">
</script>

<template>
  <td
    class="VTableCell v-table-cell"
  >
    <slot />
  </td>
</template>

<style lang="scss">
@use 'UiKit/styles/_variables.scss' as *;

.v-table-cell {
  color: $gray-80;

  .is--size-regular & {
    padding: 16px;

    @media screen and (max-width: $tablet){
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
    }
  }

  .is--size-small & {
    padding: 12px;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
  }

  .is--size-large & {
    padding: 26px 16px;

    @media screen and (max-width: $tablet){
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
    }
  }
}
</style>
