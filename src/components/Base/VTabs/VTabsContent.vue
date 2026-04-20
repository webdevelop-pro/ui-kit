<script setup lang="ts">
import { TabsContent, type TabsContentProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<{ class?: HTMLAttributes['class'] } & /* @vue-ignore */ TabsContentProps>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

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
