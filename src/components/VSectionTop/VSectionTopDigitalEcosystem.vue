<script setup lang="ts">
import { ref } from 'vue';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VSectionTop from 'UiKit/components/VSectionTop/VSectionTop.vue';

const { isDesktopLG } = storeToRefs(useBreakpoints());


const props = defineProps({
  tagText: String,
  title: String,
  subtitle: String,
  imageMobile: String,
  image: String,
  text: String,
  mainUrl: String,
  secondaryUrl: String,
});

const isLoadingImage = ref(true);
</script>

<template>
  <div class="VSectionTopDigitalEcosystem v-section-top-digital-ecosystem__wrap-top">
    <VSectionTop
      :tag-text="tagText"
      :title="title"
      :subtitle="subtitle"
      :text="text"
      :main-url="mainUrl"
      :secondary-url="secondaryUrl"
      class="v-section-top-digital-ecosystem"
    >
      <template #right>
        <div
          class="v-section-top-digital-ecosystem__background"
          :class="{ 'is--loading': isLoadingImage }"
        >
          <ClientOnly>
            <VImage
              :src="!isDesktopLG ? props.imageMobile : props.image"
              alt="digital ecosystem image"
              :width="isDesktopLG ? '313' : '352'"
              :height="isDesktopLG ? '1246' : '380'"
              class="v-section-top-digital-ecosystem__background-image "
              :class="{ 'is--loading': isLoadingImage }"
              @loading:src="isLoadingImage = $event"
            />
          </ClientOnly>
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
      height: 380px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }

    @include media-lte(tablet) {
      width: 100%;
    }

    &.is--loading {
      max-height: 100%;
    }
  }

  // &__background-wrap {
  //   width: 100%;
  //   @include media-gte(desktop-lg) {
  //     height: 100%;
  //     position: absolute;
  //     top: 0;
  //     max-width: 1175px;
  //     margin: 0 auto;
  //   }
  // }

  &__background-image {
    min-height: 100%;

    @include media-lte(desktop-lg) {
      height: 100%;
      object-fit: cover;
    }

    &.is--loading {
      height: 100%;
    }
  }
}
</style>
