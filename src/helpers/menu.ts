import { IFrontmatter } from 'UiKit/types/types';

export function formatMenu(data: IFrontmatter[]) {
  return data.map((item: IFrontmatter) => ({
    href: item.url,
    text: item.title,
    frontmatter: item,
  }));
}

export function formatItemsBySubfolder(items: IFrontmatter[]) {
  const groupedUseCases = {};

  // Iterate over the use cases and group them by subfolder
  items.forEach((item: IFrontmatter) => {
    const parts = item.rawUrl?.split('/');
    const subfolder = parts[2].toUpperCase();

    if (!groupedUseCases[subfolder]) {
      groupedUseCases[subfolder] = [];
    }

    groupedUseCases[subfolder].push({
      frontmatter: item,
      href: item.url,
      text: item.title,
    });
  });

  // Format the grouped use cases into the desired structure
  const formattedArray = Object.entries(groupedUseCases).map(([key, value]) => [
    { text: key.replace('-', ' ') },
    ...value,
  ]);

  return formattedArray;
}
