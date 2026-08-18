<script setup lang="ts">
import { defineAsyncComponent, hydrateOnVisible, PropType } from 'vue';
import { useData } from 'vitepress';
import { socials } from 'UiKit/utils/socials';
import { MenuItem } from './VFooterMenu.vue';
import VLogo from 'UiKit/components/VLogo.vue';

const VSocialLinks = defineAsyncComponent({
  loader: () => import('UiKit/components/VSocialLinks/VSocialLinks.vue'),
  hydrate: hydrateOnVisible(),
});

const VFooterMenu = defineAsyncComponent({
  loader: () => import('./VFooterMenu.vue'),
  hydrate: hydrateOnVisible(),
});

const VFooterBottom = defineAsyncComponent({
  loader: () => import('UiKit/components/VFooter/VFooterBottom.vue'),
  hydrate: hydrateOnVisible(),
});

defineProps({
  menu: Array as PropType<MenuItem[]>,
  menuLegal: Array as PropType<MenuItem[]>,
  isColumnMenu: {
    type: Boolean,
    default: false,
  },
  logoHref: {
    type: String,
    default: '/',
  },
});

const { theme } = useData();

const SOCIAL_LIST = [
  socials?.facebook, socials?.instagram,
  socials?.linkedin, socials?.github,
];
</script>

<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <div class="VFooterLogo v-footer-logo">
    <div class="is--container">
      <div class="v-footer-logo__wrap">
        <div class="v-footer-logo__form-wrap">
          <VLogo
            :href="logoHref"
            class="v-footer-logo__logo"
          />

          <div
            class="v-footer-logo__contact"
          >
            <div>
              {{ theme.contacts.phone }}
            </div>
            <div>
              {{ theme.contacts.email }}
            </div>
          </div>
          <VSocialLinks
            :social-list="SOCIAL_LIST"
          />
        </div>
        <VFooterMenu
          class="v-footer-logo__menu"
          :menu="menu"
          :is-column="isColumnMenu"
        />
      </div>
    </div>
  </div>
  <VFooterBottom
    :items="menuLegal"
  />
</template>

<style lang="scss">
.v-footer-logo {
  $root: &;

  background-color: $black;
  padding: 48px 0;
  color: $white;

  @include media-lte(desktop-lg) {
    padding-bottom: 5px;
    padding-top: 50px;
  }

  &__wrap {
    display: flex;
    gap: 80px;

    @include media-lte(desktop-lg) {
      gap: 40px;
    }

    @include media-lte(desktop) {
      max-width: 100%;
      margin: 0 auto;
      flex-wrap: wrap;
    }
  }

  &__form-wrap {
    width: 35%;

    @include media-lte(desktop) {
      width: 100%;
    }
  }

  &__form {
    margin-bottom: 32px;
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 40px 0 30px;
  }

  &__menu {
    @include media-lte(desktop) {
      width: 100%;
    }
  }
}
</style>
