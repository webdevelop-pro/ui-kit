<script setup lang="ts">
import { defineAsyncComponent, hydrateOnVisible, ref } from 'vue';
import { useHubspotForm } from 'UiKit/composables/useHubspotForm';
import { env } from '@/config/env';
import { notify } from '@kyvg/vue3-notification';
import { useData } from 'vitepress';
import { socials } from 'UiKit/utils/socials';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VSocialLinks = defineAsyncComponent({
  loader: () => import('UiKit/components/VSocialLinks/VSocialLinks.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VFooterMenu = defineAsyncComponent({
  loader: () => import('./VFooterMenu.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VFormFooterSubscribe = defineAsyncComponent({
  loader: () => import('UiKit/components/VForms/VFormFooterSubscribe.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VFooterBottom = defineAsyncComponent({
  loader: () => import('UiKit/components/VFooter/VFooterBottom.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});


const { theme } = useData();

const SOCIAL_LIST = [
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  socials?.facebook, socials?.instagram,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  socials?.linkedin, socials?.github,
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
        <VFooterMenu class="v-footer__menu" />
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
