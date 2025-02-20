import { watch } from 'vue';
import { pages } from 'UiKit/types/pages';

export interface IBreadcrumbs {
  href: string;
  text: string;
}

export const useBreadcrumbs = (page, frontmatter):IBreadcrumbs[] => {
  let breadcrumbsList:IBreadcrumbs[] = [];
  const currentPage = pages.getPageByURL(frontmatter.value.url);
  if (currentPage == null) {
    console.warn(`page ${frontmatter.value.url} not found in pages`);
    return breadcrumbsList;
  }

  const crumbs = () => {
    breadcrumbsList.splice(0, breadcrumbsList.length);
    breadcrumbsList.push({
      href: '',
      text: frontmatter.value.title,
    });

    let parent = currentPage.parent();
    while(parent != null) {
      if (parent.isVirtual() === false) {
        breadcrumbsList.push({
          href: parent._data.url,
          text: parent._data.title,
        });
      }
      parent = parent.parent();
    }
    breadcrumbsList = breadcrumbsList.reverse();
  };

  watch(() => page.value?.relativePath, () => {
    crumbs();
  }, { immediate: true });

  return breadcrumbsList;
};