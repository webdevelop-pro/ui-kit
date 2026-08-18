<script setup lang="ts">
import { PropType } from 'vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import {
  VCard, VCardContent, VCardHeader, VCardDescription, VCardFooter, VCardTitle,
} from 'UiKit/components/Base/VCard';
import { stripHtml } from 'UiKit/helpers/text';

export interface ICardPrimary {
  type?: string;
  imageType?: string;
  bodyImg?: string;
  title?: string;
  subtitle?: string;
  subTitle?: string;
  text: string;
  url?: string;
}

defineProps({
  data: {
    type: Object as PropType<ICardPrimary>,
    required: true,
  },
  descriptionWithHtml: Boolean,
  ellipsis: Boolean,
  showButton: Boolean,
});

const getImageType = () => {
  // if ((props.data.type?.toLowerCase() === 'fintech')
  //   || (props.data.type?.toLowerCase() === 'reg-cf')) return '/images/use-cases/fintech.svg';
  // if ((props.data.type?.toLowerCase() === 'crowdfunding')
  //   || (props.data.type?.toLowerCase() === 'reg-d')
  //   || (props.data.type?.toLowerCase() === 'security')) return '/images/use-cases/crowdfunding.svg';
  // if ((props.data.type?.toLowerCase() === 'blockchain')
  //   || (props.data.type?.toLowerCase() === 'alternative-assets')) return '/images/use-cases/blockchain.svg';
  // if ((props.data.type?.toLowerCase() === 'ai/ml software')
  //   || (props.data.type?.toLowerCase() === 'reg-a')) return '/images/use-cases/ai-software.svg';
  return null;
};
</script>

<template>
  <VCard
    :href="encodeURI(data.url)"
    class="VCardPrimary v-card-primary"
    :aria-label="data.title"
    :class="{ 'is--hoverable': data.url }"
  >
    <div>
      <VCardHeader>
        <div
          v-if="data.type"
          class="v-card-primary__type-wrapper "
        >
          <VImage
            v-if="data.imageType || getImageType()"
            loading="lazy"
            class="v-card-primary__type-icon is--margin-top-0"
            :src="data.imageType || getImageType()"
            alt="CardWithBlueTitleLine title icon"
            itemprop="image"
          />
          <h3
            class="v-card-primary__type is--h5__title is--margin-top-0"
          >
            {{ data.type }}
          </h3>
        </div>
        <VCardTitle
          v-if="data.title"
          class="is--margin-top-0"
        >
          {{ data.title }}
        </VCardTitle>
        <VCardDescription
          v-if="data.subtitle || data.subTitle"
          itemprop="description"
        >
          {{ data.subtitle || data.subTitle }}
        </VCardDescription>
      </VCardHeader>
      <VCardContent
        v-if="data.text"
        class="v-card-primary__text"
        :class="{ 'is--ellipsis': ellipsis }"
        itemprop="text"
      >
        <p
          v-dompurify-html="descriptionWithHtml ? data.text : stripHtml(data.text)"
        />
      </VCardContent>
    </div>
    <VCardFooter
      v-if="data.url || data.bodyImg || $slots.button"
      class="v-card-primary__footer is--margin-top-30"
    >
      <VImage
        v-if="data.bodyImg"
        class="v-card-primary__body-image"
        :src="data.bodyImg"
        alt="slider bosy image"
        itemprop="image"
        loading="lazy"
      />
      <slot name="button">
        <VButton
          v-if="data.url && showButton"
          as="a"
          variant="tetriary"
          color="primary"
          :href="encodeURI(data.url)"
          class="is--margin-top-0"
        >
          <slot name="buttonText">
            Discover More
          </slot>
        </VButton>
      </slot>
    </VCardFooter>
  </VCard>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as *;

.v-card-primary {
  $root: &;

  position: relative;
  padding: 40px;
  box-shadow: $box-shadow-medium;
  border-radius: 2px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &.is--hoverable:hover {
    box-shadow: $box-shadow-large;
  }

  &__top {
    margin: 0 !important;
  }

  &__type-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 28px;
    gap: 12px;

    &::before {
      content: '';
      position: absolute;
      left:0;
      height: 35px;
      width: 2px;
      background-color: $primary;
    }
  }

  &__type-icon {
    width: 35px;
    height: 35px;
  }

  &__type-wrapper + &__title,
  &__button, &__bottom-wrap{
    margin-top: 28px !important;
  }

  &__type {
    color: $primary;
    text-transform: uppercase;
    min-height: 35px;
    display: flex;
    align-items: center;
  }

  &__text {
    margin-top: 20px;

    &.is--ellipsis {
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &__body-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    height: auto;

    img {
      border: 1px solid colors.$gray-20;
    }
  }

  &__cover-link {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    opacity: 0;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: 28px;
    align-items: flex-start;
  }
}

</style>
