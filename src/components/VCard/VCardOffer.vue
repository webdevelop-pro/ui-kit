<script setup lang="ts">
import { IOfferFormatted } from 'InvestCommon/types/offer';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import VBadge from 'UiKit/components/Base/VBadge/VBadge.vue';
import { PropType, computed } from 'vue';
import VInfoSlot from 'UiKit/components/VInfo/VInfoSlot.vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VSkeleton from 'UiKit/components/Base/VSkeleton/VSkeleton.vue';
import { VCard, VCardContent } from 'UiKit/components/Base/VCard';

interface InfoItem {
  label: string;
  value: string | undefined;
  show: boolean;
}

const props = defineProps({
  offer: {
    type: Object as PropType<IOfferFormatted>,
  },
  funded: Boolean,
  href: String,
  imageLoading: {
    type: String,
    default: 'lazy',
  },
});
// const infoTags = computed(() => ([
//   'Fintech',
//   'E-Commerce',
//   'Network Security',
// ]));

// Generate information items dynamically
const infoItems = computed((): InfoItem[] => {
  // if (!props.offer) return [];
  
  const items: InfoItem[] = [
    {
      label: 'Min investment:',
      value: props.offer?.minInvestmentFormatted,
      show: true,
    },
    {
      label: props.offer?.valuationLabel,
      value: props.offer?.valuationFormatted,
      show: true,
    },
    {
      label: 'Security Type:',
      value: props.offer?.securityTypeFormatted,
      show: true,
    },
    {
      label: 'Interest Rate:',
      value: props.offer?.interestRateFormatted,
      show: !!(props.offer?.interestRateFormatted
        && (props.offer?.isSecurityTypeDebt || props.offer?.isSecurityTypeConvertibleDebt || props.offer?.isSecurityTypeConvertibleNote)),
    },
    {
      label: 'Voting Rights:',
      value: props.offer?.votingRightsFormatted,
      show: !!(props.offer?.votingRightsFormatted
      && (props.offer?.isSecurityTypeEquity || props.offer?.isSecurityTypePreferredEquity)),
    },
  ];
  
  return items.filter(item => item.show);
});

// Group items into chunks of 2 for display
const infoItemGroups = computed(() => {
  const groups: InfoItem[][] = [];
  for (let i = 0; i < infoItems.value.length; i += 2) {
    groups.push(infoItems.value.slice(i, i + 2));
  }
  return groups;
});
</script>

<template>
  <VCard
    v-bind="$attrs"
    :href="href"
    :aria-label="offer?.name"
    class="VOfferCard v-offer-card with-default-distance"
  >
    <VBadge
      v-if="offer?.showTag"
      :class="offer?.tagBackground"
      class="v-offer-card__tag"
    >
      {{ offer?.tagText }}
    </VBadge>
    <div
      v-if="offer?.imageMedium"
      class="v-offer-card__img-wrap"
    >
      <VImage
        :src="offer?.imageMedium"
        :alt="offer?.slug || 'offer image'"
        itemprop="image"
        :loading="imageLoading"
        class="v-offer-card__img is--margin-top-0"
        :class="{ 'is--default-image': offer?.isDefaultImage }"
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
          <template v-if="!funded">
            <VInfoSlot
              v-for="(group, groupIndex) in infoItemGroups"
              :key="groupIndex"
              size="small"
              class="v-offer-card__info"
            >
              <div class="v-offer-card__info-wrap">
                <div
                  v-for="(item, itemIndex) in group"
                  :key="itemIndex"
                  class="v-offer-card__details is--small-2"
                >
                  <span v-if="item.label">
                    {{ item.label }}
                  </span>
                  <VSkeleton
                    v-else
                    height="17px"
                    width="50px"
                  />
                  <span
                    v-if="offer"
                    class="v-offer-card__details-number is--h6__title"
                  >
                    {{ item.value }}
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
          </template>
          <!-- <div
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
          /> -->
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
    justify-content: space-between;
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
    margin-top: 0 !important;
  }

  &__inner-bottom {
    display: flex;
    flex-direction: column;
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
    &:first-of-type {
      border-top: 1px solid $gray-20;
    }
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
