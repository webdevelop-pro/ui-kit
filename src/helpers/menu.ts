import { IFrontmatter } from 'UiKit/types/types';

export function formatMenu(data: IFrontmatter[], path?: string) {
  return data.map((item: IFrontmatter) => ({
    href: item.url,
    text: item.title,
    frontmatter: item,
    active: path ? item.url === path : false,
  }));
}

type MenuItem = { frontmatter: IFrontmatter; href: string; text: string; active?: boolean };

export function formatItemsBySubfolder(items: IFrontmatter[], filterByNav = false, path?: string) {
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

  // Format the grouped use cases into the desired structure
  const formattedArray = Object.entries(groupedUseCases)
    .filter(([, value]) => value.length > 0) // Skip groups with no items
    .map(([key, value]) => [
      { text: key.replace('-', ' ') },
      ...value,
    ]);

  return formattedArray;
}
