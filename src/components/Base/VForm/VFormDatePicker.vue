<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<script lang="ts" setup>
import {
  computed, ref, watch,
} from 'vue';
import type { DateValue } from '@internationalized/date';
import { parseDate, today, getLocalTimeZone } from '@internationalized/date';
import CalendarIcon from 'UiKit/assets/images/calendar.svg?component';
import VSkeleton from 'UiKit/components/Base/VSkeleton/VSkeleton.vue';
import VCalendar from 'UiKit/components/Base/VCalendar/VCalendar.vue';
import VPopover from 'UiKit/components/Base/VPopover/VPopover.vue';
import VPopoverTrigger from 'UiKit/components/Base/VPopover/VPopoverTrigger.vue';
import VPopoverContent from 'UiKit/components/Base/VPopover/VPopoverContent.vue';

interface Props {
  placeholder?: string;
  modelValue?: string;
  isError?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  dataTestid?: string;
  size?: 'large' | 'medium' | 'small';
  loading?: boolean;
  calendarLayout?: 'default' | 'month-and-year';
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'MM/DD/YYYY',
  size: 'medium',
  calendarLayout: 'month-and-year',
});

const emit = defineEmits<{(e: 'update:modelValue', value: string): void}>();

const open = ref(false);
const focused = ref(false);

function stringToDate(value: string): DateValue | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  try {
    return parseDate(value);
  } catch {
    return undefined;
  }
}

function dateToString(date: DateValue): string {
  const y = date.year;
  const m = String(date.month).padStart(2, '0');
  const d = String(date.day).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDisplay(date: DateValue): string {
  const m = String(date.month).padStart(2, '0');
  const d = String(date.day).padStart(2, '0');
  const y = date.year;
  return `${m}/${d}/${y}`;
}

const selectedDate = computed({
  get: () => stringToDate(props.modelValue),
  set: (v: DateValue | undefined) => {
    emit('update:modelValue', v ? dateToString(v) : '');
  },
});

const placeholderDate = computed(() => selectedDate.value ?? today(getLocalTimeZone()));

const displayText = computed(() => {
  const d = stringToDate(props.modelValue);
  return d ? formatDisplay(d) : '';
});

function onOpenChange(isOpen: boolean) {
  open.value = isOpen;
  if (!isOpen) focused.value = false;
}

function onFocus() {
  focused.value = true;
}

function onBlur() {
  if (!open.value) focused.value = false;
}

watch(selectedDate, (val) => {
  if (val) open.value = false;
});
watch(() => props.modelValue, () => { /* sync external changes */ });
</script>

<template>
  <VSkeleton
    v-if="loading"
    width="100%"
    :size="size"
    class="VFormDatePicker v-form-date-picker v-form-input"
    :class="`is--size-${size}`"
  />
  <VPopover
    v-else
    v-model:open="open"
    @update:open="onOpenChange"
  >
    <VPopoverTrigger
      as-child
      :disabled="disabled || readonly"
    >
      <div
        role="button"
        tabindex="0"
        class="VFormDatePicker v-form-date-picker v-form-input"
        :class="[`is--size-${size}`, {
          'is--error': isError,
          'is--focused': focused || open,
          'is--readonly': readonly,
          'is--disabled': disabled,
        }]"
        :data-testid="dataTestid"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.enter.prevent="readonly ? undefined : (open = !open)"
        @keydown.space.prevent="readonly ? undefined : (open = !open)"
      >
        <span
          class="v-form-date-picker__value v-form-input__input"
          :class="{ 'is--placeholder': !displayText }"
        >
          {{ displayText || placeholder }}
        </span>
        <span
          v-if="!readonly"
          class="v-form-date-picker__icon"
        >
          <CalendarIcon class="v-form-date-picker__icon-svg" />
        </span>
      </div>
    </VPopoverTrigger>
    <VPopoverContent
      class="v-form-date-picker__content"
      align="start"
      :side-offset="4"
      @interact-outside="onBlur"
    >
      <VCalendar
        v-model="selectedDate"
        :placeholder="placeholderDate"
        :layout="calendarLayout"
      />
    </VPopoverContent>
  </VPopover>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-form-date-picker {
  cursor: pointer;
  user-select: none;

  &.is--readonly,
  &.is--disabled {
    cursor: default;
  }

  &__value {
    flex: 1;
    min-width: 0;
    text-align: left;

    &.is--placeholder {
      color: colors.$gray-60;
    }
  }

  &__icon {
    pointer-events: none;
    display: flex;
  }

  &__icon-svg {
    width: 18px;
    height: 18px;
    color: colors.$gray-70;
  }

  &__content {
    width: auto !important;
    min-width: 280px;
    padding: 12px;
  }
}

/* Reuse VFormInput styles for the trigger (same as .v-form-input) */
.v-form-date-picker.v-form-input {
  color: colors.$black;
  caret-color: colors.$black;
  background-color: colors.$gray-10;
  font-size: 16px;
  line-height: 26px;
  font-weight: 400;
  font-family: variables.$familyValue;
  padding: 0 12px;
  margin: 0;
  appearance: none;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  border: solid 1px colors.$gray-40;
  border-radius: 2px;
  height: 40px;
  min-height: 32px;

  &.is--focused {
    border-color: colors.$primary;
  }

  &.is--error {
    border-color: colors.$red;
  }

  &.is--size-large {
    height: 48px;
    font-size: 16px;
    line-height: 26px;
  }

  &.is--size-small {
    height: 32px;
    font-size: 16px;
    line-height: 26px;
  }

  &.is--readonly {
    border-radius: 0;
    border: none;
  }

  &.is--disabled {
    opacity: 0.3;
    pointer-events: none;
  }
}
</style>
