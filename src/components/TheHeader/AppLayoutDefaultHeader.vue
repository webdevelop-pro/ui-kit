<script setup lang="ts">
import {
  defineAsyncComponent, hydrateOnVisible, ref, watch,
} from 'vue';
import { useRoute } from 'vitepress';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VLogo = defineAsyncComponent({
  loader: () => import('UiKit/components/VLogo/VLogo.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VButton = defineAsyncComponent({
  loader: () => import('UiKit/components/VButton/VButton.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const AppLayoutDefaultHeaderNavigation = defineAsyncComponent({
  loader: () => import('./AppLayoutDefaultHeaderNavigation.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const AppMobileMenuBurger = defineAsyncComponent({
  loader: () => import('./AppMobileMenuBurger.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const AppMobileMenu = defineAsyncComponent({
  loader: () => import('./AppMobileMenu.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});

const isMobileMenuOpen = ref(false);
const route = useRoute();

watch(() => route.path, () => {
  isMobileMenuOpen.value = false;
});
</script>

<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <div class="AppLayoutDefaultHeader app-layout-default-header">
    <div class="app-layout-default-header__logo-wrap">
      <VLogo
        link="/"
        class="app-layout-default-header__logo"
      />
    </div>

    <div class="app-layout-default-header__right">
      <div class="app-layout-default-header__nav is--no-margin">
        <AppLayoutDefaultHeaderNavigation />

        <VButton
          tag="a"
          href="/get-started"
          class="app-layout-default-header__button"
        >
          Get Started
        </VButton>


        <AppMobileMenuBurger
          :model-value="isMobileMenuOpen"
          class="app-layout-default-header__burger"
          @update:model-value="isMobileMenuOpen = !isMobileMenuOpen"
        />
      </div>
    </div>
  </div>
  <AppMobileMenu
    v-model="isMobileMenuOpen"
  />
</template>

<style lang="scss">
.app-layout-default-header {
  position: relative;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin: 0 auto;
  height: 100%;

  @include media-lte(desktop-md) {
    z-index: 20;
    box-shadow: $box-shadow-small;
  }

  &__logo-wrap {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  &__logo {
    display: flex;
    align-items: center;
    max-width: 211px;
    margin-right: 55px;

    @include media-lte(desktop-lg) {
      max-width: 220px;
      margin-right: 30px;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    justify-content: end;
    flex: 1;
    height: 100%;
  }

  &__nav {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 28px;
  }

  &__button {
    flex-shrink: 0;
    @include media-lte(desktop-md) {
      display: none !important;
    }
  }

  &__burger {
    display: none;
    @include media-lte(desktop-md) {
      display: block;
    }
  }
}
</style>
