<script setup lang="ts">
import {
  DialogRoot, type DialogRootEmits, type DialogRootProps, useForwardPropsEmits,
} from 'radix-vue';
import {
  computed,
  onMounted,
  onUnmounted,
  shallowRef,
  watch,
} from 'vue';
import {
  ensureLocationChangeHistoryPatched,
  LOCATION_CHANGE_EVENT,
} from 'UiKit/composables/locationChange';

const props = defineProps<DialogRootProps & {
  queryKey?: string;
  queryValue?: string;
}>();

const emits = defineEmits<DialogRootEmits>();

const delegatedProps = computed(() => {
  const {
    queryKey: unusedQueryKey,
    queryValue: unusedQueryValue,
    ...delegated
  } = props;

  void unusedQueryKey;
  void unusedQueryValue;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const isClient = typeof window !== 'undefined';
const resolvedQueryKey = computed(() => props.queryKey || 'dialog');
const resolvedQueryValue = computed(() => props.queryValue ?? 'true');
const buildRelativeUrl = (url: URL) => `${url.pathname}${url.search}${url.hash}`;

const readOpenFromUrl = () => {
  if (!isClient) {
    return false;
  }

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(resolvedQueryKey.value) === resolvedQueryValue.value;
};

const writeOpenToUrl = (isOpen: boolean) => {
  if (!isClient) {
    return;
  }

  const url = new URL(window.location.href);
  const currentValue = url.searchParams.get(resolvedQueryKey.value);

  if (isOpen) {
    if (currentValue === resolvedQueryValue.value) {
      return;
    }

    url.searchParams.set(resolvedQueryKey.value, resolvedQueryValue.value);
  } else {
    // Shared popup dialogs must only clear query values they own.
    if (currentValue !== resolvedQueryValue.value) {
      return;
    }

    url.searchParams.delete(resolvedQueryKey.value);
  }

  window.history.replaceState(window.history.state, '', buildRelativeUrl(url));
};

const open = shallowRef<boolean>(readOpenFromUrl() || Boolean(props.open));

const syncOpenFromUrl = () => {
  const nextOpen = readOpenFromUrl();

  if (open.value !== nextOpen) {
    open.value = nextOpen;
  }
};

watch(open, (newVal) => {
  emits('update:open', newVal);
  writeOpenToUrl(newVal);
}, { immediate: true });

watch(() => props.open, (newVal) => {
  if (typeof newVal !== 'boolean' || open.value === newVal) {
    return;
  }

  open.value = newVal;
});

watch([resolvedQueryKey, resolvedQueryValue], () => {
  syncOpenFromUrl();
});

onMounted(() => {
  if (!isClient) {
    return;
  }

  ensureLocationChangeHistoryPatched();
  window.addEventListener('popstate', syncOpenFromUrl);
  window.addEventListener(LOCATION_CHANGE_EVENT, syncOpenFromUrl);
});

onUnmounted(() => {
  if (!isClient) {
    return;
  }

  window.removeEventListener('popstate', syncOpenFromUrl);
  window.removeEventListener(LOCATION_CHANGE_EVENT, syncOpenFromUrl);
});
</script>

<template>
  <DialogRoot
    v-bind="forwarded"
    :open="open"
    class="VDialog v-dialog"
  >
    <slot />
  </DialogRoot>
</template>
