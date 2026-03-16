<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';
import { IOffer } from 'InvestCommon/data/offer/offer.types';
import { urlOfferSingle } from 'InvestCommon/domain/config/links';
import VCardOffer from 'UiKit/components/VCard/VCardOffer.vue';

defineProps<{
  offer: IOffer;
}>();

const show = ref(false);
const el = ref<HTMLElement | null>(null);

const { stop } = useIntersectionObserver(
  el,
  ([{ isIntersecting }]) => {
    if (!isIntersecting) {
      return;
    }

    show.value = true;
    stop();
  },
  {
    rootMargin: '200px 0px',
  },
);
</script>

<template>
  <component
    :is="show ? VCardOffer : 'div'"
    ref="el"
    v-bind="show ? {
      offer,
      imageLoading: 'lazy',
      href: urlOfferSingle(offer.slug),
      class: 'v-offer-list__list-item',
    } : {}"
  />
</template>
