<script setup lang="ts">
import {
  computed, onBeforeUnmount, onMounted, ref, watch,
} from 'vue';
import VSpinner from 'UiKit/components/Base/VSpinner/VSpinner.vue';

const HUBSPOT_ORIGIN = 'https://meetings.hubspot.com';

const emit = defineEmits<{
  (e: 'loaded'): void;
  (e: 'scheduled'): void;
}>();

const props = withDefaults(defineProps<{
  url: string;
  title?: string;
  height?: number;
}>(), {
  title: 'HubSpot Meetings',
  height: 600,
});

const isLoading = ref(true);
const iframeKey = ref(0);

const embedUrl = computed(() => {
  if (!props.url) return '';
  if (props.url.includes('embed=true')) return props.url;
  const separator = props.url.includes('?') ? '&' : '?';
  return `${props.url}${separator}embed=true`;
});

const handleLoad = () => {
  if (isLoading.value) {
    isLoading.value = false;
    emit('loaded');
  }
};

const handleHubspotMessage = (event: MessageEvent) => {
  if (event.origin !== HUBSPOT_ORIGIN) return;
  const payload = event.data as Record<string, unknown>;
  if (payload?.meetingBookSucceeded) {
    emit('scheduled');
  }
};

watch(() => props.url, () => {
  isLoading.value = true;
  iframeKey.value += 1;
});

onMounted(() => {
  window.addEventListener('message', handleHubspotMessage);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handleHubspotMessage);
});
</script>

<template>
  <div class="VEmbedHubspot embed-hubspot">
    <div
      v-show="isLoading"
      class="embed-hubspot__loader"
      :style="{ height: `${props.height}px` }"
    >
      <VSpinner show />
    </div>
    <iframe
      v-show="!isLoading"
      :key="iframeKey"
      :src="embedUrl"
      :title="props.title"
      class="embed-hubspot__iframe"
      :style="{ height: `${props.height}px` }"
      @load="handleLoad"
    />
  </div>
</template>

<style lang="scss">
.embed-hubspot {
  width: 100%;
  position: relative;

  &__iframe {
    width: 100%;
    border: none;
    margin: 10px 0;
  }

  &__loader {
    width: 100%;
    margin: 10px 0;
  }
}
</style>

