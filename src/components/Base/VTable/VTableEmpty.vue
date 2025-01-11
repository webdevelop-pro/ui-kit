<script setup lang="ts">
import TableCell from './VTableCell.vue';
import TableRow from './VTableRow.vue';

const props = withDefaults(defineProps<{
  colspan?: number;
}>(), {
  colspan: 1,
});
</script>

<template>
  <TableRow>
    <TableCell
      class="VTableEmpty v-table-empty"
      v-bind="props"
    >
      <div class="flex items-center justify-center py-10">
        <slot />
      </div>
    </TableCell>
  </TableRow>
</template>
