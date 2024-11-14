<script setup lang="ts">
import VButton from 'UiKit/components/VButton/VButton.vue';
import VFormCheckboxGroup from 'UiKit/components/VForm/VFormCheckboxGroup.vue';
import {
  PropType, watch, ref, toRaw,
} from 'vue';
import { VSvgIcon } from 'UiKit/components/VSvgIcon';
import { onClickOutside } from '@vueuse/core';

export interface IVFilter {
  value: string;
  title: string;
  options: string[];
  model: string[];
}

const props = defineProps({
  items: {
    type: Array as PropType<IVFilter[]>,
    required: true,
  },
  disabled: Boolean,
});

const emits = defineEmits(['apply']);

const showDropdown = ref(false);
const target = ref(null);
const selectedFilters = ref(0);
const itemsInner = ref();

const updateFilters = () => {
  selectedFilters.value = 0;
  itemsInner.value?.reduce((countLocal, item) => {
    selectedFilters.value += item.model?.length;
    return selectedFilters.value;
  }, 0);
};

const onFilterButtonClick = () => {
  showDropdown.value = !showDropdown.value;
};

const close = () => {
  showDropdown.value = false;
};

const onApplyClick = () => {
  emits('apply', itemsInner.value);
  updateFilters();
  close();
};

const onClear = () => {
  itemsInner.value?.forEach((item) => { item.model = []; });
};

const onClearClick = () => {
  onClear();
  updateFilters();
  emits('apply', itemsInner.value);
  close();
};

onClickOutside(target, () => close());

watch(() => props.items, () => {
  itemsInner.value = props.items;
  selectedFilters.value = 0;
  updateFilters();
}, { immediate: true, deep: true });
</script>

<template>
  <div
    ref="target"
    class="VFilter v-filter"
    :class="{ 'is--disabled': disabled }"
  >
    <VButton
      size="small"
      variant="link"
      :disabled="disabled"
      icon-placement="left"
      class="v-filter__button"
      @click="onFilterButtonClick"
    >
      <VSvgIcon
        name="filter"
        class="v-filter__button-icon"
      />
      Filters&nbsp;
      <span
        v-if="selectedFilters && selectedFilters > 0"
        class="v-filter__button-number"
      >
        ({{ selectedFilters }})
      </span>
    </VButton>
    <Transition>
      <div
        v-if="showDropdown"
        class="v-filter__dropdown"
      >
        <div
          v-for="(item, index) in itemsInner"
          :key="index"
          class="v-filter__group"
        >
          <div class="v-filter__title is--h6__title">
            {{ item.title }}
          </div>
          <VFormCheckboxGroup
            :options="item.options"
            :model-value="item.model"
            class="v-filter__checkbox-group"
            @update:model-value="item.model = toRaw($event)"
          />
        </div>

        <div class="v-filter__cta">
          <VButton
            size="small"
            block
            class="v-filter__button"
            @click="onApplyClick"
          >
            Apply
          </VButton>
          <VButton
            size="small"
            variant="link"
            block
            class="v-filter__button"
            @click.stop="onClearClick"
          >
            Clear Selected
          </VButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="sass">
@use 'UiKit/styles/_colors.sass' as colors
@use 'UiKit/styles/_variables.sass' as variables
.v-filter
  --v-filter-dropdown--min-width: 150px

  position: relative

  &__button-icon
    color: inherit
    width: 16px

  &__dropdown
    position: absolute
    top: 100%
    left: 0
    min-width: var(--v-filter-dropdown--min-width)
    width: fit-content
    display: flex
    flex-direction: column
    align-items: flex-start
    background-color: colors.$gray-10
    border: 1px solid colors.$gray-20
    box-shadow: variables.$box-shadow-medium
    z-index: 2

  &__cta
    display: flex
    padding: 12px
    flex-direction: column
    align-items: flex-start
    gap: 4px
    align-self: stretch

  &__title
    color: colors.$gray-70
    padding: 12px 12px 2px 12px
    text-transform: capitalize

  &__group
    width: 100%

  &__checkbox-group
    width: 100%
    :deep(.v-form-checkbox)
      &.is--checked
        .v-form-checkbox__text
          color: colors.$primary
          font-weight: 600
</style>
