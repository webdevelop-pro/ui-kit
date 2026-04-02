<script setup lang="ts">
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import VFormCheckboxGroup from 'UiKit/components/Base/VForm/VFormCheckboxGroup.vue';
import {
  computed,
  ref,
  watch,
} from 'vue';
import { onClickOutside } from '@vueuse/core';
import filterIcon from 'UiKit/assets/images/filter.svg';
import { useSyncFilterItemsWithUrl } from 'UiKit/composables/useSyncFilterItemsWithUrl';
import type {
  UseSyncWithUrlAdapter,
  UseSyncWithUrlNavigationMode,
  UseSyncWithUrlRouteLike,
  UseSyncWithUrlRouterLike,
} from 'UiKit/composables/useSyncWithUrl';

export interface IVFilter {
  value: string;
  title: string;
  options: string[];
  model: string[];
}

interface VFilterProps {
  items: IVFilter[];
  disabled?: boolean;
  filtersToUrl?: boolean;
  queryKey?: string;
  urlSyncAdapter?: UseSyncWithUrlAdapter;
  urlSyncNavigationMode?: UseSyncWithUrlNavigationMode;
  route?: UseSyncWithUrlRouteLike | null;
  router?: UseSyncWithUrlRouterLike | null;
}

const props = withDefaults(defineProps<VFilterProps>(), {
  disabled: false,
  filtersToUrl: false,
  queryKey: 'filter',
  urlSyncAdapter: 'auto',
  urlSyncNavigationMode: 'replace',
});

const emit = defineEmits<{
  apply: [items: IVFilter[]];
}>();

const showDropdown = ref(false);
const target = ref<HTMLElement | null>(null);
const draftItems = ref<IVFilter[]>([]);

const {
  cloneItems,
  items: appliedItems,
  setItems: setAppliedItems,
} = useSyncFilterItemsWithUrl<IVFilter>({
  items: () => props.items,
  syncToUrl: () => props.filtersToUrl,
  queryKey: () => props.queryKey,
  adapter: () => props.urlSyncAdapter,
  navigationMode: () => props.urlSyncNavigationMode,
  route: () => props.route,
  router: () => props.router,
  onSyncFromUrl: (items) => {
    emit('apply', items);
  },
});

const selectedFilters = computed(() => appliedItems.value.reduce(
  (count, item) => count + item.model.length,
  0,
));

const onFilterButtonClick = () => {
  if (props.disabled) {
    return;
  }

  if (showDropdown.value) {
    close();
    return;
  }

  draftItems.value = cloneItems(appliedItems.value);
  showDropdown.value = true;
};

const close = () => {
  draftItems.value = cloneItems(appliedItems.value);
  showDropdown.value = false;
};

const scrollToFilterButton = () => {
  if (target.value) {
    target.value.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  }
};

const emitApply = (items: IVFilter[]) => {
  const nextItems = cloneItems(items);

  setAppliedItems(nextItems);
  emit('apply', cloneItems(nextItems));
};

const onApplyClick = () => {
  emitApply(draftItems.value);
  close();
  scrollToFilterButton();
};

const onClear = () => {
  draftItems.value = draftItems.value.map((item) => ({
    ...item,
    options: [...item.options],
    model: [],
  }));
};

const onClearClick = () => {
  onClear();
  emitApply(draftItems.value);
  close();
  scrollToFilterButton();
};

onClickOutside(target, () => close());

watch(() => props.disabled, (disabled) => {
  if (disabled && showDropdown.value) {
    close();
  }
});

watch(appliedItems, (items) => {
  draftItems.value = cloneItems(items);
}, { immediate: true });
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
          v-for="item in draftItems"
          :key="item.value"
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
