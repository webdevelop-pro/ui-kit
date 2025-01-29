<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'radix-vue';
import { TabsRoot, useForwardPropsEmits } from 'radix-vue';
import {
  computed, HTMLAttributes, ref, watch,
} from 'vue';

const props = withDefaults(defineProps<TabsRootProps & {
  class?: HTMLAttributes['class'];
  tabsToUrl?: boolean;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}>(), {
  variant: 'primary',
});
const emits = defineEmits<TabsRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, tabsToUrl, ...delegated } = props;

  return delegated;
});
const forwarded = useForwardPropsEmits(delegatedProps, emits);
const selectedTab = ref(props.defaultValue || '');


const queryTab = computed(() => new URLSearchParams(window.location.search).get('tab'));

const setUrl = (newItem: string) => {
  const currentUrl = new URL(window.location.href);
  if (newItem === props.defaultValue) {
    currentUrl.searchParams.delete('tab'); // Remove `media` if index is 0
  } else {
    currentUrl.searchParams.set('tab', newItem);
  }
  window.history.replaceState(null, '', currentUrl.toString());
};

// Watch for changes in `modelValue` or local `selectedTab`
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue && props.tabsToUrl) {
      selectedTab.value = newValue;
      setUrl(newValue);
    }
  },
  { immediate: true },
);

watch(
  () => selectedTab.value,
  (newValue) => {
    emits('update:modelValue', newValue); // Emit to parent if `modelValue` is bound
    if (props.tabsToUrl) setUrl(newValue); // Update the URL
  },
);
// Sync with query parameter when it changes
watch(
  () => queryTab.value,
  (newQuery) => {
    if (newQuery) {
      selectedTab.value = newQuery;
    } else {
      selectedTab.value = props.defaultValue || '';
    }
  },
  { immediate: true },
);
</script>

<template>
  <TabsRoot
    v-bind="forwarded"
    v-model="selectedTab"
    class="VTabs v-tabs"
    :class="[props.class, `is--variant-${variant}`, { 'is--full-width': fullWidth }]"
  >
    <slot />
  </TabsRoot>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.with-default-distance .v-tabs,
.v-tabs.with-default-distance {
  margin-top: 40px;
  width: 100%;
}

.v-tabs {
  &.is--variant-secondary {
    gap: 4px;
    border-radius: 2px;
    background: colors.$gray-20;
    padding: 4px;
  }
  &.is--full-width {
    width: 100%;
  }
}
</style>
