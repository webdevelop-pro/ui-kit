<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { CalendarDate, type DateValue } from '@internationalized/date';
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
} from 'radix-vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import ArrowLeft from 'UiKit/assets/images/arrow-left.svg?component';
import ArrowRight from 'UiKit/assets/images/arrow-right.svg?component';
import VFormSelect from 'UiKit/components/Base/VForm/VFormSelect.vue';

type LayoutType = 'default' | 'month-and-year';

interface Props {
  modelValue?: DateValue;
  placeholder: DateValue;
  layout?: LayoutType;
  yearRange?: { start: number; end: number };
  locale?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  layout: 'default',
  locale: 'en-US',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: DateValue | undefined): void;
  (e: 'update:placeholder', value: DateValue): void;
}>();

const viewDate = ref<CalendarDate>(
  new CalendarDate(props.placeholder.year, props.placeholder.month, props.placeholder.day),
);
watch(
  () => props.placeholder,
  (p) => {
    viewDate.value = new CalendarDate(p.year, p.month, p.day);
  },
  { immediate: true },
);

const placeholderValue = computed(() => viewDate.value as unknown as DateValue);

const selectedDate = computed({
  get: () => props.modelValue,
  set: (v: DateValue | undefined) => emit('update:modelValue', v),
});

const yearRangeComputed = computed(() => {
  if (props.yearRange) return props.yearRange;
  const y = viewDate.value.year;
  return { start: y - 100, end: y + 10 };
});

const years = computed(() => {
  const { start, end } = yearRangeComputed.value;
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const monthNames = computed(() => {
  const formatter = new Intl.DateTimeFormat(props.locale, { month: 'short' });
  return Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: formatter.format(new Date(2000, i, 1)),
  }));
});

const monthOptions = computed(() => monthNames.value.map((m) => ({
  label: m.label,
  value: String(m.value),
})));

const yearOptions = computed(() => years.value.map((y) => ({
  label: String(y),
  value: String(y),
})));

const monthModel = computed({
  get: () => String(viewDate.value.month),
  set: (v: number | string) => {
    const month = Number(v);
    viewDate.value = new CalendarDate(viewDate.value.year, month, 1);
    emit('update:placeholder', viewDate.value as DateValue);
  },
});

const yearModel = computed({
  get: () => String(viewDate.value.year),
  set: (v: number | string) => {
    const year = Number(v);
    viewDate.value = new CalendarDate(year, viewDate.value.month, 1);
    emit('update:placeholder', viewDate.value as DateValue);
  },
});

function onPlaceholderUpdate(val: { year: number; month: number; day: number }) {
  viewDate.value = new CalendarDate(val.year, val.month, val.day);
}

function onSelect(date: { year: number; month: number; day: number }) {
  const next = new CalendarDate(date.year, date.month, date.day);
  emit('update:modelValue', next as DateValue);
}
</script>

<template>
  <CalendarRoot
    v-slot="{ weekDays, grid }"
    v-model="selectedDate"
    :placeholder="placeholderValue"
    initial-focus
    class="VCalendar v-calendar"
    @update:placeholder="onPlaceholderUpdate"
  >
    <CalendarHeader class="v-calendar__header">
      <CalendarPrev as-child>
        <VButton
          type="button"
          variant="link"
          color="primary"
          icon-only
          size="small"
          class="v-calendar__nav-btn"
          aria-label="Previous month"
        >
          <ArrowLeft />
        </VButton>
      </CalendarPrev>
      <template v-if="layout === 'month-and-year'">
        <div class="v-calendar__heading-selects">
          <div class="v-calendar__select-wrap">
            <VFormSelect
              v-model="monthModel"
              :options="monthOptions"
              item-label="label"
              item-value="value"
              size="small"
              class="v-calendar__select"
              :placeholder="monthNames.find(m => m.value === Number(monthModel))?.label ?? ''"
            />
          </div>
          <div class="v-calendar__select-wrap">
            <VFormSelect
              v-model="yearModel"
              :options="yearOptions"
              item-label="label"
              item-value="value"
              size="small"
              class="v-calendar__select"
              :placeholder="yearModel"
            />
          </div>
        </div>
      </template>
      <CalendarHeading
        v-else
        class="v-calendar__heading"
      />
      <CalendarNext as-child>
        <VButton
          type="button"
          variant="link"
          color="primary"
          icon-only
          size="small"
          class="v-calendar__nav-btn"
          aria-label="Next month"
        >
          <ArrowRight />
        </VButton>
      </CalendarNext>
    </CalendarHeader>
    <CalendarGrid
      v-for="month in grid"
      :key="month.value.toString()"
      class="v-calendar__grid"
    >
      <CalendarGridHead>
        <CalendarGridRow class="v-calendar__grid-row">
          <CalendarHeadCell
            v-for="day in weekDays"
            :key="day"
            class="v-calendar__head-cell"
          >
            {{ day }}
          </CalendarHeadCell>
        </CalendarGridRow>
      </CalendarGridHead>
      <CalendarGridBody class="v-calendar__grid-body">
        <CalendarGridRow
          v-for="(weekDates, index) in month.rows"
          :key="`week-${index}`"
          class="v-calendar__grid-row"
        >
          <CalendarCell
            v-for="weekDate in weekDates"
            :key="weekDate.toString()"
            :date="weekDate"
            class="v-calendar__cell"
          >
            <CalendarCellTrigger
              :day="weekDate"
              :month="month.value"
              class="v-calendar__cell-trigger"
              @click="onSelect(weekDate)"
            />
          </CalendarCell>
        </CalendarGridRow>
      </CalendarGridBody>
    </CalendarGrid>
  </CalendarRoot>
</template>

<style lang="scss" scoped>
@use 'UiKit/styles/_colors.scss' as colors;

.v-calendar {
  width: 100%;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  &__heading {
    color: colors.$black;
  }

  &__heading-selects {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1 1 auto;
    min-width: 0;
    justify-content: center;
  }

  &__grid {
    width: 100%;
    border-collapse: collapse;
  }

  &__grid-row {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  &__head-cell {
    padding: 4px 0;
    font-size: 12px;
    font-weight: 500;
    font-family: Avenir, sans-serif;
    color: colors.$gray-60;
    text-align: center;
  }

  &__grid-body {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__cell {
    text-align: center;
    padding: 4px;
  }

  &__cell-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin: 0 auto;
    font-size: 14px;
    font-family: Avenir, sans-serif;
    font-weight: 400;
    color: colors.$black;
    cursor: pointer;
    border-radius: 9999px;
    background-color: transparent;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
      background-color: colors.$gray-20;
    }

    &[data-selected] {
      color: colors.$white;
      background-color: colors.$primary;

      &:hover {
        background-color: colors.$primary-dark;
      }
    }

    &[data-today]:not([data-selected]) {
      font-weight: 600;
      color: colors.$primary;
    }

    &[data-outside-view] {
      color: colors.$gray-50;
    }

    &[data-unavailable] {
      pointer-events: none;
      color: colors.$gray-50;
      text-decoration: line-through;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px colors.$primary;
    }
  }
}
</style>
