<script lang="ts" setup>
import { ref, computed, defineProps } from 'vue';

const props = defineProps<{
  id: string | number;
}>();

const emit = defineEmits(['ready']);

const video = ref<HTMLIFrameElement | null>(null);
let readyResolver: () => void;
const readyPromise = new Promise<void>((resolve) => {
  readyResolver = resolve;
});

const src = computed(() => `https://www.youtube.com/embed/${props.id}?showinfo=0&enablejsapi=1&version=3&playerapiid=ytplayer`);

const play = async () => {
  await readyPromise;
  video.value?.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
    '*',
  );
};

const pause = async () => {
  await readyPromise;
  video.value?.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }),
    '*',
  );
};

const mute = async () => {
  await readyPromise;
  video.value?.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func: 'mute', args: '' }),
    '*',
  );
};

const onLoad = () => {
  readyResolver();
  emit('ready');
};

defineExpose({
  play,
  pause,
  mute,
});
</script>

<template>
  <iframe
    ref="video"
    :src="src"
    allowfullscreen
    webkitallowfullscreen
    mozallowfullscreen
    class="VVideoEmbeddedYoutube"
    @load="onLoad"
  />
</template>
