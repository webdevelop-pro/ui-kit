import { IFrontmatter } from 'UiKit/types/types';

// General function to find elements by a specified filterName and filterValue
export function filterElements(data: IFrontmatter[], filterName: keyof IFrontmatter, filterValue: string) {
  return data.filter((item) => item[filterName]?.toLowerCase() === filterValue.toLowerCase());
}

// Function to sort elements by frontmatter.order
export function sortElementsByOrder(data: IFrontmatter[]) {
  return data.sort((a, b) => {
    const orderA = a.order ?? 0; // Default to 0 if order is undefined
    const orderB = b.order ?? 0;

    return orderA - orderB;
  });
}

// Function to sort elements by frontmatter.publishDate
export function sortElementsByPublishDate(data: IFrontmatter[]) {
  return data.sort((a, b) => (
    +new Date(String(b.publishDate)) - +new Date(String(a.publishDate))));
}

export function filterAndSortByOrderElements(
  data: IFrontmatter[],
  filterName: keyof IFrontmatter,
  filterValue: string,
  withDraft: boolean = false,
) {
  let filteredData = [];
  if (!withDraft) {
    const withoutDraftData = data.filter((post) => !post.draft);
    filteredData = filterElements(withoutDraftData, filterName, filterValue);
  } else {
    filteredData = filterElements(data, filterName, filterValue);
  }
  return sortElementsByOrder(filteredData);
}

export function filterAndSortByPublishDateElements(
  data: IFrontmatter[],
  filterName: keyof IFrontmatter,
  filterValue: string,
  withDraft: boolean = false,
) {
  let filteredData = [];
  if (!withDraft) {
    const withoutDraftData = data.filter((post) => !post.draft);
    filteredData = filterElements(withoutDraftData, filterName, filterValue);
  } else {
    filteredData = filterElements(data, filterName, filterValue);
  }
  return sortElementsByPublishDate(filteredData);
}
