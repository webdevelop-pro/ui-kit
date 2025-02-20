<script setup lang="ts">
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VSectionTop from 'UiKit/components/VSectionTop/VSectionTop.vue';

defineProps({
  title: String,
  subtitle: String,
  text: String,
  image: String,
  getInTouchUrl: String,
});
</script>

<template>
  <VSectionTop
    :title="title"
    :subtitle="subtitle"
    :text="text"
    :get-in-touch-url="getInTouchUrl"
    class="SectionTopProducts section-top-products"
  >
    <template #right>
      <div class="section-top-products__background ">
        <VImage
          loading="lazy"
          :src="image"
          fit="contain"
          :alt="`Products ${title} top background`"
        />
      </div>
    </template>
  </VSectionTop>
</template>

<style lang="scss">
.section-top-products {

  &__background {
    max-width: 341.337px;
    max-height: 352px;
    width: auto !important;
    height: 100% !important;
    position: relative;

    @include media-lte(tablet) {
      max-width: 190.27px;
    }
    @include media-gt(tablet) {
      right: -0.337px;
      bottom: -47px;
    }
  }
}
</style>
