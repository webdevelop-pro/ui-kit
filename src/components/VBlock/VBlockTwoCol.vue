<script lang="ts">
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VTextBlock from 'UiKit/components/VText/VTextBlock.vue';
import { VTextBlockConfig } from '../VText/types';
import { computed } from 'vue';
</script>

<script setup lang="ts">

export interface VSectionTopProductsConfig {
  classImage?: string;
  image?: string;
  imageMobile?: string;
  leftColWidth?: string;
}
const props = withDefaults(defineProps<VTextBlockConfig & VSectionTopProductsConfig>(), {
  classImage: '',
  image: '',
  imageMobile: '',
  leftColWidth: '508',
  buttons: () => [],
});

const textBlockProps = computed(() => {
  const { classImage, image, imageMobile, leftColWidth, ...delegated  } = props;

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
  <div class="VBlockTwoCol v-block-two-col__container is--gap-80">
    <VTextBlock
      v-bind="textBlockProps"
      class="v-block-two-col__text"
      :class="'is--max-width-gt-desktop-' + leftColWidth"
    />
    <div class="v-block-two-col__background ">
      <div
        class="v-block-two-col__image"
      >
        <!-- Desktop image - shown on desktop, or on both if no mobile image -->
        <VImage
          v-if="showImage && image"
          :src="image"
          alt="Products top visual"
          :class="[classImage, hasMobileImage ? 'v-block-two-col__image-desktop' : 'v-block-two-col__image-both']"
          fetchpriority="high"
        />
        <!-- Mobile image - only shown if provided -->
        <VImage
          v-if="showImage && imageMobile"
          :src="imageMobile"
          alt="Products top visual"
          :class="[classImage, 'v-block-two-col__image-mobile']"
          fetchpriority="high"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;

.v-block-two-col {
  $root: &;

  &__container {
    display: flex;
    align-items: center;

    @media screen and (width < $desktop) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__text {
    flex-shrink: 0;
    text-align: left;
  }

  &__background {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  &__image {
    width: 100%;
    aspect-ratio: 770/480;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3.728px;
    border-radius: 7.456px;
    z-index: 1;
    position: relative;

    @media screen and (width < $desktop) {
      width: 100%;
      height: auto;
    }
  }

  &__image-desktop {
    display: none;

    @media screen and (width >= $tablet) {
      display: block;
    }
  }

  &__image-mobile {
    display: block;

    @media screen and (width >= $tablet) {
      display: none;
    }
  }

  &__image-both {
    display: block;
  }
}
</style>
