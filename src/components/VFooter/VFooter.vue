<script setup lang="ts">
import { defineAsyncComponent, hydrateOnVisible, ref } from 'vue';
import { useHubspotForm } from 'UiKit/composables/useHubspotForm';
import { env } from '@/config/env';
import { useData } from 'vitepress';
import { socials } from 'UiKit/utils/socials';
import { useToast } from '../Base/VToast/use-toast';
import { useGlobalLoader } from 'UiKit/store/useGlobalLoader';

const VSocialLinks = defineAsyncComponent({
  loader: () => import('UiKit/components/VSocialLinks/VSocialLinks.vue'),

  hydrate: hydrateOnVisible(),
});

const VFooterMenu = defineAsyncComponent({
  loader: () => import('./VFooterMenu.vue'),

  hydrate: hydrateOnVisible(),
});

const VFormFooterSubscribe = defineAsyncComponent({
  loader: () => import('UiKit/components/VForms/VFormFooterSubscribe.vue'),

  hydrate: hydrateOnVisible(),
});

const VFooterBottom = defineAsyncComponent({
  loader: () => import('UiKit/components/VFooter/VFooterBottom.vue'),

  hydrate: hydrateOnVisible(),
});

const { theme } = useData();

const SOCIAL_LIST = [

  socials?.facebook, socials?.instagram,

  socials?.linkedin, socials?.github,
];

const { toast } = useToast();

const TOAST_OPTIONS = {
  title: 'Submitted!',
  variant: 'error',
};

const loadingSubmitting = ref(false);
const onSubmit = async (emailLocal: string) => {
  loadingSubmitting.value = true;
  const { submitFormToHubspot } = useHubspotForm(env.HUBSPOT_FORM_ID_RECEIVE_LATEST_NEWS);
  await submitFormToHubspot({
    email: emailLocal,
  });
  loadingSubmitting.value = false;
  toast(TOAST_OPTIONS);
};

const onClickMenu = () => {
  useGlobalLoader().show();
};
</script>

<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <div class="VFooter v-footer">
    <div class="is--container">
      <div class="v-footer__wrap">
        <div class="v-footer__form-wrap">
          <VFormFooterSubscribe
            label="Receive latest news:"
            :loading="loadingSubmitting"
            class="v-footer__form"
            @submit="onSubmit"
          />

          <div
            class="v-footer__contact"
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
          class="v-footer__menu"
          @click="onClickMenu"
        />
      </div>
    </div>
  </div>
  <VFooterBottom />
</template>

<style lang="scss">
.v-footer {
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
    margin-bottom: 30px;
  }

  &__menu {
    @include media-lte(desktop) {
      width: 100%;
    }
  }
}
</style>
