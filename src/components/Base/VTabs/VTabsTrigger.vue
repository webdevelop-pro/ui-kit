<script setup lang="ts">
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    class="VTabsTrigger v-tabs-trigger"
  >
    <span class="truncate">
      <slot />
    </span>
  </TabsTrigger>
</template>
