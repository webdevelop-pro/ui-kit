<script setup lang="ts">
import { AccordionContent, type AccordionContentProps } from 'reka-ui';
import { computed } from 'vue';

const props = defineProps</* @vue-ignore */ AccordionContentProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AccordionContent
    v-bind="delegatedProps"
    class="VAccordionContent v-accordion-content"
    itemprop="description"
  >
    <div class="v-accordion-content__inner">
      <slot />
    </div>
  </AccordionContent>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_transitions.scss' as *;

.v-accordion-content {
  overflow: hidden;
  color: colors.$gray-80;
  transition: all 0.3s ease;
  margin: 0 !important;
  background-color: colors.$gray-10;

  p:first-child {
    margin-top: 0;
  }

  p:last-child {
    margin-bottom: 0;
  }
}

.v-accordion-content__inner {
  padding: 0 16px 24px;
}

.v-accordion-content[data-state="open"] {
  animation: slideDown 0.3s ease;
}

.v-accordion-content[data-state="closed"] {
  animation: slideUp 0.3s ease;
}
</style>
