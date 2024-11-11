<script setup>
import { ref, computed, watch } from 'vue';
import { getImageTitle } from 'UiKit/helpers/utils/text';
import BaseVideoThumb from 'UiKit/components/BaseVideoEmbedded/BaseVideoThumb.vue';
import BaseVideoEmbedded from 'UiKit/components/BaseVideoEmbedded/BaseVideoEmbedded.vue';
import BaseImage from 'UiKit/components/BaseImage/BaseImage.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Thumbs } from 'swiper/modules';

const props = defineProps({
  name: String,
  files: {
    type: Array,
    default: () => [],
  },
  activeItemByUrl: Boolean,
  queryMedia: String,
});

const emit = defineEmits(['click', 'setUrl']);

const modules = [Navigation, Thumbs];
const thumbsSwiper = ref(null);
const mainSwiperInstance = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};


const activeItem = ref(0);

const itemsNumber = computed(() => props.files.length);
const sortedFiles = computed(() => {
  const items = props.files.slice();
  return items.sort((a, b) => getMetaOrder(a) - getMetaOrder(b));
});

const isFirstItemVideo = computed(() => Boolean(sortedFiles.value[0]?.url));

function getMetaOrder(item) {
  if (item.meta_data) return item.meta_data?.order || 999;
  return 999;
}

const queryMedia = computed(() => props.queryMedia);

function setActiveItemNumberToURL() {
  const currentItemNumberByURL = Number(queryMedia.value || 0);
  let newItemNumber = activeItem.value;
  if (currentItemNumberByURL === newItemNumber) return;
  if (!newItemNumber) {
    if (currentItemNumberByURL === undefined) return;
    newItemNumber = undefined;
  }
  emit('setUrl', newItemNumber);
}

function setActiveItemNumberByURL(currentItemNumberByURL = queryMedia.value) {
  const numberFromURL = Number(currentItemNumberByURL || 0);
  if (
    Number.isNaN(numberFromURL) ||
    numberFromURL < 0 ||
    numberFromURL > itemsNumber.value - 1
  ) {
    activeItem.value = 0;
    setActiveItemNumberToURL();
    mainSwiperInstance.value?.slideTo(activeItem.value);
  } else {
    activeItem.value = numberFromURL;
    mainSwiperInstance.value?.slideTo(activeItem.value);
  }
}

function onSlideChange(swiper) {
  activeItem.value = swiper.activeIndex;
}

const onSwiper = (instance) => {
  mainSwiperInstance.value = instance;
}

const onClick = () => {
  emit('click');
}

watch(activeItem, () => {
  if (props.activeItemByUrl) setActiveItemNumberToURL();
});

watch( () => [queryMedia.value, mainSwiperInstance.value], () => {
    if (props.activeItemByUrl && mainSwiperInstance.value && queryMedia.value) {
      setActiveItemNumberByURL(queryMedia.value);
    }
  },
  { immediate: true }
);

</script>


<template>
	<div class="BaseCarousel base-carousel is--no-margin" itemscope itemtype="http://schema.org/ImageGallery">
		<Swiper
      :modules="modules"
      navigation
      :slides-per-view="1"
      :thumbs="{ swiper: thumbsSwiper }"
      class="base-carousel__slider-main"
      @slideChange="onSlideChange"
      @swiper="onSwiper"
		>
		  <SwiperSlide
        v-for="(item, index) in sortedFiles"
        :key="index"
      >
        <BaseVideoEmbedded
          v-if="item.video"
          :url="item.video"
          :alt="item.name"
          :active="Boolean(activeItem === index)"
          :auto-play="Boolean(activeItem === 0 && isFirstItemVideo)"
          @click="onClick"
        />
        <BaseImage
          v-else
          :src="item.meta_data?.big"
          :alt="name || item.name"
          :title="getImageTitle(name, item.name)"
          itemprop="image"
          @click="onClick"
        />
        <div class="base-slider__item--description" v-if="!item.url && item.description">
          <p class="small-text">{{ item.description }}</p>
        </div>
		  </SwiperSlide>
		</Swiper>
    <Swiper
      @swiper="setThumbsSwiper"
      :spaceBetween="10"
      :slidesPerView="8"
      :modules="modules"
      class="base-carousel__slider-thumbs"
    >
      <SwiperSlide
        v-for="(item, index) in sortedFiles"
        :key="index"
      >
        <BaseVideoThumb v-if="item.video" :url="item.video" :title="item.name">
          <template v-slot:playIcon>
            <div class="play-icon">
              <div class="triangle"></div>
            </div>
          </template>
        </BaseVideoThumb>
        <BaseImage
          v-else
          :src="item.meta_data?.small"
          :alt="name || item.name"
          :title="getImageTitle(name, item.name)"
          itemprop="image"
        />
      </SwiperSlide>
    </Swiper>
	</div>
</template>


<style lang="sass">
@use 'index.sass' as *
.base-carousel
  height: 100%
  width: 100%
  user-select: none
  background-color: $base-carousel-background-color
  overflow: hidden

  .base-carousel__slider-main,
  .base-carousel__slider-thumbs
    position: relative
    display: flex
    flex-direction: row
    position: relative

  .base-carousel__slider-main
    height: $base-carousel-main-height
    width: 100%

    .swiper-slide
      max-width: 100%
      width: 100% !important
      flex-shrink: 0
      height: 100%
      position: relative
      transition-property: transform 
      text-align: center
      font-size: 18px
      background: #fff
      display: flex
      justify-content: center
      align-items: center
      background-size: cover
      background-position: center

      img:not(.is--default-image)
        display: block
        width: 100%
      .is--default-image
        max-height: $base-carousel-main-default-image-height

  .base-carousel__slider-thumbs
    height: $base-carousel-thumbs-height
    padding: 10px 0 0
    .swiper-slide
      height: 100%
      opacity: $base-carousel-thumbs-opacity
      transition: all 0.3s ease
      &:hover, .swiper-slide-thumb-active
        filter: none
        .play-icon
          opacity: 1
          transition: all 0.3s ease
    .swiper-slide-thumb-active
      opacity: 1
      transition: all 0.3s ease

  .swiper-wrapper
    position: relative
    width: 100%
    height: 100%
    z-index: 1
    display: flex
    box-sizing: content-box

  .swiper-button-prev,
  .swiper-button-next
    position: absolute
    right: 0
    top: 50%
    transform: translateY(-50%)
    width: $base-carousel-navigation-width
    height: $base-carousel-navigation-height
    z-index: 2
    cursor: pointer
    padding: 12px
    transition: all 0.3s ease
    background-color: $base-carousel-navigation-background
    opacity: 0.8
    &.swiper-button-disabled
      opacity: 0.3
      pointer-events: none

    &:hover
      opacity: 1
      background-color: $base-carousel-navigation-hover-background
      transition: all 0.3s ease

  .swiper-button-prev
    left: 0
    background-image: url("UiKit/assets/arrow-left-primary.svg?url")
    background-repeat: no-repeat
    background-size: 20px
    background-position: center

  .swiper-button-next
    right: 0
    background-image: url("UiKit/assets/arrow-right-primary.svg?url")
    background-repeat: no-repeat
    background-size: 20px
    background-position: center


  .play-icon
    width: 20px
    height: 20px
    background: rgba(0, 0, 0, 0.6)
    border-radius: 100px
    position: absolute
    left: 50%
    top: 50%
    z-index: 2
    transform: translate(-50%, -50%)
    cursor: pointer
    opacity: 0.6
    transition: all 0.3s ease
  .triangle
    width: 0
    height: 0
    border-style: solid
    border-width: 3.5px 0 3.5px 7px
    border-color: transparent transparent transparent $base-carousel-border-color
    position: absolute
    left: 52%
    top: 50%
    border-radius: 0
    transform: translate(-50%, -50%)
</style>