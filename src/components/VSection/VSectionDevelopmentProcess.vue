<script setup lang="ts">
import { PropType } from 'vue';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';
import CheckmarkedItem, { ICheckmarkedItem } from 'UiKit/components/VCard/VCardCheckmarked.vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VSection from 'UiKit/components/VSection/VSection.vue';

const { isTablet } = storeToRefs(useBreakpoints());

interface IProcess {
  title: string;
  subtitle: string;
  imageSmall: string;
  image: string;
  items: ICheckmarkedItem[];
}

defineProps({
  data: {
    type: Object as PropType<IProcess>,
    required: true,
  },
});

</script>

<template>
  <VSection class="VSectionDevelopmentProcess development-process">
    <div class="development-process__container">
      <div class="development-process__left">
        <h2>
          {{ data.title }}
        </h2>
        <p class="is--subheading-1">
          {{ data.subtitle }}
        </p>
        <div class="is--margin-top-40">
          <CheckmarkedItem
            v-for="(item, i) in data.items"
            :key="i"
            :title="item.title"
            :description="item.text"
            class="development-process__item"
          />
        </div>
      </div>
      <div class="development-process__right">
        <VImage
          :src="isTablet ? data.imageSmall : data.image"
          alt="development process image"
          class="development-process__image is--margin-top-0"
        />
      </div>
    </div>
  </VSection>
</template>

<style lang="scss">
.development-process {
  width: 100%;

  &__container {
    display: flex;
    flex-direction: row;

    @include media-lte(tablet) {
      flex-direction: column;
    }
  }

  &__right {
    width: 100%;
    height: auto;
    max-width: 313px;
    border-radius: 2px;

    @include media-lte(tablet) {
      max-width: 100%;
      width: 100%;
      margin-top: 60px;
    }

    @include media-gt(tablet) {
      margin-left: 180px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;

    @include media-lte(tablet) {
      min-height: 300px;
    }
  }
}
</style>
