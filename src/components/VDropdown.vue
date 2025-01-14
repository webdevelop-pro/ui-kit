<script setup lang="ts">
import {
  VDropdownMenu, VDropdownMenuTrigger, VDropdownMenuContent, VDropdownMenuItem,
} from 'UiKit/components/Base/VDropdownMenu';
import { PropType } from 'vue';


export interface IDropdown {
    to?: string;
    href?: string;
    text: string;
    active?: boolean;
}


defineProps({
  menu: Array as PropType<IDropdown[]>,
  withChevron: Boolean,
});


const getComponentName = (item: IDropdown) => {
  if (item.to) return 'router-link';
  if (item.href) return 'a';
  return 'div';
};
</script>


<template>
  <VDropdownMenu class="VDropdown v-dropdown">
    <VDropdownMenuTrigger
      :with-chevron="withChevron"
    >
      <slot />
    </VDropdownMenuTrigger>

    <VDropdownMenuContent>
      <VDropdownMenuItem
        v-for="menuItem in menu"
        :key="menuItem.text"
      >
        <component
          :is="getComponentName(menuItem)"
          :href="encodeURI(menuItem.href)"
          :to="menuItem.to"
          class="is--h6__title"
        >
          {{ menuItem.text }}
        </component>
      </VDropdownMenuItem>
    </VDropdownMenuContent>
  </VDropdownMenu>
</template>
