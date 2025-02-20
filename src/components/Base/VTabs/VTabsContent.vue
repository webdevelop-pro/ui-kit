<script setup lang="ts">
import { TabsContent, type TabsContentProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<TabsContentProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <TabsContent
    class="VTabsContent v-tabs-content"
    v-bind="delegatedProps"
  >
    <slot />
  </TabsContent>
</template>

<style lang="scss">
.v-tabs-content {
  padding-top: 40px;
}
</style>
