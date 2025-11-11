import { acceptHMRUpdate, defineStore } from 'pinia';

// Type declaration for window.analytics
declare global {
  interface Window {
    analytics?: any;
  }
}

export const useSegment = defineStore('segment', () => {
  const analyticsTrack = (event: string, options?: object) => {
    if (typeof window !== 'undefined' && window.analytics && typeof window.analytics.track === 'function') {
      window.analytics.track(event, options);
    }
  };

  const analyticsPage = (name: string, options?: object) => {
    if (typeof window !== 'undefined' && window.analytics && typeof window.analytics.page === 'function') {
      window.analytics.page(name, options);
    }
  };

  return {
    analyticsPage,
    analyticsTrack,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSegment, import.meta.hot));
}
