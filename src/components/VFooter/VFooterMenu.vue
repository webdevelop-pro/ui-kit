<script setup lang="ts">
import { useRoute } from 'vitepress';
import { MENU_FOOTER } from '@/config/menu';

const route = useRoute();

const getActive = (name: string) => {
  if (route.path.includes(name)) {
    return 'is--active';
  }
  return '';
};
</script>

<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <nav
    v-if="MENU_FOOTER"
    class="AppLayoutDefaultFooterMenu app-layout-default-footer-menu"
  >
    <ul class="app-layout-default-footer-menu__menu-list">
      <li
        v-for="menuItem in MENU_FOOTER"
        :key="menuItem.text"
        class="app-layout-default-footer-menu__menu-item"
      >
        <a
          v-if="menuItem.link"
          :href="menuItem.link"
          :class="[getActive(menuItem.link)]"
          class="app-layout-default-footer-menu__item is--h6__title"
        >
          {{ menuItem.text }}
        </a>
        <div
          v-if="!menuItem.link"
          class="app-layout-default-footer-menu__item-not-link is--h5__title"
        >
          {{ menuItem.text }}
        </div>
        <div
          v-if="menuItem.children && menuItem.children.length > 0"
          class="app-layout-default-footer-menu__children"
          :class="{ 'is--two-col': menuItem.children.length > 8 }"
        >
          <template
            v-for="childItem in menuItem.children"
            :key="childItem.text"
          >
            <a
              v-if="childItem.link"
              :href="childItem.link"
              :class="[getActive(childItem.link)]"
              class="app-layout-default-footer-menu__item is--h6__title"
            >
              {{ childItem.text }}
            </a>
          </template>
        </div>
      </li>
    </ul>
  </nav>
</template>


<style lang="scss">
.app-layout-default-footer-menu {
  $root: &;

  ul {
    padding: 0;
  }

  &__menu-item {
    gap: 10px;
    display: flex;
    flex-direction: column;
  }
  &__item-not-link {
    color: $gray-60;
  }
  &__item {
    white-space: nowrap;
    text-decoration: none !important;
    color: $white !important;
    &:hover {
      color: $primary !important;
    }
    &.is--active,
    &.router-link-active {
      color: $primary !important;
    }
  }
  &__children {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 0 40px;
    @include media-lte(tablet) {
      gap: 0;
    }

    &.is--two-col {
      @include media-gte(mobile) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    #{$root}__item {
      padding: 8px 0;
    }
  }
  &__menu-list {
    display: flex;
    gap: 48px;
    list-style-type: none;
    @include media-lte(desktop-lg) {
      gap: 24px;
    }
    @include media-lte(desktop) {
      gap: 24px;
      flex-direction: column;
    }
    @include media-lte(tablet) {
      flex-direction: column;
      gap: 24px;
    }
  }
}
</style>
