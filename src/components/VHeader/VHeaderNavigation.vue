<script setup lang="ts">
import { defineAsyncComponent, hydrateOnVisible, PropType, ref } from 'vue';
import type { Component } from 'vue';
import VHeaderNavigationListItem from './VHeaderNavigationListItem.vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';

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

export type MenuItem = {
  to?: string;
  href?: string;
  active?: boolean;
  text: string;
  children?: MenuItem[];
  icon?: Component;
  class?: string;
  card?: unknown;
  button?: {
    text: string;
    href?: string;
  };
}

const currentTrigger = ref('');

defineProps({
  menu: {
    type: Array as PropType<MenuItem[]>,
  },
});

const emit = defineEmits(['click']);
</script>

<template>
  <VNavigationMenu
    v-if="menu"
    v-model="currentTrigger"
    class="VHeaderNavigation v-header-navigation"
  >
    <VNavigationMenuList class="v-header-navigation__list">
      <VNavigationMenuItem
        v-for="(menuItem, index) in menu"
        :id="index"
        :key="JSON.stringify(menuItem)"
      >
        <VNavigationMenuLink
          v-if="!menuItem.children"
          :href="menuItem.href"
          :class="[
            'v-header-navigation__link',
            { 'is--active': menuItem.active },
          ]"
          @click.stop="emit('click')"
        >
          <component
            :is="menuItem.icon"
            v-if="menuItem.icon"
            class="v-header-navigation__icon"
            aria-hidden="true"
          />
          <span class="v-header-navigation__label">
            {{ menuItem.text }}
          </span>
        </VNavigationMenuLink>
        <div v-else>
          <VNavigationMenuTrigger class="v-header-navigation__trigger">
            <component
              :is="menuItem.icon"
              v-if="menuItem.icon"
              class="v-header-navigation__icon"
              aria-hidden="true"
            />
            <span class="v-header-navigation__label">
              {{ menuItem.text }}
            </span>
          </VNavigationMenuTrigger>
          <VNavigationMenuContent>
            <div class="v-header-navigation__wrap">
              <div class="v-header-navigation__dropdown-left">
                <div class="v-header-navigation__dropdown-list">
                  <ul
                    v-for="(childGroup, childGroupIndex) in menuItem.children"
                    :key="childGroupIndex"
                  >
                    <VHeaderNavigationListItem
                      v-for="(childItem, childIndex) in childGroup"
                      :key="childIndex"
                      :data="childItem"
                      @click="currentTrigger = ''; emit('click');"
                    />
                  </ul>
                </div>
                <VButton
                  v-if="menuItem?.button"
                  as="a"
                  :href="menuItem?.button.href"
                  variant="link"
                  size="small"
                  class="v-header-navigation__cta"
                >
                  {{ menuItem?.button.text }}
                </VButton>
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

  &__link,
  &__trigger {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: inherit;
  }

  &__trigger {
    cursor: pointer;
  }

  &__icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    display: none;
    color: colors.$gray-50;

    path{
      fill: currentcolor;
    }

    path[stroke] {
      stroke: currentcolor;
    }
  }

  &__label {
    display: inline-flex;
    align-items: center;
  }

  &__wrap {
    display: flex;
    justify-content: space-between;
  }

  &__dropdown-list {
    display: flex;
    align-items: flex-start;
    gap: 24px;

    @media screen and (max-width: variables.$desktop-lg) {
      display: flex;
      flex-wrap: wrap;
      gap: 20px 24px;
      max-height: calc(100vh - variables.$header-height - 100px);
      overflow-y: auto;
    }

    @media screen and (max-width: variables.$desktop-md){
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      padding: 19px;
      gap: 9px;
    }
  }

  &__dropdown-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 16px 28px;
    gap: 16px;
  }

  &__cta {
    align-self: center;
  }

  ul {
    list-style: none;
    padding: 0;
  }
}
</style>
