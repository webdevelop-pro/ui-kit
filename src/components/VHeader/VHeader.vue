<script setup lang="ts">
import {
  defineAsyncComponent, PropType, ref,
  watchPostEffect,
} from 'vue';
import { useWindowScroll } from '@vueuse/core';
import VLogo from 'UiKit/components/VLogo.vue';
import VHeaderNavigation, { MenuItem } from './VHeaderNavigation.vue';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';
import ClientOnly from 'UiKit/components/ClientOnly.vue';

const { isDesktopMD } = storeToRefs(useBreakpoints());

const VHeaderMobile = defineAsyncComponent({
  loader: () => import('./VHeaderMobile.vue'),
});
const VMenuProfileLink = defineAsyncComponent({
  loader: () =>
    import("UiKit/components/VHeader/VMenuProfileLink.vue"),
});

defineProps({
  showNavigation: {
    type: Boolean,
    default: true,
  },
  logoHref: {
    type: String,
    default: '/',
  },
  menu: {
    type: Array as PropType<MenuItem[]>,
  },
  isMobilePWA: {
    type: Boolean,
    default: false,
  },
  showProfileLink: {
    type: Boolean,
    default: false,
  },
  urlProfile: {
    type: [String, Function] as PropType<string | (() => string)>,
  },
  userLoggedIn: {
    type: Boolean,
    default: false,
  },
  showMobileSidebar: {
    type: Boolean,
    default: true,
  }
});

const emit = defineEmits(['click']);

const { y } = useWindowScroll();
const isFixed = ref(false);
const isMobileSidebarOpen = defineModel<boolean>();

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
    :class="{ 'is--fixed': isFixed, 'is--pwa': isMobilePWA }"
  >
    <div class="is--container v-header__container">
      <div class="v-header__left">
        <slot name="leading" />
        <slot name="logo">
          <VLogo
            :href="logoHref"
            :show-desktop="false"
            class="v-header__logo"
          />
        </slot>
      </div>

      <div class="v-header__right ">
        <VHeaderNavigation
          v-if="showNavigation"
          :menu="menu"
          class="is--gte-desktop-md-show"
          @click="emit('click')"
        />

        <ClientOnly>
          <div
            class="v-header__data"
            :class="{ 'is--gte-desktop-md-show': showMobileSidebar}"
          >
            <slot />
          </div>

          <div
            v-if="isMobilePWA && $slots.pwa"
            class="v-header__data v-header__data--pwa"
          >
            <slot name="pwa" />
          </div>


          <VMenuProfileLink 
            v-if="isMobilePWA && showProfileLink" 
            :user-logged-in="userLoggedIn"
            :url-profile="urlProfile"
          />

          <VHeaderMobile
            v-if="!isMobilePWA && !isDesktopMD && showMobileSidebar"
            v-model="isMobileSidebarOpen"
            :menu="menu"
            :class="{ 'is--gt-desktop-md-hide': showMobileSidebar }"
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
