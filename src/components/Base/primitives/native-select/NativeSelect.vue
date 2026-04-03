<script setup lang="ts">
import type { HTMLAttributes, SelectHTMLAttributes } from "vue"
import { ChevronDownIcon } from "@radix-icons/vue"
import { useAttrs } from "vue"
import { cn } from "UiKit/lib/utils"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const modelValue = defineModel<SelectHTMLAttributes["value"]>()
const attrs = useAttrs()
</script>

<template>
  <div class="relative">
    <select
      v-model="modelValue"
      v-bind="attrs"
      :class="
        cn(
          'flex h-9 w-full appearance-none items-center rounded-md border border-input bg-transparent px-3 py-2 pe-8 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          props.class,
        )
      "
    >
      <slot />
    </select>
    <ChevronDownIcon class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
  </div>
</template>
