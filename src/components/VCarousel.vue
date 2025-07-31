<script setup lang="ts">
import { ref, computed } from 'vue';
import { getImageTitle } from 'UiKit/helpers/utils/text';
import VVideoThumb from 'UiKit/components/VVideoEmbedded/VVideoThumb.vue';
import VVideoEmbedded from 'UiKit/components/VVideoEmbedded/VVideoEmbedded.vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import {
  VCarouselContent, VCarousel, VCarouselPrevious, VCarouselNext,
  VCarouselItem, CarouselApi,
} from './Base/VCarousel';
import { watchOnce } from '@vueuse/core';
import { useSyncWithUrl } from 'UiKit/composables/useSyncWithUrl';

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
// const selectedIndex = ref(0);

const selectedIndex = useSyncWithUrl<number>({
  key: 'media',
  defaultValue: 0,
  syncToUrl: props.activeItemByUrl,
  parse: (val) => {
    const num = Number(val);
    return Number.isNaN(num) ? 0 : num;
  },
});

function getMetaOrder(item) {
  if (item?.meta_data) return item.meta_data?.order || 999;
  return 999;
}
const itemsNumber = computed(() => props.files.length);
const sortedFiles = computed(() => {
  const items = props.files.slice();
  return items.sort((a, b) => getMetaOrder(a) - getMetaOrder(b));
});

const isFirstItemVideo = computed(() => Boolean(sortedFiles.value[0]?.video));

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
</script>

<template>
  <div class="v-carousel-default">
    <VImage
      v-if="sortedFiles.length === 0"
      alt="default image"
      :title="name"
      itemprop="image"
      loading="eager"
      class="is--default-image"
    />
    <VCarousel
      v-else
      class="v-carousel-default__slider-main"
      :class="{ 'is--slider-active': itemsNumber > 1 }"
      :opts="{
        align: 'start',
        ...props.options,
      }"
      orientation="horizontal"
      @init-api="(val) => emblaMainApi = val"
    >
      <VCarouselPrevious
        v-if="itemsNumber > 1"
        class="v-carousel-default__prev is--margin-top-0"
        variant="tetriary"
      />
      <VCarouselNext
        v-if="itemsNumber > 1"
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
            :src="item.image"
            :alt="name || item.name"
            :title="getImageTitle(name, item.name)"
            itemprop="image"
            loading="eager"
          />
          <div
            v-if="item.description"
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
      v-if="itemsNumber > 1"
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
            :src="item.thumb || item.image"
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
  &__slider-thumbs {
    position: relative;
    display: flex;
    flex-direction: row;
    position: relative;
  }

  &__slider-main {
    height: 100%;
    width: 100%;

    &.is--slider-active {
      height: 80%;
    }
  }

  .is--default-image {
    max-width: 100%;
    width: 100% !important;
    flex-shrink: 0;
    height: 100%;
  }

  &__item {
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
      object-fit: contain;
      margin: 0 auto;
      max-width: 100%;
      max-height: 100%;
    }
    .is--default-image{
      max-height: 40%;
    }
    .v-image {
      height: 100%;
      width: 100%;
    }
  }

  &__slider-thumbs{
    height: 20%;
    padding: 10px 0 0;
  }
  &__thumb-item {
    height: 100%;
    width: 20%;
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
