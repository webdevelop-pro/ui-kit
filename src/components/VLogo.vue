<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  disabled: Boolean,
  href: String,
  routeName: String,
  white: Boolean,
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
    <!-- <component
      :is="icon"
      class="v-logo__desktop"
    />
    <component
      :is="icon"
      class="v-logo__mobile"
    /> -->
    <img
      src="/logo.webp"
      class="v-logo__desktop"
      alt="Logo"
    >
  </component>
</template>

<style lang="scss">
.v-logo {
  color: inherit;
  // height: 100%;

  &.is--link {
    cursor: pointer;
  }

  &__desktop {
    // height: 100%;
    color: inherit;
    width: auto;
    max-width: 100%;
    max-height: 100%;
    // @media screen and (width < 1024px) {
    //   display: none;
    // }
  }

  &__mobile {
    display: none;
    height: auto;
    color: inherit;

    @media screen and (width > 1024px) {
      display: none;
    }
  }
}
</style>
