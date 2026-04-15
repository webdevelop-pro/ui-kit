<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import {
  AccordionHeader,
  AccordionTrigger,
  type AccordionTriggerProps,
} from 'reka-ui';

const props = defineProps</* @vue-ignore */ AccordionTriggerProps & {
  isWhite?: boolean;
}>();

const delegatedProps = reactiveOmit(props, 'isWhite');
</script>

<template>
  <AccordionHeader class="flex v-accordion-header">
    <AccordionTrigger
      v-bind="delegatedProps"
      class="VAccordionTrigger v-accordion-trigger"
      :class="{ 'is--white': props.isWhite }"
      itemprop="name"
    >
      <slot />
      <slot name="icon">
        <svg
          aria-hidden="true"
          class="VAccordionChevron v-accordion-chevron"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 17.909L12.9524 16.9566L21.0434 8.86557L22 7.90898L20.091 6L19.1386 6.95238L12 14.091L4.86136 6.95659L3.90898 6L2 7.90898L2.95238 8.86136L11.0434 16.9524L12 17.909Z"
            fill="currentColor"
          />
        </svg>
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-accordion-chevron {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
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
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;

  &:hover{
    background-color: colors.$gray-10;
    transition: transform 0.3s ease;
  }
}

.v-accordion-header {
  margin: 0 !important;
}
</style>
