<script setup lang="ts">
import { PropType } from 'vue';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VSectionTop from 'UiKit/components/VSectionTop/VSectionTop.vue';


const { isDesktopLG } = storeToRefs(useBreakpoints());

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
    <VSectionTop
      :tag-text="data.tagText"
      :title="data.title"
      :subtitle="data.subtitle"
      :text="data.text"
      :get-in-touch-url="getInTouchUrl"
      :use-case-url="useCaseUrl"
      class="v-section-top-digital-ecosystem"
    >
      <template #right>
        <div class="v-section-top-digital-ecosystem__background-wrap">
          <div class="v-section-top-digital-ecosystem__background">
            <ClientOnly>
              <VImage
                :src="!isDesktopLG ? props.data.imageMobile : props.data.image"
                alt="digital ecosystem image"
                class="v-section-top-digital-ecosystem__background-image "
              />
            </ClientOnly>
          </div>
        </div>
      </template>
    </VSectionTop>
    <slot />
  </div>
</template>

<style lang="scss">
.v-section-top-digital-ecosystem {
  $root: &;

  margin-bottom: 80px;
  @include media-lte(desktop-lg) {
    margin-bottom: 100px;
  }

  &__wrap-top {
    position: relative;
  }

  &__background {
    width: 313px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
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

  &__background-wrap {
    @include media-gte(desktop-lg) {
      height: 100%;
      position: absolute;
      top: 0;
      width: 100%;
      max-width: 1175px;
      margin: 0 auto;
    }
  }

  &__background-image {
    @include media-lte(desktop-lg) {
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
