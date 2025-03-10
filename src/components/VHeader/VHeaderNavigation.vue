<script setup lang="ts">
import { MENU_HEADER_RIGHT } from '@/config/menu';
import { defineAsyncComponent, hydrateOnVisible, ref } from 'vue';
import VHeaderNavigationListItem from './VHeaderNavigationListItem.vue';

const VNavigationMenu = defineAsyncComponent({
  loader: () => import('UiKit/components/Base/VNavigationMenu/VNavigationMenu.vue'),

  hydrate: hydrateOnVisible(),
});

const VNavigationMenuList = defineAsyncComponent({
  loader: () => import('UiKit/components/Base/VNavigationMenu/VNavigationMenuList.vue'),

  hydrate: hydrateOnVisible(),
});

const VNavigationMenuItem = defineAsyncComponent({
  loader: () => import('UiKit/components/Base/VNavigationMenu/VNavigationMenuItem.vue'),

  hydrate: hydrateOnVisible(),
});

const VNavigationMenuTrigger = defineAsyncComponent({
  loader: () => import('UiKit/components/Base/VNavigationMenu/VNavigationMenuTrigger.vue'),

  hydrate: hydrateOnVisible(),
});

const VNavigationMenuContent = defineAsyncComponent({
  loader: () => import('UiKit/components/Base/VNavigationMenu/VNavigationMenuContent.vue'),

  hydrate: hydrateOnVisible(),
});

const VNavigationMenuLink = defineAsyncComponent({
  loader: () => import('UiKit/components/Base/VNavigationMenu/VNavigationMenuLink.vue'),

  hydrate: hydrateOnVisible(),
});

const VHeaderNavigationCardDark = defineAsyncComponent({
  loader: () => import('./VHeaderNavigationCardDark.vue'),

  hydrate: hydrateOnVisible(),
});

const currentTrigger = ref('');

defineProps({
  path: String,
});

const emit = defineEmits(['click']);
</script>

<template>
  <VNavigationMenu
    v-if="MENU_HEADER_RIGHT"
    v-model="currentTrigger"
    class="VHeaderNavigation v-header-navigation"
  >
    <VNavigationMenuList class="v-header-navigation__list">
      <VNavigationMenuItem
        v-for="(menuItem, index) in MENU_HEADER_RIGHT"
        :id="index"
        :key="JSON.stringify(menuItem)"
      >
        <VNavigationMenuLink
          v-if="!menuItem.children"
          :href="menuItem.href"
          :class="{ 'router-link-active': path?.includes(menuItem.href) }"
          @click.stop="emit('click')"
        >
          {{ menuItem.text }}
        </VNavigationMenuLink>
        <div v-else>
          <VNavigationMenuTrigger>
            {{ menuItem.text }}
          </VNavigationMenuTrigger>
          <VNavigationMenuContent>
            <div class="v-header-navigation__wrap">
              <div class="v-header-navigation__dropdown-left">
                <ul
                  v-for="(childGroup, childGroupIndex) in menuItem.children"
                  :key="childGroupIndex"
                >
                  <VHeaderNavigationListItem
                    v-for="(childItem, childIndex) in childGroup"
                    :key="childIndex"
                    :data="childItem"
                    :path="path"
                    @click="currentTrigger = ''; emit('click');"
                  />
                </ul>
              </div>
              <VHeaderNavigationCardDark
                v-if="menuItem?.card"
                :data="menuItem?.card"
              />
            </div>
          </VNavigationMenuContent>
        </div>
      </VNavigationMenuItem>
    </VNavigationMenuList>
  </VNavigationMenu>
</template>

<style lang="scss">
@use 'UiKit/styles/_variables.scss' as variables;
@use 'UiKit/styles/_colors.scss' as colors;
.v-header-navigation {
  $root: &;

  &__wrap {
    display: flex;
    justify-content: space-between;
  }

  &__dropdown-left {
    display: flex;
    padding: 20px 16px;
    align-items: flex-start;
    gap: 24px;
    @media screen and (max-width: variables.$desktop-lg) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px 24px;
    }
    @media screen and (max-width: variables.$desktop-md){
      grid-template-columns: repeat(1, 1fr);
      padding: 19px;
      gap: 9px;
    }
  }

  ul {
    list-style: none;
    padding: 0;
  }
}
</style>
