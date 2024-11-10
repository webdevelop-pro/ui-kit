export const urlFormat = (url: string) => url.replace(/[^\w./-]+/g, '-').replace(/\s+/g, '-').toLowerCase();

export function urlSearchParamsToObject(params: URLSearchParams): Record<string, string> {
  const obj: Record<string, string> = {};
  params.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}
