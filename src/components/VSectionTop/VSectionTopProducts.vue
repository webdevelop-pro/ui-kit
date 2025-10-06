<script setup lang="ts">
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VSectionTop from 'UiKit/components/VSectionTop/VSectionTop.vue';

defineProps({
  title: String,
  subtitle: String,
  text: String,
  image: String,
  tagText: String,
  secondaryUrl: String,
  secondaryText: {
    type: String,
    default: 'Learn More in Use Cases',
  },
  mainUrl: String,
  mainText: {
    type: String,
    default: 'Get In Touch',
  },
});
</script>

<template>
  <VSectionTop
    :title="title"
    :subtitle="subtitle"
    :text="text"
    :main-url="mainUrl"
    :tag-text="tagText"
    :secondary-url="secondaryUrl"
    :main-text="mainText"
    :secondary-text="secondaryText"
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
