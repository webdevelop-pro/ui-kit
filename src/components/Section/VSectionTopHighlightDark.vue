<script setup lang="ts">
import { PropType } from 'vue';
import VButton from 'UiKit/components/VButton/VButton.vue';
import VCardCheckmarked, { ICheckmarkedItem } from 'UiKit/components/Cards/VCardCheckmarked.vue';
import VSvgIcon from 'UiKit/components/VSvgIcon/VSvgIcon.vue';
import VImage from 'UiKit/components/VImage/VImage.vue';
import { filterAndSortByOrderElements } from 'UiKit/helpers/allData';
import { data as allPages } from '@/store/all.data';
import { IFrontmatter } from 'UiKit/types/types';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';

const { isTablet } = useBreakpoints();

export interface IHighlightTop {
  image: string;
  imageMobile: string;
  title?: string;
  subtitle?: string;
  route?: string;
  isCaseStudy?: boolean;
  checkedItems?: ICheckmarkedItem[];
  topic?: string;
  caseStudyLink: string;
}

const props = defineProps({
  data: {
    type: Object as PropType<IHighlightTop>,
    required: true,
  },
  topic: String,
});

const getStarted = filterAndSortByOrderElements(allPages as IFrontmatter[], 'slug', 'get-started');
</script>

<template>
  <div class="VSectionTopHighlightDark v-section-top-highlight-dark">
    <div class="is--container">
      <div class="v-section-top-highlight-dark__container">
        <div class="v-section-top-highlight-dark__top">
          <div class="v-section-top-highlight-dark__content">
            <h1
              v-if="data.title"
              :class="{ 'is--h1__mobile': isTablet } "
            >
              {{ data.title }}
            </h1>
            <p
              v-if="data.subtitle"
              class="v-section-top-highlight-dark__subheading is--subheading-1"
            >
              {{ data.subtitle }}
            </p>
            <div
              class="v-section-top-highlight-dark__button-wrap"
            >
              <VButton
                tag="a"
                :href="`${getStarted[0].url}?topic=${topic}`"
                size="large"
                icon-placement="right"
              >
                Get In Touch
              </VButton>
              <VButton
                v-if="data.isCaseStudy"
                tag="a"
                :href="data.caseStudyLink"
                icon-placement="right"
                size="large"
                variant="link"
              >
                Learn More in Use Cases
                <VSvgIcon
                  name="arrow-right"
                  class="v-section-top-highlight-dark__button-icon"
                />
              </VButton>
            </div>
          </div>
          <div class="v-section-top-highlight-dark__background">
            <VImage
              :src="isTablet ? props.data.imageMobile : props.data.image"
              alt="highlight top image"
              class="v-section-top-highlight-dark__background-image is--no-margin"
            />
          </div>
        </div>
        <div
          v-if="data.checkedItems"
          class="v-section-top-highlight-dark__checked-items"
        >
          <VCardCheckmarked
            v-for="(item, i) in data.checkedItems"
            :key="i"
            dark-mode
            icon="hollow"
            :title="item.title"
            :description="item.description"
            class="v-section-top-highlight-dark__checked-item"
          />
        </div>
        <div class="v-section-top-highlight-dark__additional-content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.v-section-top-highlight-dark {
  color: $white;

  &__container {
    padding: 130px;
    gap: 80px;
    background-color: $black;
    color: $white;
    @include media-lte(tablet) {
      padding: 40px;
    }
  }

  &__top {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 80px;
    align-self: stretch;
    @include media-lte(tablet) {
      flex-direction: column;
      gap: 60px;
    }
  }

  &__subheading {
    color: $white;
  }

  &__button-wrap {
    gap: 8px;
    display: flex;
    align-items: end;
    margin: 0 !important;

    @include media-lte(tablet) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
    }
  }

  &__button-icon {
    color: inherit;
    width: 18px;
  }

  &__background {
    max-width: 313px;
    min-height: 392px;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    @include media-lte(tablet) {
      min-height: 380px;
      height: 380px;
      align-self: stretch;
      margin: 0 auto;
    }
  }

  &__background-image {
    min-height: 376px;
  }

  &__checked-items {
    margin-top: 60px;
  }
}
</style>

