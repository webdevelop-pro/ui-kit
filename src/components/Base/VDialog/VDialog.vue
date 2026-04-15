<script setup lang="ts">
import {
  DialogRoot, type DialogRootEmits, type DialogRootProps,
} from 'reka-ui';
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  shallowRef,
  watch,
} from 'vue';
import {
  ensureLocationChangeHistoryPatched,
  LOCATION_CHANGE_EVENT,
} from 'UiKit/composables/locationChange';

const props = defineProps</* @vue-ignore */ DialogRootProps & {
  queryKey?: string;
  queryValue?: string;
}>();

const emits = defineEmits</* @vue-ignore */ DialogRootEmits>();
const instance = getCurrentInstance();

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

const hasControlledOpen = () => {
  const vnodeProps = instance?.vnode.props;
  return vnodeProps != null && ('open' in vnodeProps || 'onUpdate:open' in vnodeProps);
};

const open = shallowRef<boolean>(
  readOpenFromUrl() || (hasControlledOpen() && Boolean(props.open)),
);

const syncOpenFromUrl = () => {
  const nextOpen = readOpenFromUrl();

  if (open.value !== nextOpen) {
    open.value = nextOpen;
  }
};

const handleOpenChange = (nextOpen: boolean) => {
  if (open.value === nextOpen) {
    return;
  }

  open.value = nextOpen;
};

watch(open, (newVal) => {
  emits('update:open', newVal);
  writeOpenToUrl(newVal);
}, { immediate: true });

watch(() => props.open, (newVal) => {
  if (!hasControlledOpen() || typeof newVal !== 'boolean' || open.value === newVal) {
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

  syncOpenFromUrl();
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
    v-bind="delegatedProps"
    :open="open"
    @update:open="handleOpenChange"
    class="VDialog v-dialog"
  >
    <slot />
  </DialogRoot>
</template>
