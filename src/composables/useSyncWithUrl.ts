import {
  ref, watch, computed, Ref, onMounted, onUnmounted,
} from 'vue';

const LOCATION_CHANGE_EVENT = 'codex:locationchange';
let isHistoryPatched = false;

const dispatchLocationChange = () => {
  window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT));
};

const ensureHistoryPatched = () => {
  if (isHistoryPatched || typeof window === 'undefined') return;

  const { pushState, replaceState } = window.history;

  window.history.pushState = function pushStatePatched(...args) {
    const result = pushState.apply(this, args);
    dispatchLocationChange();
    return result;
  };

  window.history.replaceState = function replaceStatePatched(...args) {
    const result = replaceState.apply(this, args);
    dispatchLocationChange();
    return result;
  };

  isHistoryPatched = true;
};

interface UseSyncWithUrlOptions<T = string> {
  key: string;
  defaultValue: T;
  syncToUrl?: boolean;
  parse?: (val: string | null) => T;
  serialize?: (val: T) => string;
}

/**
 * Syncs a reactive value with the URL query parameter.
 */
export function useSyncWithUrl<T = string>({
  key,
  defaultValue,
  syncToUrl = true,
  parse = (val: string | null) => val as T,
  serialize = (val: T) => String(val),
}: UseSyncWithUrlOptions<T>) {
  const isClient = typeof window !== 'undefined';
  // Use a reactive ref to track URL changes
  const urlSearchParams = ref(new URLSearchParams(isClient ? window.location.search : ''));
  
  const paramValue = computed(() => urlSearchParams.value.get(key));

  const state: Ref<T> = ref(defaultValue) as Ref<T>;

  const updateUrl = (value: T) => {
    if (!isClient) return;
    const url = new URL(window.location.href);
    const stringVal = serialize(value);
    const currentValue = url.searchParams.get(key);

    if (
      (stringVal === serialize(defaultValue) && currentValue === null)
      || currentValue === stringVal
    ) {
      return;
    }

    if (stringVal === serialize(defaultValue)) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, stringVal);
    }
    window.history.replaceState(null, '', url.toString());
  };

  // Listen for browser navigation events
  const handlePopState = () => {
    if (!isClient) return;
    urlSearchParams.value = new URLSearchParams(window.location.search);
  };

  onMounted(() => {
    ensureHistoryPatched();
    window.addEventListener('popstate', handlePopState);
    window.addEventListener(LOCATION_CHANGE_EVENT, handlePopState);
  });

  onUnmounted(() => {
    window.removeEventListener('popstate', handlePopState);
    window.removeEventListener(LOCATION_CHANGE_EVENT, handlePopState);
  });

  watch(paramValue, (newQuery) => {
    const nextValue = syncToUrl ? (parse(newQuery) ?? defaultValue) : defaultValue;
    if (state.value !== nextValue) {
      state.value = nextValue;
    }
  }, { immediate: true });

  watch(state, (newVal) => {
    if (syncToUrl) {
      updateUrl(newVal);
    }
  });
  return state;
}
