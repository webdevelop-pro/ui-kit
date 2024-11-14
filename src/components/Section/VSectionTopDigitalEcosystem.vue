<script setup lang="ts">
import { PropType } from 'vue';
import VButton from 'UiKit/components/VButton/VButton.vue';
import VTag from 'UiKit/components/VTag/VTag.vue';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';
import { VSvgIcon } from 'UiKit/components/VSvgIcon';
import VImage from 'UiKit/components/VImage/VImage.vue';


const { isTablet } = storeToRefs(useBreakpoints());

interface IDigitalTop {
  tagText?: string;
  title?: string;
  subtitle?: string;
  imageMobile?: string;
  image?: string;
  text?: string;
}

const props = defineProps({
  data: {
    type: Object as PropType<IDigitalTop>,
    required: true,
  },
  getInTouchUrl: String,
  useCaseUrl: String,
});
</script>

<template>
  <div class="VSectionTopDigitalEcosystem v-section-top-digital-ecosystem__wrap-top">
    <section class="v-section-top-digital-ecosystem">
      <div class="is--container">
        <div class="v-section-top-digital-ecosystem__container">
          <div class="v-section-top-digital-ecosystem__content">
            <VTag
              v-if="data.tagText"
              round
              background="#D9FFEE"
            >
              {{ data.tagText }}
            </VTag>
            <h1
              v-if="data.title"
            >
              {{ data.title }}
            </h1>
            <p
              v-if="data.subtitle"
              class="is--subheading-1"
            >
              {{ data.subtitle }}
            </p>
            <p v-if="data.text">
              {{ data.text }}
            </p>
            <div class="v-section-top-digital-ecosystem__button-wrap is--no-margin is--margin-top-40">
              <VButton
                v-if="getInTouchUrl"
                tag="a"
                :href="getInTouchUrl"
                icon-placement="right"
                size="large"
              >
                Get In Touch
              </VButton>
              <VButton
                v-if="useCaseUrl"
                tag="a"
                :href="useCaseUrl"
                icon-placement="right"
                size="large"
                variant="link"
              >
                Learn More in Use Cases
                <VSvgIcon
                  name="arrow-right"
                />
              </VButton>
            </div>
          </div>

          <div class="v-section-top-digital-ecosystem__background">
            <ClientOnly>
              <VImage
                :src="isTablet ? props.data.imageMobile : props.data.image"
                alt="digital ecosystem image"
                class="v-section-top-digital-ecosystem__background-image is--no-margin"
              />
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>
    <slot />
  </div>
</template>

<style lang="scss">
.v-section-top-digital-ecosystem {
  $root: &;

  @include media-lte(desktop-lg) {
    margin-bottom: 100px;
  }

  &__wrap-top {
    position: relative;
  }

  &__content {
    width: 100%;
    z-index: 2;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 80px;
    @include media-gt(tablet) {
      max-width: 653px;
    }
    @include media-lte(desktop-lg) {
      margin-bottom: 60px;
    }
  }

  &__button-wrap {
    margin-top: 0;
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @include media-gte(tablet) {
      gap: 12px;
      align-items: end;
      flex-direction: row;
    }
  }

  &__background {
    width: 313px;
    height: 100%;
    position: absolute;
    right: 127px;
    top: 130px;
    border-radius: 2px;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 1;
    max-height: calc(100% - 260px);

    @include media-lte(desktop-lg) {
      position: initial;
      right: 0;
      width: 100%;
      height: 380px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
}
</style>
