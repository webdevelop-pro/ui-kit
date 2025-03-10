<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { getImageTitle } from 'UiKit/helpers/utils/text';
import VVideoThumb from 'UiKit/components/VVideoEmbedded/VVideoThumb.vue';
import VVideoEmbedded from 'UiKit/components/VVideoEmbedded/VVideoEmbedded.vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import {
  VCarouselContent, VCarousel, VCarouselPrevious, VCarouselNext,
  VCarouselItem, CarouselApi,
} from './Base/VCarousel';
import { watchOnce } from '@vueuse/core';

const props = defineProps({
  name: String,
  files: {
    type: Array,
    default: () => [],
  },
  activeItemByUrl: Boolean,
});

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

function getMetaOrder(item) {
  if (item?.meta_data) return item.meta_data?.order || 999;
  return 999;
}
const itemsNumber = computed(() => props.files.length);
const sortedFiles = computed(() => {
  const items = props.files.slice();
  return items.sort((a, b) => getMetaOrder(a) - getMetaOrder(b));
});

const isFirstItemVideo = computed(() => Boolean(sortedFiles.value[0]?.url));

const queryMedia = computed(() => new URLSearchParams(window.location.search).get('media'));

const setUrl = (newItemNumber: number) => {
  const currentUrl = new URL(window.location.href);
  if (newItemNumber === 0) {
    currentUrl.searchParams.delete('media'); // Remove `media` if index is 0
  } else {
    currentUrl.searchParams.set('media', newItemNumber.toString());
  }
  window.history.replaceState(null, '', currentUrl.toString());
};

function setActiveItemNumberByURL(currentItemNumberByURL = queryMedia.value) {
  const numberFromURL = Number(currentItemNumberByURL || 0);
  if (
    Number.isNaN(numberFromURL)
    || numberFromURL < 0
    || numberFromURL > itemsNumber.value - 1
  ) {
    selectedIndex.value = 0;
  } else {
    selectedIndex.value = numberFromURL;
  }
  setUrl(selectedIndex.value);
  emblaMainApi.value?.scrollTo(selectedIndex.value);
}

watch(
  () => [queryMedia.value, emblaMainApi.value],
  () => {
    if (props.activeItemByUrl && emblaMainApi.value && queryMedia.value) {
      setActiveItemNumberByURL(queryMedia.value);
    }
  },
  { immediate: true },
);

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  emblaMainApi.value.scrollTo(index);
}

watchOnce(emblaMainApi, (value) => {
  if (!value) return;

  onSelect();
  value.on('select', onSelect);
  value.on('reInit', onSelect);
});

watch(() => selectedIndex.value, () => {
  setUrl(selectedIndex.value);
});
</script>

<template>
  <div class="v-carousel-default">
    <VCarousel
      class="v-carousel-default__slider-main"
      :opts="{
        align: 'start',
        ...props.options,
      }"
      orientation="horizontal"
      @init-api="(val) => emblaMainApi = val"
    >
      <VCarouselPrevious
        class="v-carousel-default__prev is--margin-top-0"
        variant="tetriary"
      />
      <VCarouselNext
        class="v-carousel-default__next is--margin-top-0"
        variant="tetriary"
      />
      <VCarouselContent class="v-carousel-default__content">
        <VCarouselItem
          v-for="(item, index) in sortedFiles"
          :key="index"
          class="v-carousel-default__item"
        >
          <VVideoEmbedded
            v-if="item.video"
            :url="item.video"
            :alt="item.name"
            :active="Boolean(selectedIndex === index)"
            :auto-play="Boolean(selectedIndex === 0 && isFirstItemVideo)"
          />
          <VImage
            v-else
            :src="item.meta_data?.big"
            :alt="name || item.name"
            :title="getImageTitle(name, item.name)"
            itemprop="image"
            loading="eager"
          />
          <div
            v-if="!item.url && item.description"
            class="v-carousel-default__item-description"
            itemprop="description"
          >
            <p class="small-text">
              {{ item.description }}
            </p>
          </div>
        </VCarouselItem>
      </VCarouselContent>
    </VCarousel>
    <VCarousel
      class="v-carousel-default__slider-thumbs"
      @init-api="(val) => emblaThumbnailApi = val"
    >
      <VCarouselContent>
        <VCarouselItem
          v-for="(item, index) in sortedFiles"
          :key="index"
          class="v-carousel-default__thumb-item"
          :class="{ 'is--active': index === selectedIndex }"
          @click="onThumbClick(index)"
        >
          <VVideoThumb
            v-if="item.video"
            :url="item.video"
            :title="item.name"
            loading="eager"
          />
          <VImage
            v-else
            :src="item.meta_data?.small"
            :alt="name || item.name"
            fit="cover"
            :title="getImageTitle(name, item.name)"
            itemprop="image"
            loading="eager"
            class="is--margin-top-0"
          />
        </VCarouselItem>
      </VCarouselContent>
    </VCarousel>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as *;
.v-carousel-default{
  height: 100%;
  width: 100%;
  user-select: none;
  background-color: colors.$gray-10;
  overflow: hidden;

  &__slider-main,
  &__slider-thumbs{
    position: relative;
    display: flex;
    flex-direction: row;
    position: relative;
  }

  &__slider-main{
    height: 80%;
    width: 100%;
  }

  &__item{
      max-width: 100%;
      width: 100% !important;
      flex-shrink: 0;
      height: 100%;
      position: relative;
      transition-property: transform;
      text-align: center;
      font-size: 18px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background-size: cover;
      background-position: center;

      img:not(.is--default-image){
        display: block;
        width: 100%;
      }
      .is--default-image{
        max-height: 40%;
      }
  }

  &__slider-thumbs{
    height: 20%;
    padding: 10px 0 0;
  }
  &__thumb-item {
    height: 100%;
    opacity: 0.4;
    transition: all 0.3s ease;
    cursor: pointer;
    max-width: 150px;

    &:hover,
    &.is--active{
      opacity: 1;
      filter: none;
      transition: all 0.3s ease;
    }

    .v-image {
      width: 100%;
      height: 100%;
    }

    @media screen and (max-width: $tablet){
      max-width: 110px;
    }
  }

  &__prev,
  &__next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    transition: all 0.3s ease;
    opacity: 0.8;
  }

  &__prev {
    left: 0;
  }

  &__next {
    right: 0;
  }
}
</style>
