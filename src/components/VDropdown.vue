<script setup lang="ts">
import {
  type DropdownMenuContentProps,
} from 'radix-vue';
import {
  VDropdownMenu, VDropdownMenuTrigger, VDropdownMenuContent, VDropdownMenuItem,
} from 'UiKit/components/Base/VDropdownMenu';
import type { Component } from 'vue';
import { PropType, ref } from 'vue';

export interface IDropdown {
  to?: string;
  href?: string;
  text: string;
  active?: boolean;
  class?: string;
  icon?: Component;
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
          <component
            :is="menuItem.icon"
            v-if="menuItem.icon"
            class="v-dropdown__icon"
            aria-hidden="true"
          />
          <span class="v-dropdown__label">
            {{ menuItem.text }}
          </span>
        </component>
      </VDropdownMenuItem>
      <slot name="content" />
    </VDropdownMenuContent>
  </VDropdownMenu>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-dropdown {
  &__item {
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: inherit;
    text-decoration: none;

    .v-dropdown-menu-item.is--border-top & {
      border-top: 1px solid colors.$gray-30;
      margin-top: 8px;
      padding-top: 16px;
      padding-bottom: 12px;
    }
  }

  &__icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: colors.$gray-50;

    path{
      fill: currentcolor;
    }

    path[stroke] {
      stroke: currentcolor;
    }
  }

  &__label {
    flex: 1;
  }
}
</style>
