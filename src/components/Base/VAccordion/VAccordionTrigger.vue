<script setup lang="ts">
import {
  AccordionHeader,
  AccordionTrigger,
  type AccordionTriggerProps,
} from 'radix-vue';
import { computed } from 'vue';
import chevronDownIcon from 'UiKit/assets/images/chevron-down.svg';

const props = defineProps<AccordionTriggerProps>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      v-bind="delegatedProps"
      class="VAccordionTrigger v-accordion-trigger"
    >
      <slot />
      <slot name="icon">
        <component
          :is="chevronDownIcon"
          class="VAccordionChevron v-accordion-chevron"
        />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-accordion-chevron {
  width: 24px;
  color: inherit;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.v-accordion-trigger[data-state="open"] {
  background-color: #F2F1ED;
  transition: transform 0.3s ease;
}

.v-accordion-trigger[data-state="open"] > .v-accordion-chevron {
  transform: rotate(180deg);
}

.v-accordion-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 28px;
  text-align: inherit;

  &:hover{
    background-color: #F2F1ED;
    transition: transform 0.3s ease;
  }
}
</style>
