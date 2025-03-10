<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from 'radix-vue';
import ChevronDown from 'UiKit/assets/images/chevron-down.svg?component';

const props = defineProps<DropdownMenuTriggerProps & {
  withChevron: boolean;
}>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuTrigger
    class="VDropdownMenuTrigger v-dropdown-menu-trigger"
    v-bind="forwardedProps"
  >
    <slot />
    <component
      :is="ChevronDown"
      v-if="withChevron"
      class="v-dropdown-menu-trigger__icon"
    />
  </DropdownMenuTrigger>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-dropdown-menu-trigger {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: fit-content;

  &__icon {
    width: 14px;
    color: colors.$gray-70;
    transition: all 0.3s;
    transform-origin: center;
    transform: rotate(0);
    margin-left: 9px;
    margin-top: 0 !important;
  }
}

.v-dropdown-menu-trigger[data-state="open"] {
  .v-dropdown-menu-trigger__icon{
    transform: rotate(180deg);
    transition: all 0.3s;
  }
}
</style>
