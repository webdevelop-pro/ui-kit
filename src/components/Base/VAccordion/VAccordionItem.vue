<script setup lang="ts">
import { AccordionItem, type AccordionItemProps, useForwardProps } from 'reka-ui';
import { computed } from 'vue';

const props = defineProps</* @vue-ignore */ AccordionItemProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <AccordionItem
    v-bind="forwardedProps"
    as="li"
    class="VAccordionItem v-accordion-item"
  >
    <slot />
  </AccordionItem>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-accordion-item {
  border-top: solid 1px colors.$gray-30;
  list-style: none;
  margin-top: 0;

  &:last-child {
    border-bottom: solid 1px colors.$gray-30
  }

  & + & {
    margin-top: 0;
  }
}
</style>
