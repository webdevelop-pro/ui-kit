<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  Updater,
  VisibilityState,
} from "@tanstack/vue-table"
import type { HTMLAttributes, Ref } from "vue"
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table"
import { ref } from "vue"
import { cn } from "UiKit/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from "UiKit/components/Base/primitives/table"

type DataTableRow = Record<string, unknown>

const props = withDefaults(defineProps<{
  columns: ColumnDef<DataTableRow, unknown>[]
  data: DataTableRow[]
  class?: HTMLAttributes["class"]
  tableClass?: HTMLAttributes["class"]
  emptyMessage?: string
}>(), {
  emptyMessage: "No results.",
})

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref<RowSelectionState>({})

function valueUpdater<T>(updaterOrValue: Updater<T>, state: Ref<T>) {
  state.value = typeof updaterOrValue === "function"
    ? (updaterOrValue as (old: T) => T)(state.value)
    : updaterOrValue
}

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onColumnFiltersChange: (updaterOrValue: Updater<ColumnFiltersState>) => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue: Updater<VisibilityState>) => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue: Updater<RowSelectionState>) => valueUpdater(updaterOrValue, rowSelection),
  onSortingChange: (updaterOrValue: Updater<SortingState>) => valueUpdater(updaterOrValue, sorting),
  state: {
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
    get sorting() {
      return sorting.value
    },
  },
})

defineExpose({
  table,
})
</script>

<template>
  <div :class="cn('space-y-4', props.class)">
    <slot name="toolbar" :table="table" />

    <div class="rounded-md border">
      <Table :class="props.tableClass">
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <TableEmpty v-else :colspan="props.columns.length">
            {{ props.emptyMessage }}
          </TableEmpty>
        </TableBody>
      </Table>
    </div>

    <slot name="footer" :table="table" />
  </div>
</template>
