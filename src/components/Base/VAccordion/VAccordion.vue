<script setup lang="ts">
import {
  AccordionRoot,
  type AccordionRootEmits,
  type AccordionRootProps,
  useForwardPropsEmits,
} from 'radix-vue';

const props = defineProps<AccordionRootProps>();
const emits = defineEmits<AccordionRootEmits>();

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
  padding-left: 0;
}
</style>