<script setup lang="ts">
import { PropType } from 'vue';
import VCardTag from 'UiKit/components/Cards/VCardTag.vue';
import VCardWithNumber from 'UiKit/components/Cards/VCardWithNumber.vue';
import VListsCaption from 'UiKit/components/Lists/VListsCaption.vue';
import VImage from 'UiKit/components/VImage/VImage.vue';

export interface IShortTitleWithTwoColDataData {
  title?: string;
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
  mobileReverse?: boolean;
}

defineProps({
  data: {
    type: Object as PropType<IShortTitleWithTwoColDataData[][]>,
    required: true,
  },
  bordered: Boolean,
});
</script>

<template>
  <section class="VSectionTwoColImage v-section-two-col-image">
    <div
      v-for="(itemWrap, i) in data"
      :key="i"
      class="v-section-two-col-image__wrap"
      :class="{ 'is--bordered': bordered }"
    >
      <div
        v-for="(itemCol, ic) in itemWrap"
        :key="ic"
        class="v-section-two-col-image__top-item"
        :class="{
          'is--centered': itemCol.isCentered,
          'is--image-small-height': itemCol.imageSmallHeight,
          'is--mobile-reverse': itemCol.mobileReverse,
        }"
      >
        <h3 v-if="itemCol.title">
          {{ itemCol.title }}
        </h3>
        <p
          v-if="itemCol.subtitle"
          :class="{ 'is--subheading-2': itemCol.isSubheading }"
          v-html="itemCol.subtitle"
        />
        <div
          v-if="itemCol.cardItems"
          class="v-section-two-col-image__top-cards"
        >
          <VCardTag
            v-for="(tagCard, j) in itemCol.cardItems"
            :key="j"
            :tag-text="tagCard.tagText"
            :text="tagCard.text"
            :tag-color="tagCard.tagColor"
          />
        </div>
        <div
          v-if="itemCol.cardNumbered"
          class="v-section-two-col-image__numbered-wrap is--card"
        >
          <VCardWithNumber
            v-for="(itemNumbered, inumb) in itemCol.cardNumbered"
            :key="inumb"
            :index="inumb + 1"
            :text="itemNumbered"
          />
        </div>

        <VImage
          v-if="itemCol.imageBody"
          loading="lazy"
          fit="contain"
          class="is--no-margin"
          :src="itemCol.imageBody"
          alt="column image"
        />

        <VListsCaption
          v-if="itemCol.captions"
          :items="itemCol.captions"
          class="is--margin-top-20"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.v-section-two-col-image {
  $root: &;

  width: 100%;

  &__title-wrap {
    margin-bottom: 60px;
  }

  &__wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 130px;;
    align-items: center;

    @include media-lte(tablet) {
      grid-template-columns: repeat(1, 1fr);
      gap: 40px;
    }

    &:not(.is--bordered ) {
      margin-top: 60px;
      & + & {
        margin-top: 80px;
      }
    }

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
    @include media-lte(tablet) {
      &.is--mobile-reverse {
        order: 1;
      }
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

  .is--image-small-height {
    #{$root}__body-image {
      @include media-gt(tablet) {
        max-height: 320px;
      }
    }
  }

  img {
    width: auto;
  }
}
</style>
