<script setup lang="ts">
import {
  AccordionHeader,
  AccordionTrigger,
  type AccordionTriggerProps,
} from 'radix-vue';
import { computed } from 'vue';
import chevronDownIcon from 'UiKit/assets/images/chevron-down.svg';

const props = defineProps<AccordionTriggerProps & {
  isWhite?: boolean;
}>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AccordionHeader class="flex v-accordion-header">
    <AccordionTrigger
      v-bind="delegatedProps"
      class="VAccordionTrigger v-accordion-trigger"
      :class="{ 'is--white': isWhite }"
      itemprop="name"
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
  width: 18px;
  color: inherit;
  transition: transform 0.3s ease;
}

.v-accordion-trigger[data-state="open"] {
  background-color: colors.$gray-10;
  transition: transform 0.3s ease;
  margin: 0;

  &.is--white {
    background-color: colors.$white;
    box-shadow: variables.$box-shadow-small;
    z-index: 1;
    position: relative;
  }
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
  padding: 16px;
  text-align: inherit;

  &:hover{
    background-color: colors.$gray-10;
    transition: transform 0.3s ease;
  }
}

.v-accordion-header {
  margin: 0 !important;
}
</style>
