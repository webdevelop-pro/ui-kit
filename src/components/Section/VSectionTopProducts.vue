<script setup lang="ts">
import VButton from 'UiKit/components/VButton/VButton.vue';
import VImage from 'UiKit/components/VImage/VImage.vue';

defineProps({
  title: String,
  subtitle: String,
  description: String,
  image: String,
  buttonLink: String,
});
</script>

<template>
  <section
    class="SectionTopProducts section-top-products"
  >
    <div class="is--container">
      <div class="section-top-products__content">
        <h1 v-if="title">
          {{ title }}
        </h1>
        <p
          v-if="subtitle"
          class="is--subheading-1"
        >
          {{ subtitle }}
        </p>
        <p
          v-if="description"
          v-html="description"
        />
        <slot />
        <VButton
          v-if="buttonLink"
          tag="a"
          :href="buttonLink"
          icon-placement="right"
          size="large"
        >
          <slot name="button" />
        </VButton>
      </div>
      <VImage
        loading="lazy"
        :src="image"
        fit="contain"
        :alt="`Products ${title} top background`"
        class="section-top-products__background is--no-margin"
      />
    </div>
  </section>
</template>

<style lang="scss">
.section-top-products {

  .is--container {
    position: relative;
    display: flex;
    align-items: center;
    @include media-gt(tablet) {
      justify-content: space-between;
    }
    @include media-lte(tablet) {
      flex-direction: column;
    }
  }

  &__content {
    width: 100%;
    @include media-gt(tablet) {
      max-width: 653px;
    }
    @include media-lte(tablet) {
      margin-bottom: 60px;
    }
  }

  &__button-icon {
    color: $white;
    width: 16px;
  }

  &__button-text {
    display: flex;
    align-items: center;
    gap: 6px;
  }

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
