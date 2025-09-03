<script setup lang="ts">
import { TabsList, type TabsListProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = withDefaults(defineProps<TabsListProps & {
  class?: HTMLAttributes['class'];
  variant?: 'primary' | 'secondary';
}>(), {
  variant: 'primary',
});

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});
</script>

<template>
  <TabsList
    v-bind="delegatedProps"
    :class="[props.class, `is--variant-${variant}`]"
    class="VTabsList v-tabs-list"
  >
    <slot />
  </TabsList>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-tabs-list {
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow: auto hidden;
    position: relative;
    gap: 20px;

  &.is--varinat-primary {
    height: 48px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      border-bottom: 2px solid colors.$gray-30;
      width: 100%;
    }
  }

  &.is--variant-secondary {
    height: 24px;
    gap: 4px;
  }
}
</style>
