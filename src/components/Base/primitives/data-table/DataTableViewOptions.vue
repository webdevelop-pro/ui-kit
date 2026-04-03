<script setup lang="ts">
import type { Column, Table } from "@tanstack/vue-table"
import { MixerHorizontalIcon } from "@radix-icons/vue"
import { computed } from "vue"
import { Button } from "UiKit/components/Base/primitives/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "UiKit/components/Base/primitives/dropdown-menu"

const props = defineProps<{
  table: Table<Record<string, unknown>>
}>()

const columns = computed(() =>
  props.table
    .getAllColumns()
    .filter((column: Column<Record<string, unknown>, unknown>) => typeof column.accessorFn !== "undefined" && column.getCanHide()),
)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="sm" class="ml-auto hidden h-8 lg:flex">
        <MixerHorizontalIcon class="mr-2 h-4 w-4" />
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-44">
      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        class="capitalize"
        :checked="column.getIsVisible()"
        @update:checked="(value: boolean | 'indeterminate') => column.toggleVisibility(Boolean(value))"
      >
        {{ column.id }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
