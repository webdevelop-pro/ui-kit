<script setup lang="ts">
import {
  VAccordionItem, VAccordion, VAccordionContent, VAccordionTrigger,
} from 'UiKit/components/Base/VAccordion';
import { PropType } from 'vue';

interface IVAccordionListDefault {
  title: string;
  description: string;
}

defineProps({
  data: Array as PropType<IVAccordionListDefault[]>,
});
</script>

<template>
  <VAccordion
    type="single"
    collapsible
    class="VAccordionListDefault v-accordion-list-default"
  >
    <VAccordionItem
      v-for="(item, idx) in data"
      :key="idx"
      :value="String(idx)"
      transparent
    >
      <VAccordionTrigger
        class="v-accordion-list-default__title is--h4__title"
      >
        {{ item.title }}
      </VAccordionTrigger>
      <VAccordionContent
        class="v-accordion-list-default__content is--body"
      >
        <p
          v-html="item.description"
        />
      </VAccordionContent>
    </VAccordionItem>
  </VAccordion>
</template>

<style lang="scss">
.v-accordion-list-default {
  &__content {
    color: $gray-80;
  }
}
</style>
