<script setup lang="ts">
import haveQuestion from './haveQuestion.png';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import VSection from 'UiKit/components/VSection/VSection.vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';

defineProps({
  title: String,
  subtitle: String,
  buttonLink: String,
  buttonText: {
    type: String,
    default: 'Chat with Assistant',
  },
  imageUrl: {
    type: String,
    default: haveQuestion,
  },
  noImage: Boolean,
});
</script>

<template>
  <VSection
    class="VHaveQuestions v-have-questions"
    :class="{ 'is--no-image': noImage }"
  >
    <div class="v-have-questions__container">
      <div class="v-have-questions__content  with-default-distance">
        <slot>
          <h2 v-if="title">
            {{ title }}
          </h2>
          <p
            v-if="subtitle"
            class="is--subheading-2"
          >
            {{ subtitle }}
          </p>
        </slot>
        <VButton
          v-if="buttonLink"
          as="a"
          :href="encodeURI(buttonLink)"
          size="large"
          class="v-have-questions__button"
        >
          {{ buttonText }}
        </VButton>
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
    overflow: hidden;
    display: flex;
    width: 100%;
    padding: 130px 196px;
    align-items: center;
    gap: 88px;
    justify-content: space-between;
    border-radius: 2px;
    border: 1px solid $gray-20;
    background: $primary-light;
    @include media-lte(tablet) {
      padding: 40px;
      flex-direction: column;
      gap: 60px;
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
    width: 62%;
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
    box-shadow: 0px 8.818px 10.287px -5.878px rgba(18, 22, 31, 0.05), 0px 14.696px 47.028px 5.878px rgba(18, 22, 31, 0.10);

    @include media-lte(tablet) {
      width: 100%;
      height: auto;
    }
  }

  &__img-icon {
    width: 100%;
    border-radius: 4.853px;
    border: 0.607px solid $gray-20;
    margin-top: 0 !important;
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
