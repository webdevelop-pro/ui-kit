<script setup lang="ts">
import type { Column } from "@tanstack/vue-table"
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from "@radix-icons/vue"
import { Button } from "UiKit/components/Base/primitives/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "UiKit/components/Base/primitives/dropdown-menu"

const props = defineProps<{
  column: Column<Record<string, unknown>, unknown>
  title: string
}>()
</script>

<template>
  <div v-if="!props.column.getCanSort()" class="text-left font-medium">
    {{ props.title }}
  </div>

  <DropdownMenu v-else>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="sm" class="-ml-3 h-8">
        <span>{{ props.title }}</span>
        <ArrowDownIcon v-if="props.column.getIsSorted() === 'desc'" class="ml-2 h-4 w-4" />
        <ArrowUpIcon v-else-if="props.column.getIsSorted() === 'asc'" class="ml-2 h-4 w-4" />
        <CaretSortIcon v-else class="ml-2 h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuItem @click="props.column.toggleSorting(false)">
        <ArrowUpIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
        Asc
      </DropdownMenuItem>
      <DropdownMenuItem @click="props.column.toggleSorting(true)">
        <ArrowDownIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
        Desc
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="props.column.toggleVisibility(false)">
        <EyeNoneIcon class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
        Hide
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
