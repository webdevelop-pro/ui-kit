export const urlFormat = (url: string) => url.replace(/[^\w./-]+/g, '-').replace(/\s+/g, '-').toLowerCase();
