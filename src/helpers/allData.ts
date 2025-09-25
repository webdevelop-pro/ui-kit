import { IFrontmatter } from 'UiKit/types/types';

// General function to find elements by a specified filterName and filterValue
export function getPages(data: IFrontmatter[], filterFuncs = [], sortFuncs = []) {
  data = data.filter((item:any) => item.draft !== true);
  filterFuncs.forEach((filterFunc) => {
    data = filterFunc(data);
  });
  sortFuncs.forEach((sortFunc) => {
    data = sortFunc(data);
  });
  return data;
}

// General function to find elements by a specified filterName and filterValue
export function filterByKeyVal(key: keyof IFrontmatter, val: string) {
  return (data: IFrontmatter[]) => data.filter((item:any) => item[key] === val);
}

// Function to sort elements by frontmatter.order (stable sort)
export function sortByOrder(data: IFrontmatter[]) {
  return data.sort((a: IFrontmatter, b: IFrontmatter) => {
    const orderA = a.order ?? 0; // Default to 0 if order is undefined
    const orderB = b.order ?? 0;

    // If order is the same, maintain existing order (stable sort)
    if (orderA === orderB) {
      return 0;
    }

    return orderB - orderA;
  });
}


// Function to sort elements by frontmatter.publishDate
export function sortByPublishDate(data: IFrontmatter[]) {
  return data.sort((a, b) => {
    const dateA = new Date(String(a.publishDate || ''));
    const dateB = new Date(String(b.publishDate || ''));
    
    // Handle invalid dates by putting them at the end
    const timeA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();
    const timeB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();
    
    return timeB - timeA; // Sort by newest first
  });
}

// Function to sort elements by frontmatter.publishDate
export function sortByDate(data: [], key: string, order: 'ascending' | 'descending' = 'ascending') {
  if (order === 'ascending') {
    return data.sort((a, b) => (
      +new Date(String(a[key])) - +new Date(String(b[key]))));
  }
  return data.sort((a, b) => (
    +new Date(String(b[key])) - +new Date(String(a[key]))));
}

export function filterPages(
  data: IFrontmatter[],
  key: keyof IFrontmatter,
  val: string,
) {
  return getPages(data, [filterByKeyVal(key, val)], [sortByOrder, sortByPublishDate]);
}
