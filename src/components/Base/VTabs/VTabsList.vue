<script setup lang="ts">
import { TabsList, type TabsListProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <TabsList
    v-bind="delegatedProps"
    class="VTabsList v-tabs-list"
  >
    <slot />
  </TabsList>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-tabs-list {
  height: 48px;
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 2px solid colors.$gray-30;
  overflow-x: scroll;
}
</style>
