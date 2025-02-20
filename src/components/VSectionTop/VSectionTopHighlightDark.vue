<script setup lang="ts">
import { PropType } from 'vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import VCardCheckmarked, { ICheckmarkedItem } from 'UiKit/components/VCard/VCardCheckmarked.vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import { filterPages } from 'UiKit/helpers/allData';
import { data as allPages } from '@/store/all.data';
import { IFrontmatter } from 'UiKit/types/types';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import arrowIcon from 'UiKit/assets/images/arrow-right.svg';
import VSection from 'UiKit/components/VSection/VSection.vue';

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

const getStarted = filterPages(allPages as IFrontmatter[], 'slug', 'get-started');
</script>

<template>
  <VSection class="VSectionTopHighlightDark v-section-top-highlight-dark">
    <div class="v-section-top-highlight-dark__container">
      <div class="v-section-top-highlight-dark__top">
        <div class="v-section-top-highlight-dark__content with-default-distance">
          <slot name="content">
            <h1 v-if="data.title">
              {{ data.title }}
            </h1>
            <p
              v-if="data.subtitle"
              class="v-section-top-highlight-dark__subheading is--subheading-1"
            >
              {{ data.subtitle }}
            </p>
            <div
              class="v-section-top-highlight-dark__button-wrap is--margin-top-0"
            >
              <VButton
                as="a"
                :href="encodeURI(`${getStarted[0].url}?topic=${topic}`)"
                size="large"
              >
                Get In Touch
              </VButton>
              <VButton
                v-if="data.isCaseStudy"
                as="a"
                :href="encodeURI(data.caseStudyLink)"
                size="large"
                variant="link"
              >
                Learn More in Use Cases
                <component
                  :is="arrowIcon"
                  class="v-section-top-highlight-dark__button-icon"
                />
              </VButton>
            </div>
          </slot>
        </div>
        <slot name="right">
          <VImage
            v-if="props.data.imageMobile && props.data.image"
            :src="isTablet ? props.data.imageMobile : props.data.image"
            alt="highlight top image"
            fit="cover"
            class="v-section-top-highlight-dark__image "
          />
        </slot>
      </div>
      <div
        v-if="data.checkedItems"
        class="is--margin-top-60"
      >
        <VCardCheckmarked
          v-for="(item, i) in data.checkedItems"
          :key="i"
          dark-mode
          icon="hollow"
          :title="item.title"
          :description="item.description"
        />
      </div>
      <slot />
    </div>
  </VSection>
</template>

<style lang="scss">
.v-section-top-highlight-dark {
  color: $white;

  &__container {
    padding: 130px;
    gap: 80px;
    background-color: $black;
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

  &__image {
    max-width: 313px;
    min-height: 392px;
    width: 100%;
    border-radius: 2px;

    @include media-lte(tablet) {
      min-height: 380px;
      height: 380px;
    }
  }
}
</style>

