<script setup lang="ts">
import { IOffer } from 'InvestCommon/types/api/offers';
import { currency } from 'InvestCommon/helpers/currency';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import VBadge from 'UiKit/components/Base/VBadge/VBadge.vue';
import { PropType, computed } from 'vue';
import defaulImage from 'InvestCommon/assets/images/default.svg?url';
import VInfoSlot from 'UiKit/components/VInfo/VInfoSlot.vue';
import { useOfferStore } from 'InvestCommon/store/useOffer';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VSkeleton from 'UiKit/components/Base/VSkeleton/VSkeleton.vue';
import { VCard, VCardContent } from 'UiKit/components/Base/VCard';

const props = defineProps({
  offer: {
    type: Object as PropType<IOffer>,
  },
  funded: Boolean,
  href: String,
  imageLoading: {
    type: String,
    default: 'lazy',
  },
});
const offerStore = useOfferStore();

const offerImage = computed(() => {
  if (props.offer?.image.meta_data?.medium) return props.offer?.image.meta_data.medium;
  if (props.offer?.image.url) return props.offer?.image.url;
  return defaulImage;
});

const isDefaultImage = computed(() => (!props.offer?.image.meta_data?.small && !props.offer?.image.url));
const minInvestment = computed(() => ((props.offer?.min_investment || 0) * (props.offer?.price_per_share || 0)));
const amountPercent = computed(() => offerStore.getOfferFundedPercent(props.offer));
const isClosingSoon = computed(() => (amountPercent.value > 90));
const isNew = computed(() => {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  // return start_at < twoDaysAgo;
  return false; // TODO fix
});
const tagText = computed(() => (isClosingSoon.value ? '🔥 Closing Soon' : 'New'));
const tagBackground = computed(() => (isClosingSoon.value ? 'is--background-yellow-light' : 'is--background-secondary-light'));
const showTag = computed(() => isClosingSoon.value || isNew.value);
const infoTags = computed(() => ([
  'Fintech',
  'E-Commerce',
  'Network Security',
]));
const minInvestmentValue = computed(() => currency(minInvestment.value, 0));
</script>

<template>
  <VCard
    v-bind="$attrs"
    :href="href"
    :aria-label="offer?.name"
    class="VOfferCard v-offer-card with-default-distance"
  >
    <VBadge
      v-if="showTag"
      :class="tagBackground"
      class="v-offer-card__tag"
    >
      {{ tagText }}
    </VBadge>
    <div
      v-if="props.offer?.image"
      class="v-offer-card__img-wrap"
    >
      <VImage
        :src="offerImage"
        :alt="offer?.slug"
        itemprop="image"
        :loading="imageLoading"
        class="v-offer-card__img is--margin-top-0"
        :class="{ 'is--default-image': isDefaultImage }"
      />
    </div>
    <VSkeleton
      v-else
      height="190px"
      width="100%"
      class="v-offer-card__img is--img-skeleton"
    />
    <VCardContent class="v-offer-card__inner">
      <h2
        v-if="offer?.name"
        class="v-offer-card__title is--h3__title"
        data-testid="offer-title"
        itemprop="name"
      >
        {{ offer?.name }}
      </h2>
      <VSkeleton
        v-else
        height="36px"
        width="100%"
        class="v-offer-card__title is--h3__title"
      />
      <div class="v-offer-card__inner-bottom">
        <div class="v-offer-card__content">
          <div
            v-if="funded"
            class="v-offer-card__funded is--small-2"
          >
            Funded
          </div>
          <div
            v-if="offer?.seo_description"
            itemprop="description"
            class="v-offer-card__description is--small"
          >
            {{ offer?.seo_description }}
          </div>
          <VInfoSlot
            v-if="!funded"
            size="small"
            class="v-offer-card__info"
          >
            <div class="v-offer-card__info-wrap">
              <div class="v-offer-card__details is--small-2">
                Min investment:
                <span
                  v-if="props.offer"
                  class="v-offer-card__details-number is--h6__title"
                >
                  {{ minInvestmentValue }}
                </span>
                <VSkeleton
                  v-else
                  height="21px"
                  width="50px"
                  class="v-offer-card__details-number is--h6__title"
                />
              </div>
              <div class="v-offer-card__details is--small-2">
                Pre-Money Valuation:
                <span
                  v-if="props.offer"
                  class="v-offer-card__details-number is--h6__title"
                >
                  {{ currency(offer?.valuation, 0) }}
                </span>
                <VSkeleton
                  v-else
                  height="21px"
                  width="50px"
                  class="v-offer-card__details-number is--h6__title"
                />
              </div>
            </div>
          </VInfoSlot>
          <div
            v-if="props.offer"
            class="v-offer-card__tag-info-wrap"
          >
            <VBadge
              v-for="(tagInfo, indexInfo) in infoTags"
              :key="indexInfo"
              round
              size="small"
              background="#DEE2E6"
              itemprop="keywords"
              class="v-offer-card__tag-info"
            >
              {{ tagInfo }}
            </VBadge>
          </div>
          <VSkeleton
            v-else
            height="18px"
            width="100%"
            class="v-offer-card__tag-info-wrap"
          />
        </div>
        <VButton
          v-if="!funded"
          block
          variant="tetriary"
          class="v-offer-card__btn"
        >
          Invest Now
        </VButton>
      </div>
    </VCardContent>
  </VCard>
</template>

<style lang="scss">
.v-offer-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: $white;
  box-shadow: $box-shadow-medium;
  transition: all .3s ease;
  width: 100%;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    box-shadow: $box-shadow-large;
  }

  &__img-wrap {
    width: 100%;
    min-height: 190px;
    background-color: $primary-light;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__img {
    height: 190px;
    width: 100%;
    max-width: 100%;
    object-fit: cover;

    &.is--default-image {
      max-width: 120px;
      max-height: 120px;
    }

    &.is--img-skeleton {
      min-height: 190px;
    }
  }

  &__inner {
    display: flex;
    padding: 40px;
    flex-direction: column;
    border-radius: 2px;
    color: $black;
    height: 100%;
  }

  &__title {
    text-transform: capitalize;
  }

  &__funded {
    color: $secondary-dark;
    margin-bottom: 8px;
  }

  &__details {
    color: $gray-70;
    width: 50%;
    display: flex;
    flex-direction: column;
  }

  &__details-number {
    color: $gray-80;
  }

  &__inner-bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  &__description {
    margin-bottom: 16px;
    color: $gray-80;
    max-height: 36px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
  }

  &__btn {
    margin-top: 28px !important;
  }

  &__tag {
    position: absolute;
    top: 12px;
    left: 12px;
  }

  &__info {
    border-top: 1px solid $gray-20;
  }

  &__info-wrap {
    margin: 0 -12px;
    display: flex;
    width: calc(100% + 24px);
  }

  &__tag-info-wrap {
    margin-top: 20px;
    display: flex;
    width: 100%;
    gap: 8px;
  }
}
</style>
