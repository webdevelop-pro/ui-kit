<script setup lang="ts">
import {
  type DropdownMenuContentProps,
} from 'radix-vue';
import {
  VDropdownMenu, VDropdownMenuTrigger, VDropdownMenuContent, VDropdownMenuItem,
} from 'UiKit/components/Base/VDropdownMenu';
import { PropType, ref } from 'vue';

export interface IDropdown {
    to?: string;
    href?: string;
    text: string;
    active?: boolean;
    class?: string;
}

defineProps({
  menu: Array as PropType<IDropdown[]>,
  withChevron: Boolean,
  contentProps: Object as PropType<DropdownMenuContentProps>,
});

const getComponentName = (item: IDropdown) => {
  if (item.to) return 'router-link';
  if (item.href) return 'a';
  return 'div';
};

const getComponentProps = (item: IDropdown) => {
  if (item.to) return { to: item.to };
  if (item.href) return { href: encodeURI(item.href) };
  return {};
};

const toggleState = ref(false);
</script>

<template>
  <VDropdownMenu
    v-model:open="toggleState"
    class="VDropdown v-dropdown"
  >
    <VDropdownMenuTrigger
      :with-chevron="withChevron"
    >
      <slot />
    </VDropdownMenuTrigger>

    <VDropdownMenuContent
      v-bind="contentProps"
    >
      <VDropdownMenuItem
        v-for="menuItem in menu"
        :key="menuItem.text"
        :class="menuItem.class"
      >
        <component
          :is="getComponentName(menuItem)"
          v-bind="getComponentProps(menuItem)"
          class="v-dropdown__item"
          :class="{ 'is--active': menuItem.active }"
        >
          {{ menuItem.text }}
        </component>
      </VDropdownMenuItem>
      <slot name="content" />
    </VDropdownMenuContent>
  </VDropdownMenu>
</template>

<style lang="scss">
.v-dropdown {
  &__item {
    padding: 8px 12px;
    display: block;
  }
}
</style>
