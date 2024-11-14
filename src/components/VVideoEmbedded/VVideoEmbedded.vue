<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { getVideoMeta } from 'UiKit/helpers/utils/video';
import VVideoEmbeddedYoutube from './VVideoEmbeddedYoutube.vue';
import VVideoEmbeddedVimeo from './VVideoEmbeddedVimeo.vue';

// to install all
// yarn add @vimeo/player

const props = defineProps({
  url: String,
  active: Boolean,
  autoPlay: Boolean,
});

const player = ref<HTMLVideoElement | null>(null);

const videoMeta = computed(() => (props.url && getVideoMeta(props.url)) || {});
const id = computed(() => videoMeta.value.id);
const service = computed(() => videoMeta.value.service);
const componentName = computed(() => {
  if (service.value === 'youtube') return VVideoEmbeddedYoutube;
  if (service.value === 'vimeo') return VVideoEmbeddedVimeo;
  return null;
});

const play = () => {
  if (player.value) player.value.play();
};
const pause = () => {
  if (player.value) player.value.pause();
};
const mute = () => {
  if (player.value) player.value.mute();
};
const onReady = () => {
  if (props.autoPlay && props.active) runAutoPlay();
};
const runAutoPlay = async () => {
  await mute();
  play();
};

watch(() => props.active, () => {
  if (!props.active) pause();
});
</script>

<template>
  <component
    :is="componentName"
    :id="id"
    ref="player"
    frameborder="0"
    width="100%"
    height="100%"
    class="VVideoEmbedded"
    @ready="onReady"
  />
</template>

<style lang="sass">
</style>
