<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
} from 'vue';
import { useWindowScroll } from '@vueuse/core';
import VLogo from 'UiKit/components/VLogo.vue';
import VHeaderNavigation from './VHeaderNavigation.vue';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';
import ClientOnly from 'UiKit/components/ClientOnly.vue';
import type { VHeaderProps } from './types';

const { isDesktopMD } = storeToRefs(useBreakpoints());

const VHeaderMobile = defineAsyncComponent({
  loader: () => import('./VHeaderMobile.vue'),
});
const VMenuProfileLink = defineAsyncComponent({
  loader: () =>
    import('UiKit/components/VHeader/VMenuProfileLink.vue'),
});

const props = withDefaults(defineProps<VHeaderProps>(), {
  showNavigation: true,
  logoHref: '/',
  menu: undefined,
  isMobilePWA: false,
  showProfileLink: false,
  urlProfile: undefined,
  userLoggedIn: false,
  showMobileSidebar: true,
  variant: 'guest',
});

const emit = defineEmits<{
  click: [];
}>();

const { y } = useWindowScroll();
const isMobileSidebarOpen = defineModel<boolean>();
const isFixed = computed(() => y.value > 0);
const shouldShowProfileLink = computed(
  () => props.variant === 'authorized' && props.showProfileLink,
);
const shouldShowMobileSidebar = computed(
  () => !isDesktopMD.value && props.showMobileSidebar,
);
const headerClasses = computed(() => ({
  'is--fixed': isFixed.value,
  'is--pwa': props.isMobilePWA,
  [`is--variant-${props.variant}`]: true,
}));
const headerDataClasses = computed(() => ({
  'is--gte-desktop-md-show': props.showMobileSidebar,
}));
</script>

<template>
  <header
    class="VHeader v-header"
    :class="headerClasses"
    :data-variant="props.variant"
  >
    <div class="is--container v-header__container">
      <div class="v-header__left">
        <slot name="leading" />
        <slot name="logo">
          <VLogo
            :href="props.logoHref"
            :show-desktop="false"
            class="v-header__logo"
          />
        </slot>
      </div>

      <div class="v-header__right ">
        <VHeaderNavigation
          v-if="props.showNavigation"
          :menu="props.menu"
          class="is--gte-desktop-md-show"
          @click="emit('click')"
        />

        <ClientOnly>
          <div
            class="v-header__data"
            :class="headerDataClasses"
          >
            <slot />
          </div>

          <div
            v-if="props.isMobilePWA && $slots.pwa"
            class="v-header__data v-header__data--pwa"
          >
            <slot name="pwa" />
          </div>


          <VMenuProfileLink
            v-if="props.isMobilePWA && shouldShowProfileLink"
            :user-logged-in="props.userLoggedIn"
            :url-profile="props.urlProfile"
          />

          <VHeaderMobile
            v-if="shouldShowMobileSidebar"
            v-model="isMobileSidebarOpen"
            :menu="props.menu"
            :class="{ 'is--gt-desktop-md-hide': props.showMobileSidebar }"
          >
            <slot name="mobile" />
          </VHeaderMobile>
        </ClientOnly>
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

  &__left {
    display: flex;
    align-items: center;
    gap: 12px;
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

  &__data--pwa {
    gap: 8px;
  }

  &.is--variant-authorized {
    .v-header__data {
      gap: 16px;
    }
  }

  &.is--pwa {
    @media screen and (width <= 768px) {
      .v-header__container {
        position: relative;
      }

      .v-header__right {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        padding-right: 12px;
      }

      .v-header__logo {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin-right: 0;
      }
    }
  }
}
</style>
