<script lang="ts" setup>
import VimeoPlayer from '@vimeo/player';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
  id: [String, Number],
})

const emit = defineEmits(['ready']);

const video = ref<HTMLVideoElement | null>(null);
const ready = ref(false);
const readyPromise = ref<Promise<void> | null>(null);
let readyResolver: () => void;
let player: VimeoPlayer | null = null;

// Create the promise for readiness
readyPromise.value = new Promise<void>((resolve) => {
  readyResolver = resolve;
});

const src = computed(() => `https://player.vimeo.com/video/${props.id}`);


const init = () => {
  player = new VimeoPlayer(video.value);
  player.on('loaded', onLoad);
  player.setMuted(true);
};

const onLoad = () => {
  readyResolver();
  ready.value = true;
  emit('ready');
};

const play = async () => {
  if (readyPromise.value) await readyPromise.value;
  player?.play();
};

const pause = async () => {
  if (readyPromise.value) await readyPromise.value;
  player?.pause();
};

const mute = async () => {
  if (readyPromise.value) await readyPromise.value;
  player?.setMuted(true);
};

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  player?.off('play');
})
</script>

<template>
  <iframe
    :src="src"
    ref="video"
    allowfullscreen
    webkitallowfullscreen
    mozallowfullscreen
    allow="autoplay"
    class="BaseVideoEmbeddedVimeo"
  />
</template>

<style lang="sass" scoped>
</style>
