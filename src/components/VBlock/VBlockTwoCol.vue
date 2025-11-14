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
  leftColWidth?: string;
}
const props = withDefaults(defineProps<VTextBlockConfig & VSectionTopProductsConfig>(), {
  classImage: '',
  image: '',
  leftColWidth: '508',
  buttons: () => [],
});

const textBlockProps = computed(() => {
  const { classImage, image, ...delegated  } = props;

  return delegated;
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
        <VImage
          :src="image"
          alt="Products top visual"
          :class="classImage"
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
}
</style>
