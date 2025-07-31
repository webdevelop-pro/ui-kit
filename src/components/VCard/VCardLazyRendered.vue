<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { defineAsyncComponent, hydrateOnVisible, ref } from 'vue';
import { IOffer } from 'InvestCommon/types/api/offers';
import { urlOfferSingle } from 'InvestCommon/global/links';

const VCardOfferAsync = defineAsyncComponent({
  loader: () => import(/* webpackChunkName: "VCardOfferAsync" */ 'UiKit/components/VCard/VCardOffer.vue'),
  hydrate: hydrateOnVisible(),
});

defineProps<{
  offer: IOffer;
}>();

const show = ref(false);
const el = ref<HTMLElement | null>(null);

useIntersectionObserver(
  el,
  ([{ isIntersecting }]) => {
    if (isIntersecting) show.value = true;
  },
  {
    rootMargin: '0px', // loads earlier for smoother UX
  },
);
</script>

<template>
  <component
    :is="show ? VCardOfferAsync : 'div'"
    ref="el"
    v-bind="show ? {
      offer,
      imageLoading: 'lazy',
      href: urlOfferSingle(offer.slug),
      class: 'v-offer-list__list-item',
    } : {}"
  />
</template>
