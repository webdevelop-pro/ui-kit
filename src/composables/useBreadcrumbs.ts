import { watch } from 'vue';
import { pages } from 'UiKit/types/pages';

import { IBreadcrumb } from './interface';

export const useBreadcrumbs = (page, frontmatter):IBreadcrumb[] => {
  let breadcrumbsList:IBreadcrumb[] = [];
  if (frontmatter === undefined) {
    return breadcrumbsList;
  }
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

    let parent = currentPage.getParent();
    while (parent != null) {
      breadcrumbsList.push({
        href: parent.data.url,
        text: parent.data.title,
      });
      parent = parent.getParent();
    }
    breadcrumbsList = breadcrumbsList.reverse();
  };

  watch(() => page.value?.relativePath, () => {
    crumbs();
  }, { immediate: true });

  return breadcrumbsList;
};
