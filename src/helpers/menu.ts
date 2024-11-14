import { IFrontmatter } from 'UiKit/types/types';

export function formatMenu(data: IFrontmatter[]) {
  return data.map((item: IFrontmatter) => ({
    link: item.url,
    text: item.title,
    frontmatter: item,
  }));
}

export function formatItemsBySubfolder(items: IFrontmatter[]) {
  const groupedUseCases = {};

  // Iterate over the use cases and group them by subfolder
  items.forEach((item: IFrontmatter) => {
    const parts = item.url?.split('/');
    const subfolder = parts[2].toUpperCase();

    if (!groupedUseCases[subfolder]) {
      groupedUseCases[subfolder] = [];
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    groupedUseCases[subfolder].push({
      frontmatter: item,
      link: item.url,
      text: item.title,
    });
  });

  // Format the grouped use cases into the desired structure
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const formattedArray = Object.entries(groupedUseCases).map(([key, value]) => [
    { text: key.replace('-', ' ') },
    ...value,
  ]);

  return formattedArray;
}
