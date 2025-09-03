<script setup lang="ts">
</script>

<template>
  <th
    class="VTableHead v-table-head"
  >
    <slot />
  </th>
</template>

<style lang="scss">
.v-table-head {
  color: $gray-60;
  gap: 2px;
  cursor: default;

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
