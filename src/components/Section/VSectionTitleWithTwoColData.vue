<script setup lang="ts">
import { defineAsyncComponent, hydrateOnVisible, PropType } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VSectionShort = defineAsyncComponent({
  loader: () => import('UiKit/components/Section/VSectionShort.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VCardWithNumber = defineAsyncComponent({
  loader: () => import('UiKit/components/Cards/VCardWithNumber.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VCardTag = defineAsyncComponent({
  loader: () => import('UiKit/components/Cards/VCardTag.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});

export interface IShortTitleWithTwoColDataData {
  title?: string;
  title2?: string;
  subtitle?: string;
  isSubheading?: boolean;
  isCentered?: boolean;
  cardItems?: {
    tagText: string;
    text: string;
    tagColor: string;
  }[];
  cardNumbered?: string[];
  imageBody?: string;
  imageSmallHeight?: boolean;
  captions?: {
    text: string;
    url?: string;
  }[];
  linkText?: string;
  linkRoute?: string;
  topic?: string;
}

interface ITitleBlockShort {
  title?: string;
  subtitle?: string;
  linkUrl?: string;
  linkText?: string;
}

defineProps({
  data: {
    type: Object as PropType<IShortTitleWithTwoColDataData[][]>,
    required: true,
  },
  dataTitle: {
    type: Object as PropType<ITitleBlockShort>,
  },
  bordered: Boolean,
  topic: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <section class="VSectionTitleWithTwoColData v-section-title-with-two-col-data">
    <div class="is--container">
      <VSectionShort>
        <h2 v-if="dataTitle?.title">
          {{ dataTitle?.title }}
        </h2>
        <p
          v-if="dataTitle?.subtitle"
          class="is--subheading-1"
        >
          {{ dataTitle?.subtitle }}
        </p>
        <a
          v-if="dataTitle?.linkUrl && dataTitle?.linkText"
          class="is--link-1"
          :href="dataTitle?.linkUrl"
        >
          {{ dataTitle?.linkText }}
        </a>
      </VSectionShort>

      <div
        v-for="(itemWrap, i) in data"
        :key="i"
        class="v-section-title-with-two-col-data__wrap is--margin-top-50"
        :class="{ 'is--bordered': bordered }"
      >
        <div
          v-for="(itemCol, ic) in itemWrap"
          :key="ic"
          class="v-section-title-with-two-col-data__top-item"
          :class="{ 'is--centered': itemCol.isCentered, 'is--image-small-height': itemCol.imageSmallHeight }"
        >
          <h3
            v-if="itemCol.title"
          >
            {{ itemCol.title }}
          </h3>
          <h2
            v-if="itemCol.title2"
          >
            {{ itemCol.title2 }}
          </h2>
          <p
            v-if="itemCol.subtitle"
            :class="{ 'is--subheading-2 is--margin-top-24': itemCol.isSubheading }"
            v-html="itemCol.subtitle"
          />
          <div
            v-if="itemCol.cardItems"
            class="v-section-title-with-two-col-data__top-cards"
          >
            <VCardTag
              v-for="(tagCard, j) in itemCol.cardItems"
              :key="j"
              :tag-text="tagCard.tagText"
              :text="tagCard.text"
              :tag-color="tagCard.tagColor"
              class="v-section-title-with-two-col-data__top-card"
            />
          </div>
          <div
            v-if="itemCol.cardNumbered"
            class="v-section-title-with-two-col-data__numbered-wrap is--card"
          >
            <VCardWithNumber
              v-for="(itemNumbered, inumb) in itemCol.cardNumbered"
              :key="inumb"
              :index="inumb + 1"
              :text="itemNumbered"
              class="v-section-title-with-two-col-data__content"
            />
          </div>

          <div
            v-if="itemCol.imageBody"
            class="v-section-title-with-two-col-data__body-image-wrap"
          >
            <img
              class="v-section-title-with-two-col-data__body-image is--no-margin"
              loading="lazy"
              :src="itemCol.imageBody"
              alt="column image"
            >
          </div>

          <div
            v-if="itemCol.captions"
            class="v-section-title-with-two-col-data__captions"
          >
            <div
              v-for="(caption, capInd) in itemCol.captions"
              :key="capInd"
              class="v-section-title-with-two-col-data__caption-item"
            >
              <a
                v-if="caption.url"
                :href="caption.url"
                class="is--link-1"
              >
                {{ caption.text }}
              </a>
              <span class="is--h5__title">
                {{ caption.text }}
              </span>
            </div>
          </div>

          <a
            v-if="itemCol.linkRoute"
            class="v-section-title-with-two-col-data__link is--link-1"
            :href="`${itemCol.linkRoute}?topic=${topic}`"
          >
            {{ itemCol.linkText }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.v-section-title-with-two-col-data {
  $root: &;

  width: 100%;

  &__title-wrap {
    margin-bottom: 60px;
  }

  &__wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 80px;

    @include media-lte(tablet) {
      grid-template-columns: repeat(1, 1fr);
      gap: 60px;
    }

    // &:not(.is--bordered ) {
    //   margin-top: 60px;
    //   & + & {
    //     margin-top: 80px;
    //   }
    // }

    &.is--bordered {
      & + & {
        padding-top: 60px;
        border-top: 1px solid $gray-40;
        margin-top: 60px;
      }
    }
  }

  &__top-item {
    &.is--centered {
      align-self: center;
    }
  }

  &__top-cards {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    align-self: stretch;
  }

  &__numbered-wrap {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  &__body-image-wrap {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__body-image {
    max-width: 100%;
  }

  .is--image-small-height {
    #{$root}__body-image {
      @include media-gt(tablet) {
        max-height: 320px;
      }
    }
  }

  &__captions {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 29px;

    @include media-lte(tablet) {
      grid-template-columns: repeat(1, 1fr);
      gap: 16px;
    }
  }

  &__caption-item {
    display: flex;
    padding: 12px 0;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-bottom: 1px solid $gray-70;
  }

  &__link {
    margin-top: 8px;
    display: block;
  }
}
</style>
