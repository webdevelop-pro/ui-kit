<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import { getVideoMeta } from 'UiKit/helpers/utils/video';
import BaseVideoEmbeddedYoutube from './BaseVideoEmbeddedYoutube.vue';
import BaseVideoEmbeddedVimeo from './BaseVideoEmbeddedVimeo.vue';

// to install all 
// yarn add @vimeo/player

const props = defineProps({
    url: String,
    active: Boolean,
    autoPlay: Boolean,
});

const player = ref<HTMLVideoElement | null>(null);

const videoMeta = computed(() => {
    return (props.url && getVideoMeta(props.url)) || {};
})
const id = computed(() => {
    return videoMeta.value.id;
})
const service = computed(() => {
    return videoMeta.value.service;
})
const componentName = computed(() => {
    if (service.value === 'youtube') return BaseVideoEmbeddedYoutube;
    if (service.value === 'vimeo') return BaseVideoEmbeddedVimeo;
    return null;
})

function play() {
    if (player.value) player.value.play();
}
function pause() {
    if (player.value) player.value.pause();
}
function mute() {
    if (player.value) player.value.mute();
}
function onReady() {
    if (this.autoPlay && this.active) this.runAutoPlay();
}
async function runAutoPlay() {
    await mute();
    play();
}

watchEffect(() => {
	if (!props.active) pause();
});
</script>

<template>
	<component
		frameborder="0"
		width="100%"
		height="100%"
		:is="componentName"
		:id="id"
		ref="player"
		@ready="onReady"
		class="BaseVideoEmbedded"
	/>
</template>

<style lang="sass" scoped>
@import 'index.sass'
</style>
