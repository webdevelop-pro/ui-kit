<script setup lang="ts">
import {
  defineAsyncComponent, hydrateOnVisible, ref,
  watchPostEffect,
} from 'vue';
import { useWindowScroll } from '@vueuse/core';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VLogo = defineAsyncComponent({
  loader: () => import('UiKit/components/VLogo.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VHeaderNavigation = defineAsyncComponent({
  loader: () => import('./VHeaderNavigation.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VHeaderMobile = defineAsyncComponent({
  loader: () => import('./VHeaderMobile.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});

defineProps({
  showNavigation: {
    type: Boolean,
    default: true,
  },
});

const { y } = useWindowScroll();
const isFixed = ref(false);

watchPostEffect(() => {
  if (y.value > 0) {
    isFixed.value = true;
  } else {
    isFixed.value = false;
  }
});
</script>

<template>
  <header
    class="VHeader v-header"
    :class="{ 'is--fixed': isFixed }"
  >
    <div class="is--container v-header__container">
      <VLogo
        link="/"
        class="v-header__logo"
      />

      <div class="v-header__right ">
        <VHeaderNavigation
          v-if="showNavigation"
          class="is--gt-desktop-md-show"
        />

        <div class="is--gt-desktop-md-show v-header__data">
          <slot />
        </div>

        <VHeaderMobile class="is--lt-desktop-md-show">
          <slot name="mobile" />
        </VHeaderMobile>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.v-header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
  height: $header-height;
  &.is--fixed {
    background: $white;
    box-shadow: $box-shadow-small;
  }
  @include media-lte(desktop-md) {
    box-shadow: $box-shadow-small;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    position: relative;
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
    justify-content: flex-end;
    flex: 1;
    height: 100%;
    gap: 28px;
  }

  &__data {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }
}
</style>
