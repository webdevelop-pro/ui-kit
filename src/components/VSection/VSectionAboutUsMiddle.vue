<script setup lang="ts">
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import { PropType } from 'vue';
import { filterPages } from 'UiKit/helpers/allData';
import { data as allPages } from '@/store/all.data';
import { IFrontmatter } from 'UiKit/types/types';
import ArrowRight from 'UiKit/assets/images/arrow-right.svg';
import VSectionTwoCol from 'UiKit/components/VSection/VSectionTwoCol.vue';
import VSeparator from 'UiKit/components/Base/VSeparator/VSeparator.vue';

export interface IAboutUsMiddle {
  title: string;
  background: string;
  items: {
    title: string;
    text: string;
    showCareersButton: boolean;
  }[];
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
  <VSectionTwoCol
    :title="data.title"
    class="VSectionAboutUsMiddle about-us-middle"
  >
    <template #infoShort>
      <slot name="infoShort" />
    </template>

    <div class="about-us-middle__left with-default-distance">
      <div
        v-for="(item, index) in data.items"
        :key="index"
        class="about-us-middle__item"
      >
        <h3>
          {{ item.title }}
        </h3>
        <p
          v-html="item.text"
        />
        <VButton
          v-if="item.showCareersButton"
          as="a"
          :href="encodeURI(careers[0]?.url)"
          size="large"
          variant="link"
          class="is--margin-top-40"
        >
          Careers
          <component
            :is="ArrowRight"
          />
        </VButton>
        <VSeparator />
      </div>
    </div>
    <div class="about-us-middle__image-wrap">
      <VImage
        :src="data.background"
        fit="cover"
        alt="about us middle image"
        class="about-us-middle__image is--margin-top-0"
      />
    </div>
  </VSectionTwoCol>
</template>

<style lang="scss">
.about-us-middle {

  &__item {
    &:last-child {
      .v-separator {
        display: none;
      }
    }
  }

  .v-separator {
    margin: 60px 0;
  }

  &__left {
    display: flex;
    flex-direction: column;
    flex: 1; // Add this line
    padding-bottom: 40px;
    
    @media screen and (width < $tablet) {
      padding-bottom: 20px;
    }
  }

  &__image-wrap {
    height: 100%;
    width: 100%;
    border-radius: 2px;
    overflow: hidden;
    position: relative;

    @media screen and (width > $tablet) {
      flex: 1; // Adjusted
    }

    @media screen and (width < $tablet) {
      height: 477px;
    }
  }

  &__image {
    position: absolute; /* Position the image to cover its parent */
    top: 0;
    left: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    object-fit: cover;
  }
}
</style>
