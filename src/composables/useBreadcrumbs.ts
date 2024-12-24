
import { useData } from 'vitepress';
import { watch } from 'vue';
import { Page } from 'UiKit/types/pages';


export const useBreadcrumbs = (currentPage: Page) => {
  const { page, frontmatter } = useData();

  let breadcrumbsList = [];

  const crumbs = () => {
    breadcrumbsList.splice(0, breadcrumbsList.length);
    breadcrumbsList.push({
      link: '',
      name: frontmatter.value.title,
    });

    debugger;
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

  return {
    breadcrumbsList,
  };
};

