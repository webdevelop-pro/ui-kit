<script setup lang="ts">
import {
  defineAsyncComponent,
  hydrateOnVisible,
  PropType,
} from "vue";
import {
  VSheet,
  VSheetContent,
  VSheetTrigger,
  VSheetHeader,
  VSheetTitle,
  VSheetDescription,
} from "../Base/VSheet";
import VMenuBurger from "UiKit/components/VHeader/VMenuBurger.vue";
import VMenuProfileLink from "UiKit/components/VHeader/VMenuProfileLink.vue";
import VHeaderNavigationListItem from "./VHeaderNavigationListItem.vue";
import { VisuallyHidden } from "radix-vue";
import { MenuItem } from './VHeaderNavigation.vue';

defineProps({
  menu: {
    type: Array as PropType<MenuItem[]>,
  },
  isMobilePWA: {
    type: Boolean,
    default: false,
  },
});

const VNavigationMenuLink = defineAsyncComponent({
  loader: () =>
    import("UiKit/components/Base/VNavigationMenu/VNavigationMenuLink.vue"),
  hydrate: hydrateOnVisible(),
});
const open = defineModel<boolean>();
</script>

<template>
  <VMenuProfileLink 
    v-if="isMobilePWA" 
  />
  <VSheet
    v-else-if="!isMobilePWA"
    v-model:open="open"
    class="VHeaderMobile v-header-mobile"
  >
    <VSheetTrigger
      v-bind="{ ...$attrs }"
      :aria-label="open ? 'Close mobile menu' : 'Open mobile menu'"
    >
      <VMenuBurger :model-value="open" />
    </VSheetTrigger>
    <VSheetContent
      with-header
      hide-close
    >
      <VisuallyHidden>
        <VSheetHeader>
          <VSheetTitle>Mobile Menu</VSheetTitle>
          <VSheetDescription>Mobile Menu</VSheetDescription>
        </VSheetHeader>
      </VisuallyHidden>
      <nav class="v-header-mobile__navigation">
        <ul
          v-for="(menuItem, index) in menu"
          :id="String(index)"
          :key="JSON.stringify(menuItem)"
          class="v-header-mobile__list"
        >
          <li class="v-header-mobile__item">
            <VNavigationMenuLink
              v-if="!menuItem.children"
              :href="menuItem.href"
              @click="open = false"
            >
              {{ menuItem.text }}
            </VNavigationMenuLink>
            <span
              v-else
              class="is--h5__title v-header-mobile__title"
            >
              {{ menuItem.text }}
            </span>
            <ul
              v-for="(childGroup, childGroupIndex) in menuItem.children"
              :key="childGroupIndex"
              class="v-header-mobile__list"
            >
              <VHeaderNavigationListItem
                v-for="(childItem, childIndex) in childGroup"
                :key="childIndex"
                :data="childItem"
                @click="open = false"
              />
            </ul>
          </li>
        </ul>
      </nav>

      <div class="v-header-mobile__data">
        <slot />
      </div>
    </VSheetContent>
  </VSheet>
</template>

<style lang="scss">
@use "UiKit/styles/_colors.scss" as colors;
.v-header-mobile {
  &__item {
    height: auto;
    width: 100%;
    padding: 20px 0 0 20px;
    gap: 9px;
    display: flex;
    flex-direction: column;
  }
  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  &__navigation > &__list + &__list {
    border-top: 1px solid colors.$gray-40;
    margin-top: 20px;
  }
  &__title + &__list {
    margin: 10px 0 0;
  }
  &__data {
    border-top: 1px solid colors.$gray-40;
    padding: 20px;
    width: 100%;
    margin-top: 20px;
  }
}
</style>
