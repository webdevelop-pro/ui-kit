<script setup lang="ts">
import { PropType } from 'vue';
import { IProcess } from '../utils';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';
import CheckmarkedItem from 'UiKit/components/Cards/VCardCheckmarked.vue';
import VImage from 'UiKit/components/VImage/VImage.vue';

const { isTablet } = storeToRefs(useBreakpoints());

defineProps({
  data: {
    type: Object as PropType<IProcess>,
    required: true,
  },
});

</script>

<template>
  <section class="VSectionDevelopmentProcess development-process">
    <div class="is--container">
      <div class="development-process__container">
        <div class="development-process__left">
          <h2
            class="development-process__title"
            :class="{ 'is--h2__mobile': isTablet } "
          >
            {{ data.title }}
          </h2>
          <p class="is--subheading-1">
            {{ data.subtitle }}
          </p>
          <div class="development-process__items-wrap">
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
            class="development-process__image is--no-margin"
          />
        </div>
      </div>
    </div>
  </section>
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

  &__items-wrap {
    margin-top: 40px !important;
  }
}
</style>
