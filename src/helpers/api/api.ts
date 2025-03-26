/* eslint-disable no-param-reassign */
import { createFetch } from '@vueuse/core';
import { requiredFetchParams } from 'UiKit/helpers/api/requiredFetchParams';
import { ref } from 'vue';

export const useMyFetch = createFetch({
  combination: 'overwrite',
  options: {
    // beforeFetch in pre-configured instance will only run when the newly spawned instance do not pass beforeFetch
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        ...requiredFetchParams().headers,
      };
      options.credentials = requiredFetchParams().credentials;

      return { options };
    },
  },
});

export function useApiRequest<T>(method: 'get' | 'post' | 'put' | 'delete') {
  const data = ref<T | null>(null);
  const error = ref<Response | null>(null);
  const isLoading = ref(false);

  const request = async (url: string, body?: any) => {
    isLoading.value = true;
    error.value = null;

    try {
      const fetchCall = body
        ? useMyFetch(url)[method](body) // If body exists, send it with the request
        : useMyFetch(url)[method]();

      const { data: responseData, error: fetchError } = await fetchCall.json<T>();

      if (fetchError) {
        throw new Error(fetchError.message || 'Request failed');
      }

      data.value = responseData.value || null;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Unknown error');
    } finally {
      isLoading.value = false;
    }
  };

  const reset = () => {
    data.value = null;
    error.value = null;
    isLoading.value = false;
  };

  return {
    data, error, isLoading, request, reset,
  };
}
