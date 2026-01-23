<script setup lang="ts">
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import VFormCheckboxGroup from 'UiKit/components/Base/VForm/VFormCheckboxGroup.vue';
import {
  PropType, watch, ref,
} from 'vue';
import { onClickOutside } from '@vueuse/core';
import filterIcon from 'UiKit/assets/images/filter.svg';

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
const target = ref<HTMLElement | null>(null);
const selectedFilters = ref(0);
const itemsInner = ref();

const updateFilters = () => {
  selectedFilters.value = 0;
  itemsInner.value?.reduce((countLocal: number, item: IVFilter) => {
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

const scrollToFilterButton = () => {
  if (target.value) {
    target.value.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center',
      inline: 'nearest'
    });
  }
};

const onApplyClick = () => {
  emits('apply', itemsInner.value);
  updateFilters();
  close();
  scrollToFilterButton();
};

const onClear = () => {
  itemsInner.value?.forEach((item: IVFilter) => { item.model = []; });
};

const onClearClick = () => {
  onClear();
  updateFilters();
  emits('apply', itemsInner.value);
  close();
  scrollToFilterButton();
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
      class="v-filter__button"
      @click="onFilterButtonClick"
    >
      <filterIcon
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
            v-model="item.model"
            :options="item.options"
            class="v-filter__checkbox-group"
          />
        </div>

        <div class="v-filter__cta">
          <VButton
            size="small"
            block
            class="v-filter__button is--margin-top-0"
            @click="onApplyClick"
          >
            Apply
          </VButton>
          <VButton
            size="small"
            variant="link"
            block
            class="v-filter__button is--margin-top-0"
            @click.stop="onClearClick"
          >
            Clear Selected
          </VButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-filter{
  --v-filter-dropdown-min-width: 150px;
  --v-form-checkbox-group-item--padding: 12px;

  position: relative;

  &__button-icon{
    color: inherit;
    width: 16px;
  }

  &__dropdown{
    position: absolute;
    top: 100%;
    left: 0;
    min-width: var(--v-filter-dropdown-min-width);
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: colors.$gray-10;
    border: 1px solid colors.$gray-20;
    box-shadow: variables.$box-shadow-medium;
    z-index: 2;
  }

  &__cta{
    display: flex;
    padding: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
  }

  &__title{
    color: colors.$gray-70;
    padding: 12px 12px 2px;
    text-transform: capitalize;
  }

  &__group{
    width: 100%;
  }

  &__checkbox-group{
    width: 100%;

    .v-form-checkbox{
      .is--checked{
        color: colors.$primary;
        font-weight: 600;
      }
    }
  }
}
</style>
