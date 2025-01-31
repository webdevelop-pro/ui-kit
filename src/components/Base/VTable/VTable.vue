<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  size: String as PropType<'large' | 'regular' | 'small'>,
});
</script>

<template>
  <div class="v-table__wrap">
    <table
      class="VTable v-table"
      :class="`is--size-${size}`"
      itemscope
      itemtype="https://schema.org/Table"
    >
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
    overflow: auto;
  }
}
</style>
