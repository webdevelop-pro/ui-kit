<script setup lang="ts">
import { IOffer } from 'InvestCommon/types/api/offers';
import {
  computed, PropType, ref, watchEffect,
} from 'vue';
import VSection from 'UiKit/components/VSection/VSection.vue';
import VCardOffer from 'UiKit/components/VCard/VCardOffer.vue';
import { urlOfferSingle } from 'InvestCommon/global/links';
import VCardLazyRendered from 'UiKit/components/VCard/VCardLazyRendered.vue';

const props = defineProps({
  title: String,
  subTitle: String,
  items: Array as PropType<IOffer[]>,
  buttonHref: String,
  buttonText: String,
  loading: Boolean,
});

const noData = computed(() => (props.items?.length === 0) && !props.loading);
const loadingLocal = ref(true);
const arrayEager = computed(() => {
  const items = props.items || [];
  return items.slice(0, 6);
});
const arrayLazy = computed(() => {
  const items = props.items || [];
  return items.slice(6);
});

watchEffect(() => {
  setTimeout(() => {
    loadingLocal.value = props.loading;
  }, 1000);
});
</script>

<template>
  <VSection
    :title="title"
    :sub-title="subTitle"
    :button-href="buttonHref"
    :button-text="buttonText"
    :no-data="noData"
    class="VSectionCardOfferGrid v-section-card-offer-grid"
  >
    <template #infoShort>
      <slot name="infoShort" />
    </template>
    <ClientOnly>
      <div
        class="v-section-card-offer-grid__list-wrap"
      >
        <div
          v-if="!loadingLocal"
          class="is--three-col-grid"
        >
          <VCardOffer
            v-for="(offer, index) in arrayEager"
            :key="offer.slug"
            :offer="offer"
            image-loading="eager"
            :href="urlOfferSingle(offer.slug)"
            class="v-offer-list__list-item"
          />
          <!-- Lazy cards -->
          <VCardLazyRendered
            v-for="offer in arrayLazy"
            :key="offer.slug"
            :offer="offer"
          />
        </div>
        <div
          v-else
          class="is--three-col-grid"
        >
          <VCardOffer
            v-for="index in 6"
            :key="index"
            class="v-offer-list__list-item"
          />
        </div>
      </div>
    </ClientOnly>
  </VSection>
</template>

<style lang="scss">
.v-section-card-offer-grid {
  width: 100%;

  &__list-wrap {
    border-top: 1px solid $gray-40;
    padding-top: 30px;
  }
}
</style>
