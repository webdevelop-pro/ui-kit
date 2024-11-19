<script setup lang="ts">
import { defineAsyncComponent, hydrateOnVisible } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VSvgIcon = defineAsyncComponent({
  loader: () => import('UiKit/components/VSvgIcon/VSvgIcon.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});

const modelValue = defineModel<boolean>();
defineEmits(['update:modelValue']);
</script>

<template>
  <div
    class="AppMobileMenuBurger app-mobile-menu-burger"
    :class="{ 'is-close': modelValue }"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <div
      v-if="!modelValue"
      class="app-mobile-menu-burger__btn"
    >
      <VSvgIcon
        name="menu-mob"
        class="app-mobile-menu-burger__icon"
      />
    </div>
    <span v-if="modelValue">
      <VSvgIcon
        name="close"
        class="app-mobile-menu-burger__icon is-close"
      />
    </span>
  </div>
</template>

<style lang="scss">
$z-index-menu-bg: 99;
$z-index-menu: 999;
$z-index-menu-burger: $z-index-menu + 1;

.app-mobile-menu-burger {
  z-index: $z-index-menu-burger;
  color: $black;
  cursor: pointer;
  transition: color 0.3s;

  span {
    display: flex;
    align-items: center;
  }

  @include media-lt(tablet) {
    margin: 0 0 0 15px;
  }

  &__btn {
    position: relative;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  &.is-close {
    color: $black;
  }

  &__icon {
    width: 24px;
    height: 24px;
  }
}
</style>
