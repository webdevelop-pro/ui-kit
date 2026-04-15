<script setup lang="ts">
import {
  DropdownMenuSubTrigger,
  type DropdownMenuSubTriggerProps,
  useForwardProps,
} from 'reka-ui';
import ChevronRight from 'UiKit/assets/images/chevron-right.svg?component';
import { type HTMLAttributes } from 'vue';

const props = defineProps</* @vue-ignore */ DropdownMenuSubTriggerProps & { class?: HTMLAttributes['class'] }>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="forwardedProps"
    class="VDropdownMenuSubTrigger v-dropdown-menu-sub-trigger is--h6__title"
  >
    <slot />
    <ChevronRight
      class="v-dropdown-menu-sub-trigger__icon"
      aria-hidden="true"
    />
  </DropdownMenuSubTrigger>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-dropdown-menu-sub-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  color: inherit;
  text-decoration: none;

  &__icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: colors.$gray-60;
  }
}
</style>
