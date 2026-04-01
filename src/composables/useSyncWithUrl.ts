import {
  ref, watch, computed, Ref, onMounted, onUnmounted,
} from 'vue';
import {
  ensureLocationChangeHistoryPatched,
  LOCATION_CHANGE_EVENT,
} from './locationChange';

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
    ensureLocationChangeHistoryPatched();
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
