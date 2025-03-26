import { ref } from 'vue';

export function useApiFetch() {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const fetchData = async (url, options = {}) => {
    loading.value = true;
    error.value = null;
    data.value = null;

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      data.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    data, error, loading, fetchData,
  };
}
