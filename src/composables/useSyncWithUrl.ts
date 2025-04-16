import {
  ref, watch, computed, Ref,
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
  const paramValue = computed(() => new URLSearchParams(window.location.search).get(key));

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
  };

  watch(paramValue, (newQuery) => {
    state.value = parse(newQuery) ?? defaultValue;
  }, { immediate: true });

  watch(state, (newVal) => {
    if (syncToUrl) {
      updateUrl(newVal);
    }
  });
  return state;
}
