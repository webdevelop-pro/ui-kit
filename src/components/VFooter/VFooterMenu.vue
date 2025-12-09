<script setup lang="ts">
import { PropType } from 'vue';

export type MenuItem = {
  to?: string;
  href?: string;
  active?: boolean;
  text: string;
  target?: string;
  children?: MenuItem[];
}

const emit = defineEmits(['click']);
defineProps({
  menu: {
    type: Array as PropType<MenuItem[]>,
  },
  isColumn: {
    type: Boolean,
    default: false,
  },
});

const getComponentName = (item: MenuItem) => {
  if (item.to) return 'router-link';
  if (item.href) return 'a';
  return 'div';
};
const getComponentClass = (item: MenuItem) => {
  if (item.to || item.href) return 'v-footer-menu__item  is--h6__title';
  return 'v-footer-menu__item-not-link is--small-2';
};
</script>

<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <nav
    v-if="menu"
    class="VFooterMenu v-footer-menu"
  >
    <ul
      class="v-footer-menu__menu-list"
      :class="{ 'is--row': !isColumn, 'is--column': isColumn }"
    >
      <li
        v-for="menuItem in menu"
        :key="menuItem.text"
        class="v-footer-menu__menu-item"
      >
        <component
          :is="getComponentName(menuItem)"
          :href="menuItem.href"
          :to="menuItem.to"
          :target="menuItem.target ? menuItem.target : '_self'"
          :class="[getComponentClass(menuItem), { 'is--active': menuItem.active }]"
          @click="emit('click')"
        >
          {{ menuItem.text }}
        </component>
        <div
          v-if="menuItem.children && menuItem.children.length > 0"
          class="v-footer-menu__children"
          :class="{ 'is--two-col': menuItem.children.length > 8 }"
        >
          <template
            v-for="childItem in menuItem.children"
            :key="childItem.text"
          >
            <component
              :is="getComponentName(childItem)"
              :href="childItem.href"
              :to="childItem.to"
              :target="childItem.target ? childItem.target : '_self'"
              :class="[getComponentClass(childItem), { 'is--active': childItem.active }]"
              @click="emit('click')"
            >
              {{ childItem.text }}
            </component>
          </template>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.v-footer-menu {
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
    text-transform: uppercase;
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
    flex-flow: column wrap;
    gap: 0 80px;

    @include media-lte(tablet) {
      gap: 0;
    }

    // &.is--two-col {
    //   @include media-gte(mobile) {
    //     display: grid;
    //     grid-template-columns: repeat(2, minmax(0, 1fr));
    //   }
    // }

    #{$root}__item {
      padding: 8px 0;
    }
  }

  &__menu-list {
    display: flex;
    list-style-type: none;

    &.is--row {
      gap: 48px;

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

    &.is--column {
      flex-direction: column;
      gap: 16px;

      @include media-lte(tablet) {
        padding-left: 0;
      }
    }
  }
}
</style>
