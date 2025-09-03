<script setup lang="ts">
import {
  VTable, VTableBody, VTableCell, VTableHead, VTableHeader, VTableRow,
} from 'UiKit/components/Base/VTable';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';
import { computed, PropType } from 'vue';
import VSection from 'UiKit/components/VSection/VSection.vue';

const { isTablet } = storeToRefs(useBreakpoints());

interface ISectionTableLargeCell {
  title: string;
  subtitle: string;
  header: string[];
  items: string[][];
}

const props = defineProps({
  data: {
    type: Object as PropType<ISectionTableLargeCell>,
    required: true,
  },
});

const filteredItems = computed(() => (
  props.data.items.map((subArray) => (isTablet.value ? subArray.filter((_, index) => index !== 2) : subArray))));
const filteredHeader = computed(() => (
  isTablet.value ? props.data.header.filter((_, index) => index !== 2) : props.data.header));
</script>

<template>
  <VSection class="VSectionTableLargeCell v-section-table-large-cell">
    <template #infoShort>
      <slot name="infoShort">
        <h3>
          {{ data.title }}
        </h3>
        <p
          class="is--subheading-2"
          v-html="data.subtitle"
        />
      </slot>
    </template>
    <VTable>
      <VTableHeader>
        <VTableRow>
          <VTableHead
            v-for="(head, headInd) in filteredHeader"
            :key="headInd"
          >
            {{ head }}
          </VTableHead>
        </VTableRow>
      </VTableHeader>
      <VTableBody>
        <VTableRow
          v-for="(row, ind) in filteredItems"
          :key="ind"
        >
          <VTableCell
            v-for="(rowItem, rowInd) in row"
            :key="rowInd"
            class="v-section-table-large-cell__cell"
          >
            <p
              v-html="rowItem"
            />
          </VTableCell>
        </VTableRow>
      </VTableBody>
    </VTable>
  </VSection>
</template>

<style lang="scss">
.v-section-table-large-cell {
  &__cell {
    @include media-gt(tablet) {
      height: 87px;
    }
  }

  .v-table {
    table-layout: fixed;
  }
}
</style>
