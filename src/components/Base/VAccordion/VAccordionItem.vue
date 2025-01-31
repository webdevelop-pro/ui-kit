<script setup lang="ts">
import { AccordionItem, type AccordionItemProps, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps<AccordionItemProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <AccordionItem
    v-bind="forwardedProps"
    class="VAccordionItem v-accordion-item"
    itemscope
    itemtype="https://schema.org/ListItem"
    itemprop="itemListElement"
  >
    <slot />
  </AccordionItem>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-accordion-item {
  border-top: solid 1px colors.$gray-30;
  &:last-child {
    border-bottom: solid 1px colors.$gray-30
  }
}
</style>
