import {
  ref, watch, computed, Ref, onMounted, onUnmounted,
} from 'vue';

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
  // Use a reactive ref to track URL changes
  const urlSearchParams = ref(new URLSearchParams(window.location.search));
  
  const paramValue = computed(() => urlSearchParams.value.get(key));

  const state: Ref<T> = ref(defaultValue) as Ref<T>;

  const updateUrl = (value: T) => {
    const url = new URL(window.location.href);
    const stringVal = serialize(value);
    if (stringVal === serialize(defaultValue)) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, stringVal);
    }
    window.history.replaceState(null, '', url.toString());
    // Update our reactive ref
    urlSearchParams.value = new URLSearchParams(window.location.search);
  };

  // Listen for browser navigation events
  const handlePopState = () => {
    urlSearchParams.value = new URLSearchParams(window.location.search);
  };

  onMounted(() => {
    window.addEventListener('popstate', handlePopState);
    // Also listen for pushstate/replacestate (these don't trigger popstate)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      handlePopState();
    };
    
    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      handlePopState();
    };
  });

  onUnmounted(() => {
    window.removeEventListener('popstate', handlePopState);
  });

  watch(paramValue, (newQuery) => {
    if (syncToUrl) {
      state.value = parse(newQuery) ?? defaultValue;
    } else {
      state.value = defaultValue;
    }
  }, { immediate: true });

  watch(state, (newVal) => {
    if (syncToUrl) {
      updateUrl(newVal);
    }
  });
  return state;
}
