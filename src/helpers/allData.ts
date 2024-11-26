import { IFrontmatter } from 'UiKit/types/types';


// General function to find elements by a specified filterName and filterValue
export function getPages(data: IFrontmatter[], filterFuncs = [], sortFuncs = []) {
  data = data.filter((item:any) => item.draft != true);
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
  return (data: IFrontmatter[]) => {
    return data.filter((item:any) => item[key] === val);
  }
}

// Function to sort elements by frontmatter.order
export function sortByOrder(data: IFrontmatter[]) {
  return data.sort((a: IFrontmatter, b: IFrontmatter) => {
    const orderA = a.order ?? 0; // Default to 0 if order is undefined
    const orderB = b.order ?? 0;

    return orderA - orderB;
  });
}

// Function to sort elements by frontmatter.publishDate
export function sortByPublishDate(data: IFrontmatter[]) {
  return data.sort((a, b) => (
    +new Date(String(b.publishDate)) - +new Date(String(a.publishDate))));
}

export function filterPages(
  data: IFrontmatter[],
  key: keyof IFrontmatter,
  val: string,
) {
  return getPages(data, [filterByKeyVal(key, val)], [sortByOrder, sortByPublishDate]);
}
