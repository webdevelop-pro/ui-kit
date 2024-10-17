<script lang="ts" setup>
import { ref, computed, defineProps, onMounted } from 'vue';

const props = defineProps<{
  id: string | number;
}>();

const emit = defineEmits(['ready']);

const video = ref<HTMLIFrameElement | null>(null);
let readyResolver: () => void;
const readyPromise = new Promise<void>((resolve) => {
  readyResolver = resolve;
});

const src = computed(() => {
  return `https://www.youtube.com/embed/${props.id}?showinfo=0&enablejsapi=1&version=3&playerapiid=ytplayer`;
});

const play = async () => {
  await readyPromise;
  video.value?.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
    '*'
  );
};

const pause = async () => {
  await readyPromise;
  video.value?.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }),
    '*'
  );
};

const mute = async () => {
  await readyPromise;
  video.value?.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: 'mute', args: '' }),
    '*'
  );
};

const onLoad = () => {
  readyResolver();
  emit('ready');
};
</script>

<template>
  <iframe
    :src="src"
    ref="video"
    allowfullscreen
    webkitallowfullscreen
    mozallowfullscreen
    @load="onLoad"
    class="BaseVideoEmbeddedYoutube"
  />
</template>
