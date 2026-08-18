import { useRoute, RouteLocationRaw } from 'vue-router';

function getParsedUrlParamsBySearch(searchString: string): Record<string, string> {
  if (!searchString) return {};
  let query = searchString;
  if (query.startsWith('?')) query = query.substring(1);
  const pairs = query.split('&');
  if (!pairs || !pairs.length) return {};
  const result: Record<string, string> = {};
  pairs.forEach((param) => {
    const [key, value] = param.split('=');
    result[decodeURIComponent(key)] = decodeURIComponent(value || '');
  });
  return result;
}

function getSearchParamsByUrl(url: string): Record<string, string> {
  const urlList = url.split('?');
  const params = getParsedUrlParamsBySearch(urlList[1]);
  return params;
}

export const useRedirect = () => {
  const route = useRoute();

  const pushTo = (params: RouteLocationRaw) => {
    if (route?.query?.redirect) {
      const redirect = route?.query?.redirect as string;
      return {
        path: redirect,
        query: getSearchParamsByUrl(redirect),
      };
    }
    return params;
  };

  return {
    pushTo,
  };
};
