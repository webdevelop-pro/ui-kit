<script lang="ts">
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VSection from 'UiKit/components/VSection/VSection.vue';
import VTextBlock from 'UiKit/components/VText/VTextBlock.vue';
import { VTextBlockConfig } from '../VText/types';
import { computed } from 'vue';
</script>

<script setup lang="ts">

export interface VSectionTopProductsConfig {
  classImage?: string;
  image?: string;
  imageMobile?: string;
  imageBg?: boolean;
  imageBgImage?: boolean;
  srcsetProp?: string;
}
const props = withDefaults(defineProps<VTextBlockConfig & VSectionTopProductsConfig>(), {
  classImage: '',
  image: '',
  srcsetProp: '',
  imageBg: true,
  imageBgImage: true,
  buttons: () => [],
});

const textBlockProps = computed(() => {
  const { classImage, image, imageBg, imageBgImage,  ...delegated  } = props;

  return delegated;
});

const showImage = computed(() => {
  return props.image || props.imageMobile;
});

const hasMobileImage = computed(() => {
  return !!props.imageMobile;
});
</script>

<template>
  <VSection class="VSectionTopProducts v-section-top-products">
    <div class="v-section-top-products__container is--gap-80">
      <VTextBlock
        v-bind="textBlockProps"
        class="v-section-top-products__text is--max-width-gt-desktop-508"
      />
      <div
        class="v-section-top-products__background "
        :class="{'is--bg-image': imageBgImage }"
      >
        <div
          class="v-section-top-products__image"
          :class="{'is--no-bg': !imageBg }"
        >
          <!-- Desktop image - shown on desktop, or on both if no mobile image -->
          <VImage
            v-if="showImage && image"
            :src="image"
            alt="Products top visual"
            :class="[classImage, hasMobileImage ? 'v-section-top-products__image-desktop' : 'v-section-top-products__image-both']"
            fetchpriority="high"
          />
          <!-- Mobile image - only shown if provided -->
          <VImage
            v-if="showImage && imageMobile"
            :src="imageMobile"
            alt="Products top visual"
            :class="[classImage, 'v-section-top-products__image-mobile']"
            fetchpriority="high"
          />
        </div>
      </div>
    </div>
  </VSection>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;

.v-section-top-products {
  $root: &;

  &__container {
    display: flex;
    align-items: center;

    @media screen and (width < $desktop) {
      flex-direction: column;
      align-items: flex-start;
      padding-top: 25px;
    }
  }

  &__text {
    flex-shrink: 0;
  }

  &__background {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    &.is--bg-image {
      padding-left: 85px;
      padding-right: 85px;

      @media screen and (width < $desktop) {
        padding-left: 0;
        padding-right: 0;
        padding-bottom: 30px;
      }
    }
    
    &.is--bg-image::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -69px;
      width: 100%;
      height: 100%;
      background: url('/images/matrix_blue_edgefade.svg') no-repeat;
      background-size: contain;
      background-position: left bottom;
      z-index: 0;
      opacity: 0.3;

      @media screen and (width < $desktop) {
        bottom: -26px;
      }
    }


    @media screen and (width < $desktop) {
      margin: 0 auto;
    }
  }

  &__image {
    width: 628px;
    aspect-ratio: 157/83;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3.728px;
    border-radius: 7.456px;
    z-index: 1;
    position: relative;

    &:not(.is--no-bg) {
      padding: 4px;
      background: $white;
      box-shadow: $box-shadow-large;
    }

    @media screen and (width < $desktop) {
      width: 100%;
      height: auto;
    }
  }

  &__image-desktop {
    display: none;

    @media screen and (width >= $desktop) {
      display: block;
    }
  }

  &__image-mobile {
    display: block;

    @media screen and (width >= $desktop) {
      display: none;
    }
  }

  &__image-both {
    display: block;
  }

  .v-image.is--image-mobile {
    @media screen and (width > $desktop) {
      position: absolute;
      top: -60px;
      left: 39px;
      width: 412.49px;
      height: 477.274px;
    }
  }
}
</style>
