<script lang="ts" setup>
import {
  ref, computed, watch, onMounted,
} from 'vue';
import { getVideoMeta } from 'UiKit/helpers/utils/video';
import VImage from '../Base/VImage/VImage.vue';

const props = withDefaults(defineProps<{
  url: string | undefined;
  fit?: 'cover' | 'contain' | 'inherit';
}>(), {
  fit: 'cover',
});
const imgUrl = ref<string | null>(null);
const imageFallback = ref(false);
const img = ref<HTMLElement | null>(null);

const videoMeta = computed(() => getVideoMeta(props.url));
const id = computed(() => videoMeta.value?.id);
const service = computed(() => videoMeta.value?.service);

const src = computed(() => {
  switch (service.value) {
    case 'youtube': {
      const quality = imageFallback.value ? 'hq' : 'sd';
      return `https://i.ytimg.com/vi/${id.value}/${quality}default.jpg`;
    }
    case 'vimeo':
      return `https://vimeo.com/api/v2/video/${id.value}.json`;
    default:
      return '';
  }
});

const setVimeoImgUrl = async () => {
  try {
    const response = await fetch(src.value);
    const data = await response.json();
    imgUrl.value = data[0].thumbnail_small;
  } catch (error) {
    console.error('Failed to fetch Vimeo thumbnail:', error);
  }
};

const setImgUrl = () => {
  switch (service.value) {
    case 'youtube':
      imgUrl.value = src.value;
      break;
    case 'vimeo':
      void setVimeoImgUrl();
      break;
    default:
      break;
  }
};


const checkImage = (url: string) => {
  const img = new Image();
  img.addEventListener('error', () => {
    imageFallback.value = true;
  });
  img.src = url;
};

// Watchers
watch(videoMeta, setImgUrl);
watch(imageFallback, setImgUrl);
watch(() => props.url, (newUrl) => {
  checkImage(newUrl);
}, { immediate: true });

onMounted(() => {
  setImgUrl();
});
</script>

<template>
  <div
    v-if="url"
    ref="img"
    class="VVideoThumb v-video-thumb"
  >
    <VImage
      :src="imgUrl"
      :fit="fit"
      alt="video thumb image"
      class="v-video-thumb__image"
    />
    <slot name="playIcon">
      <div class="v-video-thumb__play-icon">
        <div class="v-video-thumb__triangle" />
      </div>
    </slot>
  </div>
</template>


<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-video-thumb{
  max-height: 100%;
  height: 100%;
  width: auto;
  position: relative;

  &__image {
    width: 100%;
    height: 100%;
  }


  &__play-icon{
    width: 20px;
    height: 20px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.3s ease;
  }

  &__triangle{
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 3.5px 0 3.5px 7px;
    border-color: transparent transparent transparent colors.$white;
    position: absolute;
    left: 52%;
    top: 50%;
    border-radius: 0;
    transform: translate(-50%, -50%);
  }
}
</style>
