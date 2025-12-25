import { IFrontmatter } from 'UiKit/types/types';

export function formatMenu(data: IFrontmatter[], path?: string) {
  return data
    .filter((item: IFrontmatter & { footerNav?: boolean }) => item.footerNav !== false)
    .map((item: IFrontmatter) => ({
      href: item.url,
      text: item.title,
      frontmatter: item,
      active: path ? item.url === path : false,
    }));
}

type MenuItem = { frontmatter: IFrontmatter; href: string; text: string; active?: boolean };

export function formatItemsBySubfolder(items: IFrontmatter[], filterByNav = false, path?: string, columnOrder?: string[]) {
  const groupedUseCases: Record<string, MenuItem[]> = {};

  // Iterate over the use cases and group them by subfolder
  items.forEach((item: IFrontmatter & { nav?: boolean; rawUrl?: string }) => {
    // Optionally skip items that are not marked for menu
    if (filterByNav && item.nav !== true) return;

    const parts = (item.rawUrl || item.url || '').split('/');
    const subfolder = (parts[2] || '').toUpperCase();

    if (!groupedUseCases[subfolder]) {
      groupedUseCases[subfolder] = [];
    }

    groupedUseCases[subfolder].push({
      frontmatter: item,
      href: item.url || '',
      text: item.title,
      active: path ? item.url === path : false,
    });
  });

  // Get all folders that have items
  const allFolders = Object.keys(groupedUseCases).filter(key => groupedUseCases[key].length > 0);

  // If columnOrder is provided, use it to order columns
  let orderedFolders: string[];
  if (columnOrder && columnOrder.length > 0) {
    // Normalize columnOrder to uppercase for comparison
    const normalizedOrder = columnOrder.map(f => f.toUpperCase());
    // Use the provided order, but only include folders that actually exist
    orderedFolders = normalizedOrder.filter(folder => allFolders.includes(folder));
    // Add any remaining folders that weren't in the order list
    const remainingFolders = allFolders.filter(folder => !normalizedOrder.includes(folder));
    orderedFolders = [...orderedFolders, ...remainingFolders];
  } else {
    orderedFolders = allFolders;
  }

  // Format the grouped use cases into the desired structure
  const formattedArray = orderedFolders.map((key) => [
    { text: key.replace('-', ' ') },
    ...groupedUseCases[key],
  ]);

  return formattedArray;
}
