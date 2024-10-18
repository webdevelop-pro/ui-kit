<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { getVideoMeta } from 'UiKit/helpers/utils/video';

const props = defineProps<{
  url: string;
}>();

const imgUrl = ref<string | null>(null);
const imageFallback = ref(false);
const img = ref<HTMLElement | null>(null);

const videoMeta = computed(() => getVideoMeta(props.url));
const id = computed(() => videoMeta.value.id);
const service = computed(() => videoMeta.value.service);

const style = computed(() => {
  return imgUrl.value
    ? { backgroundImage: `url(${imgUrl.value})` }
    : {};
});

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

const setImgUrl = () => {
  switch (service.value) {
    case 'youtube':
      imgUrl.value = src.value;
      break;
    case 'vimeo':
      setVimeoImgUrl();
      break;
  }
};

const setVimeoImgUrl = async () => {
  try {
    const response = await fetch(src.value);
    const data = await response.json();
    imgUrl.value = data[0].thumbnail_small;
  } catch (error) {
    console.error('Failed to fetch Vimeo thumbnail:', error);
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
    :style="style"
    class="BaseVideoThumb base-video-thumb"
  >
    <slot name="playIcon" />
  </div>
</template>


<style lang="sass">
@import 'UiKit/styles/_colors.sass'
.base-video-thumb
  max-height: 100%
  width: 100%
  height: 100%
  position: relative
  background-size: cover
</style>
