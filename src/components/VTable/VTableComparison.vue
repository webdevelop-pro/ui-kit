<script setup lang="ts">
import { PropType } from 'vue';
import {
  VTable, VTableBody, VTableCell, VTableHead, VTableHeader, VTableRow,
} from 'UiKit/components/Base/VTable';


defineProps({
  headers: {
    type: Array as PropType<string[]>,
    required: true,
  },
  rows: {
    type: Array as PropType<string[][]>,
    required: true,
  },
});

</script>

<template>
  <VTable class="VTableComparison v-table-comparison">
    <VTableHeader>
      <VTableRow>
        <VTableHead
          v-for="(header, index) in headers"
          :key="index"
          class="v-table-comparison__head"
        >
          <span class="v-table-comparison__title is--h4__title">
            {{ header }}
          </span>
        </VTableHead>
      </VTableRow>
    </VTableHeader>
    <VTableBody>
      <VTableRow
        v-for="(row, rowIndex) in rows"
        :key="rowIndex"
        class="v-table-comparison__row"
      >
        <VTableCell
          v-for="(value, colIndex) in row"
          :key="colIndex"
          class="v-table-comparison__cell"
        >
          <span v-dompurify-html="value" />
        </VTableCell>
      </VTableRow>
    </VTableBody>
  </VTable>
</template>

<style lang="scss">
@use 'UiKit/styles/_variables.scss' as *;
@use 'UiKit/styles/_colors.scss' as *;

.v-table-comparison {
  width: 100%;

  &__head {
    &:nth-child(2) {
        background-color: $gray-10;
        color: $black;
    }

    &:nth-child(3) {
        background-color: $primary-light;
        color: $primary;
    }
  }

  &__title {
    @media screen and (width < $tablet) {
        font-size: 16px;
        font-weight: 800;
        line-height: 26px;
    }
  }

  &__cell {
    &:first-child {
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        color: $gray-60;

        @media screen and (width > $tablet) {
            width: 180px;
        }
    }

    &:nth-child(2) {
        background-color: $gray-10;
        width: calc(50% - 90px);
    }

    &:nth-child(3) {
        background-color: $primary-light;
        width: calc(50% - 90px);
    }

    @media screen and (width < $tablet) {
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
    }
  }

  .v-table-row {
    &:last-of-type {
        border-bottom: none;
    }
  }

  @media screen and (width < $tablet) {
    td, th {
        padding: 12px;
    }
  }
}
</style>

