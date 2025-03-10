<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import {
  VCombobox, VComboboxAnchor, VComboboxTrigger, VComboboxInput,
  VComboboxContent, VComboboxEmpty, VComboboxGroup, VComboboxItem,
} from './VCombobox';
import VSkeleton from 'UiKit/components/Base/VSkeleton/VSkeleton.vue';

type ObjectOptionValue = string | number | boolean;
type ObjectOption = Record<string, ObjectOptionValue>

const props = withDefaults(defineProps<{
  options: ObjectOption | ObjectOption[] | string[];
  itemLabel?: string;
  itemValue?: string;
  size?: 'large' | 'medium';
  isError?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  loading?: boolean;
}>(), {
  itemLabel: 'label',
  itemValue: 'value',
  size: 'large',
});

const modelValue = defineModel<string>();
const focus = ref(false);
const searchTerm = ref('');

// Helper function to find the label or value based on modelValue (case-insensitive)
const findValueInOption = (value: ObjectOptionValue) => {
  if (Array.isArray(props.options)) {
    // Find the matching option
    return props.options.find((option) => option[props.itemValue].toString().toLowerCase() === value.toString().toLowerCase()
          || option[props.itemLabel].toString().toLowerCase() === value.toString().toLowerCase());
  }

  return null;
};

// Computed display value function
const displayValue = (value: ObjectOptionValue) => {
  if (Array.isArray(props.options) && typeof props.options[0] === 'object') {
    const found = findValueInOption(value);
    return found ? found[props.itemLabel] : value;
  }
  return value;
};

// watch(() => [props.options.length, modelValue.value], () => {
//   if (props.options.length > 0 && (modelValue.value?.length < 3)) {
//     modelValue.value = displayValue(modelValue.value);
//   }
// });

// Filtered options computed property
const filteredOptions = computed(() => {
  if (!searchTerm.value) return props.options;

  if (Array.isArray(props.options)) {
    const normalizedSearch = searchTerm.value.toLowerCase();

    return props.options.filter((option) => {
      if (typeof option === 'string') {
        return option.toLowerCase().includes(normalizedSearch);
      }
      return (
        option[props.itemLabel].toLowerCase().includes(normalizedSearch)
          || option[props.itemValue].toLowerCase().includes(normalizedSearch)
      );
    });
  }
  return props.options;
});

const onBlur = () => {
  focus.value = false;
};
const onFocus = () => {
  focus.value = true;
};
// do not change, otherwise not working search
// have to wirk with filteredOptions
const filterFunction = (list: [], _) => list;
</script>

<template>
  <VSkeleton
    v-if="loading"
    width="100%"
    class="v-combobox-anchor"
    :class="`is--size-${size}`"
  />
  <VCombobox
    v-else
    v-model="modelValue"
    v-model:search-term="searchTerm"
    :display-value="displayValue"
    :filter-function="filterFunction"
    :disabled="disabled || readonly"
    class="VFormCombobox v-form-combobox"
    v-bind="$attrs"
  >
    <VComboboxAnchor
      :is-error="isError"
      :readonly="readonly"
      :disabled="disabled"
      :focused="focus"
    >
      <VComboboxInput
        :placeholder="placeholder"
        @focus="onFocus"
        @blur="onBlur"
      />
      <VComboboxTrigger />
    </VComboboxAnchor>
    <VComboboxContent>
      <VComboboxEmpty />
      <VComboboxGroup>
        <VComboboxItem
          v-for="item in filteredOptions"
          :key="item[itemValue]"
          :value="item[itemValue]"
        >
          {{ item[itemLabel] }}
        </VComboboxItem>
      </VComboboxGroup>
    </VComboboxContent>
  </VCombobox>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;
@use 'UiKit/styles/_mixins.scss' as *;
.v-form-combobox{
  $root: &;

  width: 100%;
}
</style>
