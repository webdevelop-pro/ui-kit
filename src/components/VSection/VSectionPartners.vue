<script setup lang="ts">
import { PropType } from 'vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VSection from 'UiKit/components/VSection/VSection.vue';

// TODO: add option to load as svg

interface IVPartners {
  id: number;
  icon: string;
}

defineProps({
  title: String, // Title to display at the top of the section
  items: {
    type: Array as PropType<IVPartners[]>,
    required: true,
  },
});
</script>

<template>
  <VSection class="VSectionPartners v-section-partners ">
    <h2
      v-if="title"
      class="is--h6__title"
    >
      {{ title }}
    </h2>
    <div class="v-section-partners__slider">
      <div
        v-for="item in items"
        :key="item.id"
        class="v-section-partners__slider-item"
      >
        <VImage
          :src="item.icon"
          alt="Partner logo"
          fit="contain"
          loading="lazy"
          class="v-section-partners__image"
        />
      </div>
    </div>
  </VSection>
</template>

<style lang="scss">
.v-section-partners {
  .is--h6__title {
    text-align: center;
    margin-bottom: 30px;
    color: $gray-70;
    @include media-lte(tablet) {
      margin-bottom: 20px;
    }
  }

  &__slider-item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 75px;
    max-width: 175px;
    max-height: 40px;
    @include media-lte(tablet) {
      max-height: 23px;
    }
    @include media-gt(tablet) {
      margin: 0 15px 0;
    }
  }

  &__slider {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    @include media-lte(desktop) {
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  &__image {
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    filter: grayscale(100%);
    filter: grayscale(1);
    transition: all 0.2s ease;

    &:hover {
      filter: grayscale(0);
      opacity: 1;
      transition: all 0.2s ease;
    }
  }
}
</style>
