<script setup lang="ts">
import type { CalendarRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { getLocalTimeZone } from "@internationalized/date"
import { CalendarIcon } from "lucide-vue-next"
import { computed, ref } from "vue"
import { Button } from "UiKit/components/Base/primitives/button"
import { Calendar } from "UiKit/components/Base/primitives/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "UiKit/components/Base/primitives/popover"
import { cn } from "UiKit/lib/utils"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  buttonClass?: HTMLAttributes["class"]
  calendarClass?: HTMLAttributes["class"]
  placeholder?: string
  disabled?: boolean
  align?: "start" | "center" | "end"
  closeOnSelect?: boolean
}>(), {
  placeholder: "Pick a date",
  align: "start",
  closeOnSelect: true,
})

const modelValue = defineModel<CalendarRootProps["modelValue"]>()
const open = ref(false)

const label = computed(() => {
  const value = modelValue.value

  if (!value) {
    return props.placeholder
  }

  if (typeof value === "object" && value !== null && "toDate" in value && typeof value.toDate === "function") {
    return value.toDate(getLocalTimeZone()).toLocaleDateString()
  }

  return String(value)
})

function handleUpdate(value: CalendarRootProps["modelValue"]) {
  modelValue.value = value

  if (value && props.closeOnSelect) {
    open.value = false
  }
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :disabled="props.disabled"
        :class="cn('w-full justify-start text-left font-normal', !modelValue && 'text-muted-foreground', props.buttonClass)"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <span>{{ label }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent :align="props.align" :class="cn('w-auto p-0', props.class)">
      <Calendar
        initial-focus
        :model-value="modelValue"
        :class="props.calendarClass"
        @update:model-value="handleUpdate"
      />
    </PopoverContent>
  </Popover>
</template>
