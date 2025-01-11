<script setup lang="ts">
import { PropType, onBeforeMount, onBeforeUnmount } from 'vue';
import { IMessageArrayItem } from '../types';

const emit = defineEmits(['success']);

const props = defineProps({
  message: Object as PropType<IMessageArrayItem>,
});

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
onBeforeMount(() => {
  window.addEventListener('message', trackSuccess);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', trackSuccess);
});
</script>

<template>
  <div class="ChatEmbedCode chat-embed-code">
    <iframe
      :src="message?.message?.code"
      :title="message?.id"
      class="chat-embed-code__iframe"
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

  &__iframe {
    width: 100%;
    min-height: 600px;
    margin: 10px 0;
  }
}
</style>
