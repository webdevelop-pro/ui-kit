<script setup lang="ts">
import { PropType, computed } from 'vue';
import VButton from 'UiKit/components/VButton/VButton.vue';
import VImage from 'UiKit/components/VImage/VImage.vue';
import { stripHtml } from 'UiKit/helpers/general';


export interface ICardWithBlueTitleLine {
  path?: string;
  subtitleTop?: string;
  imageTop?: string;
  bodyImg?: string;
  title: string;
  subtitle?: string;
  description: string;
  slug?: string;
  url?: string;
}

const props = defineProps({
  hideDescriptionMobile: Boolean,
  data: {
    type: Object as PropType<ICardWithBlueTitleLine>,
    required: true,
  },
  ellipsis: Boolean,
});

const isSvg = (img: string) => img.includes('.svg');

const url = computed(() => {
  if (props.data.url) return props.data.url;
  if (props.data.slug) return `/case-studies/${props.data.slug}`;
  return null;
});

const getImageTop = () => {
  if ((props.data.subtitleTop?.toLowerCase() === 'fintech')
    || (props.data.subtitleTop?.toLowerCase() === 'reg-cf')) return '/images/case-studies/fintech.svg';
  if ((props.data.subtitleTop?.toLowerCase() === 'crowdfunding')
    || (props.data.subtitleTop?.toLowerCase() === 'reg-d')
    || (props.data.subtitleTop?.toLowerCase() === 'security')) return '/images/case-studies/crowdfunding.svg';
  if ((props.data.subtitleTop?.toLowerCase() === 'blockchain')
    || (props.data.subtitleTop?.toLowerCase() === 'alternative-assets')) return '/images/case-studies/blockchain.svg';
  if ((props.data.subtitleTop?.toLowerCase() === 'ai/ml software')
    || (props.data.subtitleTop?.toLowerCase() === 'reg-a')) return '/images/case-studies/ai-software.svg';
  return null;
};
</script>

<template>
  <div
    class="VCardWithBlueTitleLine card-with-blue-title-line"
    :class="{ 'is--hoverable': url, 'is--hide-description-mobile': hideDescriptionMobile }"
  >
    <a
      v-if="url"
      :href="url"
      class="card-with-blue-title-line__cover-link"
    >
      {{ data.title }}
    </a>
    <div class="card-with-blue-title-line__top">
      <div
        v-if="data.subtitleTop"
        class="card-with-blue-title-line__subtitle-wrapper is--no-margin"
      >
        <img
          v-if="data.imageTop || getImageTop()"
          loading="lazy"
          class="card-with-blue-title-line__subtitle-icon is--no-margin"
          :src="data.imageTop || getImageTop()"
          alt="CardWithBlueTitleLine title icon"
        >
        <h3 class="card-with-blue-title-line__subtitle is--h5__title">
          {{ data.subtitleTop }}
        </h3>
      </div>
      <h3 class="card-with-blue-title-line__title">
        {{ data.title }}
      </h3>
      <p
        v-if="data.subtitle"
        class="card-with-blue-title-line__subtitle-bottom is--subheading-2"
      >
        {{ data.subtitle }}
      </p>
      <p
        v-if="data.description"
        id="descriprtion1"
        class="card-with-blue-title-line__description"
        :class="{ 'is--ellipsis': ellipsis }"
        v-html="stripHtml(data.description)"
      />
    </div>


    <div class="card-with-blue-title-line__bottom-wrap">
      <VImage
        v-if="data.bodyImg && !isSvg(data.bodyImg)"
        class="card-with-blue-title-line__body-image is--no-margin"
        :src="data.bodyImg"
        alt="slider bosy image"
      />
      <component
        :is="data.bodyImg"
        v-if="data.bodyImg && isSvg(data.bodyImg)"
        class="card-with-blue-title-line__body-image"
        alt="slider bosy image"
      />

      <VButton
        v-if="url"
        tag="a"
        color="secondary"
        :href="url"
        class="card-with-blue-title-line__button"
      >
        Discover More
      </VButton>
    </div>
  </div>
</template>

<style lang="scss">
.card-with-blue-title-line {
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

  &__subtitle-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 28px;
    &::before {
      content: '';
      position: absolute;
      left:0;
      height: 35px;
      width: 2px;
      top: 40px;
      background-color: $primary;
    }
  }

  &__subtitle-icon {
    width: 35px;
    height: 35px;
    margin-right: 12px;
  }

  &__subtitle-wrapper + &__title,
  &__button, &__bottom-wrap{
    margin-top: 28px !important;
  }

  &__subtitle {
    color: $primary;
    text-transform: uppercase;
    min-height: 35px;
    display: flex;
    align-items: center;
  }

  &__subtitle-bottom {
    color: $black;
    margin-top: 8px;
  }

  &__description {
    margin-top: 20px;
    #{$root}.is--hide-description-mobile & {
      @include media-lte(tablet) {
        display: none;
      }
    }
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
    min-height: 200px;
  }

  &__cover-link {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    opacity: 0;
  }
}
</style>
