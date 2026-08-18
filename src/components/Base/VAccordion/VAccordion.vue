<script setup lang="ts">
import {
  AccordionRoot,
  type AccordionRootEmits,
  type AccordionRootProps,
  useForwardPropsEmits,
} from 'reka-ui';

const props = defineProps</* @vue-ignore */ AccordionRootProps>();
const emits = defineEmits</* @vue-ignore */ AccordionRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AccordionRoot
    v-bind="forwarded"
    as="ul"
    class="VAccordion v-accordion"
  >
    <slot />
  </AccordionRoot>
</template>

<style lang="scss">
.v-accordion {
  width: 100%;
  padding-left: 0 !important;
}
</style>
