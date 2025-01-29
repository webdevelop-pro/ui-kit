<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'radix-vue';
import { ComboboxRoot, useForwardPropsEmits } from 'radix-vue';

const props = defineProps<ComboboxRootProps>();
const emits = defineEmits<ComboboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxRoot
    v-bind="forwarded"
    class="VCombobox v-combobox"
  >
    <slot />
  </ComboboxRoot>
</template>

<style lang="scss">
.v-combobox {
  position: relative;
}
</style>
