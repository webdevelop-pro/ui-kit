import { IFrontmatter } from '@/types/types';

export const urlFormat = (url: string, data: IFrontmatter[]) => {
  if(data !== undefined) {
    data.forEach((data, idx) => {
      // create algorithm to remove empty folders
      // if <fileName.md> not in foldersName
      // remove folder
    });
  }
  const removeFolders = [
    'wiki/',
    'CORE SYSTEMS/',
    'FINANCE & TRANSACTIONS/',
    'INTEGRATION & OPTIMIZATION/',
    'SECURITY & COMPLIANCE/',
    'FINANCIAL ECOSYSTEM/',
    'INTELLIGENT ECOSYSTEM/',
  ];
  let cleanUrl = url;
  removeFolders.forEach((path, idx) => {
    cleanUrl = cleanUrl.replace(path, '');
    cleanUrl = cleanUrl.replace(path.toLowerCase(), '');
  });
  cleanUrl = cleanUrl.replace(/[^\w./-]+/g, '-').replace(/\s+/g, '-').toLowerCase();
  return cleanUrl;
}

export function urlSearchParamsToObject(params: URLSearchParams): Record<string, string> {
  const obj: Record<string, string> = {};
  params.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}
