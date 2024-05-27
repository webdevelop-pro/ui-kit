<script setup lang="ts">
import BaseButton from 'UiKit/components/BaseButton';
import BaseFormCheckboxGroup from 'UiKit/components/BaseFormCheckbox/BaseFormCheckboxGroup.vue';
import { PropType, watch, ref, toRaw } from 'vue';
import { BaseSvgIcon } from 'UiKit/components/BaseSvgIcon'
import { onClickOutside } from '@vueuse/core';

export interface IBaseFilter {
  value: string;
  title: string;
  options: string[];
  model: string[];
}

const props = defineProps({
  items: {
    type: Array as PropType<IBaseFilter[]>,
    required: true,
  },
});

const emits = defineEmits(['apply']);

const showDropdown = ref(false);
const target = ref(null);
const selectedFilters = ref(0);
const itemsInner = ref();

const updateFilters = () => {
  selectedFilters.value = 0;
  itemsInner.value?.reduce((countLocal, item) => {
    selectedFilters.value = selectedFilters.value + item.model?.length
    return selectedFilters.value
  }, 0)
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
  itemsInner.value?.forEach((item) => { item.model = [] });
};

const onClearClick = () => {
  onClear();
  updateFilters();
  emits('apply', itemsInner.value);
  close();
};

onClickOutside(target, () => close())

watch(() => props.items, () => {
  itemsInner.value = props.items;
  selectedFilters.value = 0;
  updateFilters();
}, { immediate: true, deep: true });
</script>

<template>
  <div
    ref="target"
    class="BaseFilter base-filter"
  >
    <BaseButton
      size="small"
      variant="link"
      icon-placement="left"
      class="base-filter__button"
      @click="onFilterButtonClick"
    >
      <BaseSvgIcon
        name="filter"
        alt="filter image"
        class="base-filter__button-icon"
      />
      Filters&nbsp;
      <span
        v-if="selectedFilters && selectedFilters > 0"
        class="base-filter__button-number"
      >
        ({{ selectedFilters }})
      </span>
    </BaseButton>
    <Transition>
      <div
        v-if="showDropdown"
        class="base-filter__dropdown"
      >

        <div
          v-for="(item, index) in itemsInner"
          :key="index"
          class="base-filter__group"
        >
          <div class="base-filter__title is--h6__title">
            {{ item.title }}
          </div>
          <BaseFormCheckboxGroup
            :options="item.options"
            :model-value="item.model"
            class="base-filter__checkbox-group"
            @update:model-value="item.model = toRaw($event)"
          />
        </div>

        <div class="base-filter__cta">
          <BaseButton
            size="small"
            block
            class="base-filter__button"
            @click="onApplyClick"
          >
            Apply
          </BaseButton>
          <BaseButton
            size="small"
            variant="link"
            block
            class="base-filter__button"
            @click.stop="onClearClick"
          >
            Clear Selected
          </BaseButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.base-filter
  --base-filter-dropdown--min-width: 150px

  position: relative

  &__button-icon
    color: inherit
    width: 16px

  &__dropdown
    position: absolute
    top: 100%
    left: 0
    min-width: var(--base-filter-dropdown--min-width)
    width: fit-content
    display: flex
    flex-direction: column
    align-items: flex-start
    background-color: $gray-10
    border: 1px solid $gray-20
    box-shadow: $box-shadow-medium
    z-index: 2

  &__cta
    display: flex
    padding: 12px
    flex-direction: column
    align-items: flex-start
    gap: 4px
    align-self: stretch

  &__title
    color: $gray-70
    padding: 12px 12px 2px 12px
    text-transform: capitalize

  &__group
    width: 100%

  &__checkbox-group
    width: 100%
    :deep(.base-form-checkbox)
      &.is--checked
        .base-form-checkbox__text
          color: $primary
          font-weight: 600
</style>
