<script setup lang="ts">
import { MENU_HEADER_RIGHT } from '@/config/menu';
import { defineAsyncComponent, hydrateOnVisible, ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const MenuNavigationItem = defineAsyncComponent({
  loader: () => import('UiKit/components/Menu/VMenuNavigationItem.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});

const close = ref(false);
const id = ref(-1);
const closeDropdown = () => {
  close.value = true;
};
const onOpen = (idLocal: number) => {
  id.value = idLocal;
  closeDropdown();
};
const onClosed = () => {
  id.value = -1;
  close.value = false;
};
</script>

<template>
  <nav
    v-if="MENU_HEADER_RIGHT"
    aria-labelledby="main-nav-aria-label"
    class="AppLayoutDefaultHeaderNavigation app-layout-default-header-navigation"
    @mouseleave="closeDropdown"
  >
    <ul class="app-layout-default-header-navigation__list">
      <MenuNavigationItem
        v-for="(menuItem, index) in MENU_HEADER_RIGHT"
        :id="index"
        :key="JSON.stringify(menuItem)"
        :item="menuItem"
        :close-dropdown="(index !== id) ? close : false"
        @open="onOpen"
        @closed="onClosed"
      />
    </ul>
  </nav>
</template>

<style lang="scss">
.app-layout-default-header-navigation {
  $root: &;

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 28px;
  @include media-lte(desktop-md) {
    display: none !important;
  }

  &__list {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 28px;
    height: 100%;
  }
}
</style>
