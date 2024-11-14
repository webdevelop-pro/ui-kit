<script lang="ts" setup>
import {
  computed, ref, h, useSlots,
} from 'vue';
import VSelect from 'vue-select';

// IMPORTANT: before using this component you need to install library
// type in the terminal: yarn add vue-select@beta

type ObjectOptionValue = string | number | boolean;
type ObjectOption = Record<string, ObjectOptionValue>

const slots = useSlots();

const props = withDefaults(defineProps<{
  /**
   * Options for select
   */
  options: ObjectOption | ObjectOption[] | string[];
  /**
   * Key for label in an object option when options is array of objects
   */
  itemLabel?: string;
  /**
   * Key for value in an object option when options is array of objects
   */
  itemValue?: string;
  /**
   * Make select searchable
   */
  searchable?: boolean;
  /**
   * Sort options in ASC by label
   */
  sort?: boolean;
  /**
   * Exclude options from select. Pass array of values even if options is array of objects
   */
  excludeOptions?: Array<string|number>;
  /**
   * Return object instead of value if options is array of objects
   */
  returnObject?: boolean;
  /**
   * Swap label and value in options if options is simple object
   */
  swapLabelAndValue?: boolean;
  /**
   * size - default is large, can be: large(height: 48px)/medium(height: 40px)
   */
  size?: 'large' | 'medium';
  isError?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  dropdownAbsolute?: boolean;
}>(), {
  itemLabel: 'label',
  itemValue: 'value',
  size: 'large',
});

const emit = defineEmits<{(e: 'update:modelValue', value: ObjectOption|ObjectOptionValue): void;
}>();

// element for open icon
const OpenIndicator = {
  render: () => h('span', ''),
};

const isFocused = ref(false);
const selectComponent = ref();

// Normalize options. Changes only if options is object
// Using props.itemLabel and props.itemValue to set label and value for option
const normalizedOptions = computed((): ObjectOption[] | string[] => {
  if (Array.isArray(props.options)) return props.options;
  return Object.entries(props.options).map(([key, value]) => (
    // If key is value and value is label
    props.swapLabelAndValue
      ? { [props.itemValue]: String(key), [props.itemLabel]: String(value) }
      : { [props.itemValue]: String(value), [props.itemLabel]: key }
  ));
});

// Filter options by excludeOptions
const filteredOptions = computed(() => {
  if (!props.excludeOptions || !normalizedOptions.value.length) return normalizedOptions.value;
  // Filter for if options is array of strings
  if (typeof normalizedOptions.value[0] === 'string') {
    return (normalizedOptions.value as string[]).filter((option) => (
      !(props.excludeOptions as string[]).includes(option)
    ));
  }
  // Filter for if options is array of objects
  return (normalizedOptions.value as ObjectOption[]).filter((option) => (
    !(props.excludeOptions as string[]).includes((option)[props.itemValue] as string)
  ));
});

// Sort option by label if it required by props.sort
const sortedOptions = computed(() => {
  if (!props.sort || !normalizedOptions.value.length) return filteredOptions.value;
  if (typeof filteredOptions.value[0] === 'string') {
    return (filteredOptions.value.slice() as string[]).sort();
  }
  return (filteredOptions.value.slice() as ObjectOption[]).sort((a, b) => (
    String(a[props.itemLabel]).localeCompare(String(b[props.itemLabel]))
  ));
});

// transform value for selected option
// By default if option is object return value of option but return object if props.returnObject is true
function getReturnValue(value: string | ObjectOption): string | ObjectOptionValue | ObjectOption {
  if (props.returnObject || typeof value === 'string') return value;
  return (value)[props.itemValue];
}

// find from options by search string
// ignores types and cases
function findOptionsBySearchString(searchString: string) {
  if (!searchString || !sortedOptions.value.length) return null;
  if (typeof sortedOptions.value[0] === 'string') {
    return (sortedOptions.value as string[])
      .find((item: string) => String(item).toLowerCase() === searchString.toLowerCase());
  }
  return (sortedOptions.value as ObjectOption[])
  // .find(item => String(item[props.itemValue]).toLowerCase() === searchString.toLowerCase()
  //   || item[props.itemLabel] === searchString.toLowerCase());
    .find((item) => item[props.itemLabel] === searchString.toLowerCase());
}

// On user input search
// Also triggers on browser form autofill
function onSearch(searchString: string) {
  //
  const item = findOptionsBySearchString(searchString);
  if (item) {
    emit('update:modelValue', getReturnValue(item));
    selectComponent.value.onAfterSelect();
  }
}

</script>

<template>
  <VSelect
    ref="selectComponent"
    class="VFormSelect v-select"
    :class="[`is--select-${size}`, {
      'is--error': isError,
      'is--disabled': disabled,
      'is--readonly': readonly,
      'is--append': slots.append,
      'is--focused': isFocused,
      'is--dropdown-absolute': dropdownAbsolute,
    }]"
    :options="sortedOptions"
    :searchable="searchable"
    :clearable="false"
    :reduce="getReturnValue"
    :label="itemLabel"
    :autocomplete="isFocused ? 'new-password' : 'on'"
    :components="{ OpenIndicator }"
    v-bind="$attrs"
    @search:focus="isFocused = true"
    @search:blur="isFocused = false"
    @search="onSearch"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <template
      v-if="slots.append"
      #header
    >
      <div class="v-select__append">
        <slot name="append" />
      </div>
    </template>
    <template #no-options>
      <div class="v-select__no-options">
        No data available
      </div>
    </template>
  </VSelect>
</template>

<style lang="sass">
@use 'UiKit/styles/_colors.sass' as colors
@use 'UiKit/styles/_variables.sass' as variables
@use 'UiKit/styles/_mixins.sass' as *
.v-select
  width: 100%
  position: relative
  font-size: 16px
  font-family: 'Avenir'
  font-weight: 400
  background: colors.$gray-10
  &.is--select-large
    :deep(.vs__dropdown-toggle)
      height: 48px
  &.is--select-medium
    :deep(.vs__dropdown-toggle)
      height: 40px
    .v-select__append
      height: 40px
  &.is--focused
    :deep(.vs__dropdown-toggle)
      border-color: colors.$primary
  &.is--error
    :deep(.vs__dropdown-toggle)
      border-color: colors.$red
      &:before
        display: none
  &.is--disabled
    opacity: 0.3
    pointer-events: none
  &.is--readonly
    pointer-events: none
    :deep(.vs__dropdown-toggle)
      background-color: transparent
      padding-left: 0
      padding-right: 0
      .vs__actions
        display: none
  &.is--append
    :deep(.vs__dropdown-toggle)
      padding-left: 43px
  &.is--dropdown-absolute
    position: relative
    :deep(.vs__dropdown-menu)
      position: absolute
      top: 100%
      width: 100%
      z-index: 10
  &.vs--unsearchable
    :deep(.vs__dropdown-toggle),
    :deep(.vs__search)
      cursor: pointer !important
  &__append
    position: absolute
    left: 15px
    top: 0
    z-index: 2
    width: 20px
    height: 48px
    display: flex
    align-items: center
  :deep(.vs__dropdown-toggle)
    border: solid 1px colors.$gray-40
    border-radius: 2px
    position: relative
    display: flex
    align-items: center
    justify-content: space-between
    padding: 12.5px 12px
    height: 40px
    .vs__selected-options
      display: flex
      flex-basis: 100%
      flex-grow: 1
      flex-wrap: wrap
      position: relative
      align-items: center
    .vs__actions
      display: flex
      margin-left: 8px
    .vs__search
      border: solid 1px transparent
      outline: none
      background: none
      box-shadow: none
      color: inherit
      font-size: inherit
      font-weight: inherit
      font-family: inherit
      line-height: inherit
      width: 0
      max-width: 100%
      flex-grow: 1
      z-index: 1
      appearance: none
      padding: 0
      &::placeholder
        color: colors.$gray-60
        font-size: inherit
        font-weight: inherit
        font-family: inherit
        line-height: inherit
        opacity: 1
    .vs__open-indicator
      background-image: url(./arrow.svg)
      width: 16px
      height: 16px
      transform: rotate(90deg)
      @include mt(.3s)
      background-size: contain
      background-repeat: no-repeat
  :deep(.vs__dropdown-menu)
    padding-left: 0
    list-style-type: none
    background-color: colors.$gray-10
    border: solid 1px colors.$gray-20
    box-shadow: variables.$box-shadow-medium
    border-radius: 0
    max-height: 222px
    overflow: scroll
  :deep(.vs__dropdown-option)
    font-family: 'Avenir'
    color: colors.$black
    padding: 12px
    cursor: pointer
    font-size: 16px
    line-height: 26px
    &.vs__dropdown-option--highlight
      background-color: colors.$gray-20
    &.vs__dropdown-option--selected
      color: colors.$primary
      font-size: 16px
      font-weight: 600
  &.vs--open
    &.is--error
      :deep(.vs__dropdown-toggle)
        border-color: colors.$red
    :deep(.vs__dropdown-toggle)
      &:before
        display: none
    :deep(.vs__open-indicator)
      transform: rotate(270deg)
    &.vs--searchable
      :deep(.vs__selected)
        position: absolute
        opacity: 0
      :deep(.vs__search)
        width: 100%

  &__no-options
    padding: 15px
</style>
