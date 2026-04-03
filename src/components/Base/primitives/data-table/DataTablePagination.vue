<script setup lang="ts">
import type { Table } from "@tanstack/vue-table"
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-icons/vue"
import { Button } from "UiKit/components/Base/primitives/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "UiKit/components/Base/primitives/select"

const props = withDefaults(defineProps<{
  table: Table<Record<string, unknown>>
  pageSizeOptions?: number[]
}>(), {
  pageSizeOptions: () => [10, 20, 30, 40, 50],
})
</script>

<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div class="text-sm text-muted-foreground">
      {{ props.table.getFilteredSelectedRowModel().rows.length }} of
      {{ props.table.getFilteredRowModel().rows.length }} row(s) selected.
    </div>

    <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div class="flex items-center gap-2">
        <p class="text-sm font-medium">
          Rows per page
        </p>
        <Select
          :model-value="`${props.table.getState().pagination.pageSize}`"
          @update:model-value="value => props.table.setPageSize(Number(value))"
        >
          <SelectTrigger class="h-8 w-[4.5rem]">
            <SelectValue :placeholder="`${props.table.getState().pagination.pageSize}`" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="pageSize in props.pageSizeOptions" :key="pageSize" :value="`${pageSize}`">
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="flex items-center justify-center text-sm font-medium">
        Page {{ props.table.getState().pagination.pageIndex + 1 }} of {{ props.table.getPageCount() || 1 }}
      </div>

      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          class="hidden sm:flex"
          :disabled="!props.table.getCanPreviousPage()"
          @click="props.table.setPageIndex(0)"
        >
          <DoubleArrowLeftIcon class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          :disabled="!props.table.getCanPreviousPage()"
          @click="props.table.previousPage()"
        >
          <ChevronLeftIcon class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          :disabled="!props.table.getCanNextPage()"
          @click="props.table.nextPage()"
        >
          <ChevronRightIcon class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          class="hidden sm:flex"
          :disabled="!props.table.getCanNextPage()"
          @click="props.table.setPageIndex(props.table.getPageCount() - 1)"
        >
          <DoubleArrowRightIcon class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
