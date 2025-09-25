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

const { isDesktopMD } = storeToRefs(useBreakpoints());

const VHeaderMobile = defineAsyncComponent({
  loader: () => import('./VHeaderMobile.vue'),
});

defineProps({
  showNavigation: {
    type: Boolean,
    default: true,
  },
  path: String,
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
    :class="{ 'is--fixed': isFixed }"
  >
    <div class="is--container v-header__container">
      <VLogo
        :href="logoHref"
        class="v-header__logo"
      />

      <div class="v-header__right ">
        <VHeaderNavigation
          v-if="showNavigation"
          :path="path"
          :menu="menu"
          class="is--gt-desktop-md-show"
          @click="emit('click')"
        />

        <ClientOnly>
          <div class="is--gt-desktop-md-show v-header__data">
            <slot />
          </div>

          <VHeaderMobile
            v-if="!isDesktopMD"
            v-model="isMobileSidebarOpen"
            :menu="menu"
            :is-mobile-p-w-a="isMobilePWA"
            class="is--lt-desktop-md-show"
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
