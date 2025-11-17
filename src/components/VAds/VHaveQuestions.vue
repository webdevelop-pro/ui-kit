<script setup lang="ts">
import haveQuestion from './haveQuestion.webp';
import VSection from 'UiKit/components/VSection/VSection.vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VTextBlock from 'UiKit/components/VText/VTextBlock.vue';
import { computed } from 'vue';
import { VTextBlockConfig } from '../VText/types';

export interface VHaveQuestionsConfig {
  imageUrl?: string;
  noImage?: boolean;
}
const props = withDefaults(defineProps<VTextBlockConfig & VHaveQuestionsConfig>(), {
  imageUrl: haveQuestion,
  buttons: () => [],
});

const textBlockProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { imageUrl, noImage, ...delegated  } = props;

  return delegated;
});
</script>

<template>
  <VSection
    class="VHaveQuestions v-have-questions"
    :class="{ 'is--no-image': noImage }"
  >
    <div class="v-have-questions__container">
      <div class="v-have-questions__content  with-default-distance">
        <VTextBlock
          v-bind="textBlockProps"
        />
      </div>
      <div class="v-have-questions__img">
        <VImage
          :src="imageUrl"
          loading="lazy"
          alt="web-develop"
          class="v-have-questions__img-icon "
        />
      </div>
    </div>
  </VSection>
</template>

<style lang="scss">
.v-have-questions {
  $root: &;

  &__container {
    position: relative;
    overflow: hidden;
    display: flex;
    width: 100%;
    padding: 130px;
    align-items: center;
    gap: 88px;
    justify-content: space-between;
    border-radius: 2px;
    border: 1px solid $gray-20;
    background: linear-gradient(102deg, #F0F4FF 2.63%, #D3E0FF 100%);
    z-index: 1;

    @include media-lte(tablet) {
      padding: 40px;
      flex-direction: column;
      gap: 60px;
    }

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 53%;
      height: 57%;
      background: url('./haveQuestionBg.svg') no-repeat center;
      background-size: contain;
      z-index: 0;
    }
  }

  &__button {
    margin-top: 40px;

    @include media-lte(tablet) {
      margin-top: 24px !important;
    }
  }

  p {
    font-size: 20px;
    line-height: 30px;
    margin-top: 8px !important;

    @include media-lte(tablet) {
      margin-top: 3px !important;
    }
  }

  &__content {
    position: relative;
    flex-shrink: 0;
    width: 48%;

    @include media-lte(tablet) {
      width: 100%;
    }
  }

  &__img {
    width: 570px;
    height: 320px;
    flex-shrink: 0;
    padding: 5.5px;
    border-radius: 10.958px;
    background: $white;
    box-shadow: 0 8.818px 10.287px -5.878px rgb(18 22 31 / 5%), 0 14.696px 47.028px 5.878px rgb(18 22 31 / 10%);
    position: relative;
    z-index: 1;

    @include media-lte(tablet) {
      width: 100%;
      height: auto;
    }
  }

  &__img-icon {
    border-radius: 4.853px;
    border: 0.607px solid $gray-20;
    margin-top: 0 !important;
    height: 100%;
    width: auto;
  }

  &.is--no-image {
    #{$root}__content {
      width: 100%;
    }
    #{$root}__img {
      display: none;
    }
  }
}
</style>
