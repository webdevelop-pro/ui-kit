<script setup lang="ts">
import {
  PropType, onBeforeMount, onBeforeUnmount, ref,
} from 'vue';
import { IMessageArrayItem } from '../types';
import VSpinner from 'UiKit/components/Base/VSpinner/VSpinner.vue';

const emit = defineEmits(['success']);

const props = defineProps({
  message: Object as PropType<IMessageArrayItem>,
});

const isLoading = ref(true);

const trackSuccess = (event) => {
  // eslint-disable-next-line
  if (event.origin !== 'https://meetings.hubspot.com') {
    return;
  }
  // eslint-disable-next-line
  if (event.data.meetingBookSucceeded) {
    emit('success', props.message);
  }
};

const handleLoad = () => {
  isLoading.value = false;
};
onBeforeMount(() => {
  window.addEventListener('message', trackSuccess);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', trackSuccess);
});
</script>

<template>
  <div class="ChatEmbedCode chat-embed-code">
    <div
      v-show="isLoading"
      class="chat-embed-code__loader"
    >
      <VSpinner show />
    </div>
    <iframe
      v-show="!isLoading"
      :src="message?.message?.code"
      :title="message?.id"
      class="chat-embed-code__iframe"
      @load="handleLoad"
    />
  </div>
</template>

<style lang="scss">
.chat-embed-code {
  $root: &;

  display: flex;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  position: relative;

  &__iframe {
    width: 100%;
    min-height: 600px;
    margin: 10px 0;
  }

  &__loader {
    width: 100%;
    height: 600px;
    margin: 10px 0;
  }
}
</style>
