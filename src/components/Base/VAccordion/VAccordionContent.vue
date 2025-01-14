<script setup lang="ts">
import { AccordionContent, type AccordionContentProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps<AccordionContentProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AccordionContent
    v-bind="delegatedProps"
    class="VAccordionContent v-accordion-content"
  >
    <slot />
  </AccordionContent>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-accordion-content {
  overflow: hidden;
  color: colors.$gray-80;
  transition: all 0.3s ease;
  margin: 0 !important;
}
.v-accordion-content[data-state="open"] {
  animation: slideDown 0.3s ease;
  background-color: colors.$gray-10;
  padding: 16px 16px;
}
.v-accordion-content[data-state="closed"] {
  animation: slideUp 0.3s ease;
  padding: 0 16px;
}
</style>
