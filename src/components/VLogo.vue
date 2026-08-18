<script setup lang="ts">
import { computed } from 'vue';
import TorqueLogo from 'UiKit/assets/images/logo.svg';
import TorqueWordmark from 'UiKit/assets/images/wordmark.svg';

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
    <span
      class="v-logo__desktop"
      :class="{ 'is--show-desktop': showDesktop }"
    >
      <component
        :is="TorqueLogo"
        class="v-logo__mark"
        aria-hidden="true"
        focusable="false"
      />
      <component
        :is="TorqueWordmark"
        class="v-logo__wordmark"
        aria-hidden="true"
        focusable="false"
      />
    </span>
    <component
      :is="TorqueLogo"
      class="v-logo__mobile"
      :class="{ 'is--show-desktop': showDesktop }"
      aria-hidden="true"
      focusable="false"
    />
  </component>
</template>

<style lang="scss">
.v-logo {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: inherit;
  text-decoration: none;

  &.is--link {
    cursor: pointer;
  }

  &__desktop {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 36px;

    &:not(.is--show-desktop) {
      @media screen and (width <= 1024px) {
        display: none;
      }
    }
  }

  &__mark {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
  }

  &__wordmark {
    width: auto;
    height: 22px;
    flex-shrink: 0;
  }

  &__mobile {
    width: 36px;
    height: 36px;

    &.is--show-desktop {
      display: none;
    }

    @media screen and (width > 1024px) {
      display: none;
    }
  }

  &__mark,
  &__wordmark,
  &__mobile {
    [fill="#FFFFFF"],
    [fill="#F5F5F5"],
    [fill="black"] {
      fill: currentcolor;
    }
  }
}
</style>
