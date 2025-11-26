<script setup lang="ts">
import {
  nextTick, onBeforeUnmount, onMounted, ref, watch,
} from 'vue';
import VSpinner from 'UiKit/components/Base/VSpinner/VSpinner.vue';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
      }) => void;
    };
  }
}

const emit = defineEmits<{
  (e: 'loaded'): void;
  (e: 'scheduled'): void;
}>();

const props = withDefaults(defineProps<{
  url: string;
  height?: number;
  minWidth?: number;
  prefill?: Record<string, unknown>;
  utm?: Record<string, unknown>;
}>(), {
  height: 700,
  minWidth: 320,
});

const calendlyScriptSrc = 'https://assets.calendly.com/assets/external/widget.js';
const calendlyStyleHref = 'https://assets.calendly.com/assets/external/widget.css';

let calendlyScriptPromise: Promise<void> | null = null;
let calendlyStylePromise: Promise<void> | null = null;

const containerRef = ref<HTMLElement | null>(null);
const isLoading = ref(true);
let iframeRef: HTMLIFrameElement | null = null;
let mutationObserver: MutationObserver | null = null;

const loadCalendlyStyle = () => {
  if (typeof document === 'undefined') {
    return Promise.resolve();
  }
  if (calendlyStylePromise) return calendlyStylePromise;

  calendlyStylePromise = new Promise<void>((resolve) => {
    const existingLink = document.querySelector(`link[href="${calendlyStyleHref}"]`) as HTMLLinkElement | null;
    if (existingLink) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = calendlyStyleHref;
    link.onload = () => resolve();
    link.onerror = () => resolve();
    document.head.appendChild(link);
  });

  return calendlyStylePromise;
};

const loadCalendlyScript = () => {
  if (typeof document === 'undefined') {
    return Promise.resolve();
  }

  if (calendlyScriptPromise) {
    return calendlyScriptPromise;
  }

  calendlyScriptPromise = new Promise<void>((resolve) => {
    if (window.Calendly) {
      resolve();
      return;
    }

    const existingScript = document.querySelector(`script[src="${calendlyScriptSrc}"]`) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => resolve(), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = calendlyScriptSrc;
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });

  return calendlyScriptPromise;
};

const cleanupIframeListeners = () => {
  if (iframeRef) {
    iframeRef.removeEventListener('load', handleIframeLoad);
    iframeRef = null;
  }
  if (mutationObserver) {
    mutationObserver.disconnect();
    mutationObserver = null;
  }
};

const markLoaded = () => {
  if (isLoading.value) {
    isLoading.value = false;
    emit('loaded');
  }
};

const handleIframeLoad = () => {
  markLoaded();
};

const observeIframe = () => {
  if (!containerRef.value) return;
  const iframe = containerRef.value.querySelector('iframe');
  if (iframe) {
    iframeRef = iframe as HTMLIFrameElement;
    iframeRef.addEventListener('load', handleIframeLoad, { once: true });
    return;
  }

  cleanupIframeListeners();
  mutationObserver = new MutationObserver(() => {
    const createdIframe = containerRef.value?.querySelector('iframe');
    if (createdIframe) {
      iframeRef = createdIframe as HTMLIFrameElement;
      iframeRef.addEventListener('load', handleIframeLoad, { once: true });
      cleanupIframeListeners();
    }
  });
  mutationObserver.observe(containerRef.value, { childList: true, subtree: true });
};

const initCalendlyWidget = async () => {
  if (!props.url || typeof window === 'undefined') return;
  isLoading.value = true;
  await Promise.all([loadCalendlyStyle(), loadCalendlyScript()]);

  if (!window.Calendly || !containerRef.value) {
    markLoaded();
    return;
  }

  containerRef.value.innerHTML = '';
  window.Calendly.initInlineWidget({
    url: props.url,
    parentElement: containerRef.value,
    prefill: props.prefill,
    utm: props.utm,
  });

  await nextTick();
  observeIframe();
};

const parseEventData = (data: unknown) => {
  if (typeof data === 'string') {
    if (data === 'calendly.event_scheduled') {
      return { event: data };
    }
    try {
      return JSON.parse(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  }
  return data as Record<string, unknown>;
};

const handleCalendlyMessage = (event: MessageEvent) => {
  if (event.origin !== 'https://calendly.com') return;
  const payload = parseEventData(event.data);
  if (payload?.event === 'calendly.event_scheduled') {
    emit('scheduled');
  }
};

onMounted(() => {
  window.addEventListener('message', handleCalendlyMessage);
  initCalendlyWidget();
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handleCalendlyMessage);
  cleanupIframeListeners();
});

watch(() => [props.url, props.prefill, props.utm], () => {
  initCalendlyWidget();
}, { deep: true });
</script>

<template>
  <div class="VEmbedCalendly embed-calendly">
    <div
      v-show="isLoading"
      class="embed-calendly__loader"
      :style="{ height: `${props.height}px` }"
    >
      <VSpinner show />
    </div>
    <div
      v-show="!isLoading"
      ref="containerRef"
      class="embed-calendly__container"
      :style="{ minWidth: `${props.minWidth}px`, height: `${props.height}px` }"
    />
  </div>
</template>

<style lang="scss">
.embed-calendly {
  width: 100%;
  position: relative;

  &__loader {
    width: 100%;
    margin: 10px 0;
  }

  &__container {
    width: 100%;
  }
}
</style>

