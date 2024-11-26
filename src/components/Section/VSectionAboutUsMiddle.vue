<script setup lang="ts">
import VButton from 'UiKit/components/VButton/VButton.vue';
import { VSvgIcon } from 'UiKit/components/VSvgIcon';
import VImage from 'UiKit/components/VImage/VImage.vue';
import { PropType } from 'vue';
import { filterPages } from 'UiKit/helpers/allData';
import { data as allPages } from '@/store/all.data';
import { IFrontmatter } from 'UiKit/types/types';

export interface IAboutUsMiddle {
  title: string;
  background: string;
  items: {
    title: string;
    text: string;
    showCareersButton: boolean;
  };
}

defineProps({
  data: {
    type: Object as PropType<IAboutUsMiddle>,
    required: true,
  },
});

const careers = filterPages(allPages as IFrontmatter[], 'slug', 'careers');
</script>

<template>
  <div class="VSectionAboutUsMiddle about-us-middle">
    <div class="is--container">
      <h2>
        {{ data.title }}
      </h2>

      <div class="about-us-middle__wrap is--margin-top-60 is--gap-80">
        <div class="about-us-middle__left">
          <div
            v-for="(item, index) in data.items"
            :key="index"
            class="about-us-middle__item"
          >
            <h3>
              {{ item.title }}
            </h3>
            <p v-html="item.text" />
            <VButton
              v-if="item.showCareersButton"
              tag="a"
              :href="careers[0].url"
              size="large"
              variant="link"
              icon-placement="right"
            >
              Careers
              <VSvgIcon
                name="arrow-right"
              />
            </VButton>
          </div>
        </div>
        <div
          class="about-us-middle__background"
        >
          <VImage
            :src="data.background"
            alt="about us middle image"
            class="about-us-middle__background-image is--no-margin"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.about-us-middle {

  &__item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;

    & + & {
      border-top: 1px solid $gray-40;
      padding-top: 60px;
      margin-top: 60px;
    }
  }

  &__left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1; // Add this line
  }

  &__wrap {
    position: relative;
    display: flex;

    @include media-lte(tablet) {
      flex-direction: column;
    }
  }

  &__background {
    border-radius: 2px;
    max-height: 100%; // Adjusted
    @include media-gt(tablet) {
      flex: 1; // Adjusted
    }

    @include media-lte(tablet) {
      height: 477px;
    }
  }
}
</style>
