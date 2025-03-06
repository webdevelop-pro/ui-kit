<script setup lang="ts">
import { IOffer } from 'InvestCommon/types/api/offers';
import {
  computed, PropType, ref, watchEffect,
} from 'vue';
import VSection from 'UiKit/components/VSection/VSection.vue';
import VCardOffer from 'UiKit/components/VCard/VCardOffer.vue';
import { urlOfferSingle } from 'InvestCommon/global/links';

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

watchEffect(() => {
  loadingLocal.value = props.loading;
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
            v-for="(offer, index) in items"
            :key="offer.slug"
            :offer="offer"
            :image-loading="(index < 7) ? 'eager' : 'lazy'"
            :link="urlOfferSingle(offer.slug)"
            class="v-offer-list__list-item"
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
