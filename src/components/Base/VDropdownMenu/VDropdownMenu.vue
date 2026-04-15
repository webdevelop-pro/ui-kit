<script setup lang="ts">
import {
  DropdownMenuRoot, type DropdownMenuRootEmits, type DropdownMenuRootProps, useForwardPropsEmits,
} from 'reka-ui';

const props = defineProps</* @vue-ignore */ DropdownMenuRootProps>();
const emits = defineEmits</* @vue-ignore */ DropdownMenuRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DropdownMenuRoot
    v-bind="forwarded"
    class="VDropdownMenu v-dropdown-menu"
  >
    <slot />
  </DropdownMenuRoot>
</template>
