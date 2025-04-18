/* eslint-disable no-restricted-globals */
import { ref, onMounted, onBeforeUnmount } from 'vue';

const patchHistoryMethods = () => {
  ['pushState', 'replaceState'].forEach((method) => {
    const original = history[method as 'pushState'];
    history[method as 'pushState'] = function (...args) {
      const result = original.apply(this, args);
      window.dispatchEvent(new Event(method.toLowerCase()));
      return result;
    };
  });
};

export function useReactiveQuery() {
  const query = ref(new URLSearchParams(window.location.search));

  const update = () => {
    query.value = new URLSearchParams(window.location.search);
  };

  onMounted(() => {
    patchHistoryMethods();
    window.addEventListener('popstate', update);
    window.addEventListener('pushstate', update);
    window.addEventListener('replacestate', update);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('popstate', update);
    window.removeEventListener('pushstate', update);
    window.removeEventListener('replacestate', update);
  });

  return query;
}
