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
  color: colors.$dark-gray;
  background-color: #F2F1ED;
  transition: all 0.3s ease;
  margin: 0 !important;

  p {
    color: inherit;
  }
}

.v-accordion-content[data-state="open"] {
  animation: slideDown 0.3s ease forwards;
  padding: 0 29px 29px;
}

.v-accordion-content[data-state="closed"] {
  animation: slideUp 0.3s ease forwards;
  padding: 0 29px;
}
</style>
