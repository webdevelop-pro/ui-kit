<script setup lang="ts">
import { computed } from 'vue';
import logoIcon from 'UiKit/assets/images/logo.svg';
import logoMobIcon from 'UiKit/assets/images/logo-mob.svg';

const props = defineProps({
  disabled: Boolean,
  href: String,
  routeName: String,
  showDesktop: {
    type: Boolean,
    default: true,
  },
});

const componentName = computed(() => {
  if (props.href) return 'a';
  if (props.routeName) return 'router-link';
  return 'span';
});
</script>

<template>
  <component
    :is="componentName"
    class="VLogo v-logo"
    :href="href"
    :to="{ name: routeName }"
    aria-label="Site logo"
    :class="{ 'is--link': href || routeName }"
  >
    <component
      :is="logoIcon"
      class="v-logo__desktop"
      :class="{ 'is--show-desktop': showDesktop }"
    />
    <component
      :is="logoMobIcon"
      class="v-logo__mobile"
      :class="{ 'is--show-desktop': showDesktop }"
    />
  </component>
</template>

<style lang="scss">
.v-logo {
  flex-shrink: 0;
  color: inherit;

  &.is--link {
    cursor: pointer;
  }

  &__desktop {
    width: 111px;
    max-width: 111px;
    height: 37px;

    &:not(.is--show-desktop) {
      @media screen and (width <= 1024px) {
        display: none;
      }
    }
  }

  &__mobile {
    width: 47px;
    height: auto;

    &.is--show-desktop {
      display: none;
    }

    @media screen and (width >= 1024px) {
      display: none;
    }
  }
}
</style>
