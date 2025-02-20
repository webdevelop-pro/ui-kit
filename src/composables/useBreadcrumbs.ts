
// import { useData } from 'vitepress';
import { watch } from 'vue';
import { pages, Page } from 'UiKit/types/pages';


export const useBreadcrumbs = (page, frontmatter) => {
  let breadcrumbsList = [];
  // const { page, frontmatter } = useData();
  const currentPage = pages.getPageByURL(frontmatter.value.url);
  if (currentPage == null) {
    console.warn(`page ${frontmatter.value.url} not found in pages`);
    return {
      breadcrumbsList,
    };
  }
  debugger;

  const crumbs = () => {
    breadcrumbsList.splice(0, breadcrumbsList.length);
    breadcrumbsList.push({
      link: '',
      name: frontmatter.value.title,
    });

    let parent = currentPage.parent();
    while(parent != null) {
      if (parent.isVirtual() === false) {
        breadcrumbsList.push({
          link: parent._data.url,
          name: parent._data.title,
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

