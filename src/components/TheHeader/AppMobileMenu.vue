<script setup lang="ts">
import {
  watch, onMounted, onUnmounted, onBeforeUnmount, ref, nextTick,
  defineAsyncComponent,
  hydrateOnVisible,
} from 'vue';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { blockedBody } from 'UiKit/helpers/blocked-body';
import { storeToRefs } from 'pinia';
import { MENU_HEADER_RIGHT } from '@/config/menu';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VButton = defineAsyncComponent({
  loader: () => import('UiKit/components/VButton/VButton.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const MenuNavigationItem = defineAsyncComponent({
  loader: () => import('UiKit/components/Menu/VMenuNavigationItem.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const useVhHeight = () => {
  const setHeight = () => {
    const mobileMenuHeight = window.innerHeight * 0.01;
    document.documentElement.style.setProperty(
      '--vh',
      `${mobileMenuHeight}px`,
    );
  };

  onMounted(() => {
    setHeight();
    window.addEventListener('resize', setHeight);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', setHeight);
  });

  return setHeight;
};

const useBlockedBody = (
  close: () => void,
) => {
  const { isDesktopMD } = storeToRefs(useBreakpoints());

  let unBlockedBody: (() => void) | null = null;

  watch([isDesktopMD], () => {
    close();
  });

  watch(() => props.modelValue, () => {
    unBlockedBody?.();
    unBlockedBody = null;

    if (props.modelValue) {
      unBlockedBody = blockedBody();
    }
  });

  onBeforeUnmount(() => {
    unBlockedBody?.();
    unBlockedBody = null;
  });
};


const close = () => emit('update:modelValue', false);

void useBlockedBody(close);
void useVhHeight();


const mobileMenuRef = ref<HTMLDivElement | null>(null);

watch(() => props.modelValue, (newVal) => {
  if (newVal && mobileMenuRef.value) {
    void nextTick(() => {
      mobileMenuRef.value!.scrollTop = 0;
    });
  }
});
</script>

<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <div
    class="AppMobileMenu wd-header-menu-bg"
    :class="{ 'is-active': modelValue }"
    @click="$emit('update:modelValue', false)"
  />

  <nav
    v-if="MENU_HEADER_RIGHT"
    ref="mobileMenuRef"
    class="wd-mobile-menu is--no-margin"
    :class="{ 'is-active': modelValue }"
  >
    <ul v-if="modelValue">
      <MenuNavigationItem
        v-for="menuItem in MENU_HEADER_RIGHT"
        :key="JSON.stringify(menuItem)"
        :item="menuItem"
      />
    </ul>
    <div class="wd-mobile-menu__button-wrap">
      <VButton
        tag="a"
        href="/get-started"
        block
        size="large"
        class="wd-mobile-menu__button is--no-margin"
      >
        Get Started
      </VButton>
    </div>
  </nav>
</template>

<style lang="scss">
$z-index-menu-bg: 9;
$z-index-menu: 10;
$z-index-menu-burger: $z-index-menu + 1;

.wd-header-menu-bg,
.wd-header-burger,
.wd-mobile-menu {
  @include media-gt(desktop-md) {
    display: none !important;
  }
}

.wd-header-menu-bg {
  position: fixed;
  top: $header-height;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $z-index-menu-bg;
  width: 100%;
  height: calc(100% - $header-height);
  visibility: hidden;
  background: rgba(0, 0, 0, 0.33);
  opacity: 0;
  transition: 0.3s;

  &.is-active {
    visibility: visible;
    opacity: 1;
  }
}

.wd-mobile-menu {
  $root: &;


  position: fixed;
  top: $header-height;
  right: 0;
  z-index: $z-index-menu;
  display: flex;
  flex-direction: column;
  max-width: 367px;
  width: 100%;
  height: calc(100% - $header-height);
  margin-right: 0;
  overflow-y: auto;
  background: $white;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  transform: translateX(110%);

  &.is-active {
    opacity: 1;
    transform: translateX(0);
  }

  ul {
    list-style: none;
    padding: 0;
  }

  &__button-wrap {
    padding: 20px;
    width: 100%;
    margin-top: 20px;
  }

  &__header-wrapper {
    padding-right: 21px;
    background: #152c76;
  }

  &__divider {
    width: 100%;
    margin-right: 15px;
    border-top: 2px solid #2244a8;
  }

  &__btn {
    & + & {
      margin-top: 18px;
    }
  }

  &__arrow {
    height: 15px;
  }
}

.wd-header-burger {
  margin-left: 19px;
}
</style>
