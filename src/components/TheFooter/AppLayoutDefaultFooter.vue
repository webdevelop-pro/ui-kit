<script setup lang="ts">
import { defineAsyncComponent, hydrateOnVisible, ref } from 'vue';
import { useHubspotForm } from 'UiKit/composables/useHubspotForm';
import { env } from '@/config/env';
import { notify } from '@kyvg/vue3-notification';
import { useData } from 'vitepress';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VSocialLinks = defineAsyncComponent({
  loader: () => import('UiKit/components/VSocialLinks/VSocialLinks.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const FooterSubscribeForm = defineAsyncComponent({
  loader: () => import('UiKit/components/Forms/VFormFooterSubscribe.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const AppLayoutDefaultFooterMenu = defineAsyncComponent({
  loader: () => import('./AppLayoutDefaultFooterMenu.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});

const { theme } = useData();

const SOCIAL_LIST = [
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  theme.value?.socials?.facebook, theme.value?.socials?.instagram,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  theme.value?.socials?.linkedin, theme.value?.socials?.github,
];

const NOTIFY_OPTIONS = {
  text: 'Submitted!',
  type: 'success',
  data: {
    status: 1,
  },
  group: 'transaction',
  duration: 10000,
};


const currentYear = new Date().getFullYear();

const loadingSubmitting = ref(false);
const onSubmit = async (emailLocal: string) => {
  loadingSubmitting.value = true;
  const { submitFormToHubspot } = useHubspotForm(env.HUBSPOT_FORM_ID_RECEIVE_LATEST_NEWS);
  await submitFormToHubspot({
    email: emailLocal,
  });
  loadingSubmitting.value = false;
  notify(NOTIFY_OPTIONS);
};
</script>

<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <div class="AppLayoutDefaultFooter footer-top is--no-margin">
    <div class="is--container">
      <div class="footer-top__wrap">
        <div class="footer-top__form-wrap">
          <FooterSubscribeForm
            :loading="loadingSubmitting"
            class="footer-top__form"
            @submit="onSubmit"
          />

          <div
            class="footer-top__contact"
          >
            <div>
              {{ theme.contacts.phone }}
            </div>
            <div>
              {{ theme.contacts.email }}
            </div>
          </div>
          <div class="social-links desktop-social">
            <VSocialLinks
              :social-list="SOCIAL_LIST"
              class="wd-layout-default-footer__socials"
            />
          </div>
        </div>
        <AppLayoutDefaultFooterMenu class="footer-top__menu" />
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="is--container">
      <p class="is--small">
        © {{ currentYear }} Webdevelop PRO, Inc.
      </p>
    </div>
  </div>
</template>


<style lang="scss">
.footer-top {
  $root: &;

  background-color: $black;
  padding: 48px 0;
  color: $white;

  @include media-lte(desktop-lg) {
    padding-bottom: 5px;
    padding-top: 50px;
  }
  @include media-lte(tablet) {
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
      gap: 40px;
      margin: 0 auto;
      flex-wrap: wrap;
    }
    @include media-lte(tablet) {
      max-width: 100%;
      gap: 40px;
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
  &__title {
    margin-bottom: 8px;
  }
  &__contact {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 30px;

    a {
      display: block;
      color: $white;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &__menu {
    @include media-lte(desktop) {
      width: 100%;
    }
  }
}

.footer-bottom {
  background-color: $black;
  padding: 10px 0 16px;
  @include media-lte(tablet) {
    padding-top: 51px;
  }
  p {
    color: $gray-50;
  }
}

.social-links {
  display: flex;
  align-items: center;
  a {
    margin-right: 24px;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      opacity: .8;
    }
    @include media-lte(tablet) {
      margin-right: 32px;
    }
  }
}
</style>
