
import { useData } from 'vitepress';
import { watch } from 'vue';
import { IFrontmatter } from 'UiKit/types/types';


export const useBreadcrumbs = (allPages: IFrontmatter[]) => {
  const { page, frontmatter } = useData();

  const breadcrumbsListDefault = {
    link: '/',
    name: 'Home',
  };
  let breadcrumbsList = [breadcrumbsListDefault];

  function findPageBySlug(pages:IFrontmatter[], slug:string):IFrontmatter {
    let page = null;
    pages.forEach((el) => {
      if (el.slug === slug) {
        page = el;
        return;
      }
    });
    return page;
  }

  const crumbs = () => {
    breadcrumbsList.splice(0, breadcrumbsList.length);
    breadcrumbsList.push(breadcrumbsListDefault);
    const pathData = page.value.relativePath.split('/');
    pathData.forEach((slug) => {
      const parent = findPageBySlug(allPages, slug);
      if (parent !== null) {
        breadcrumbsList.push({
          link: parent.url,
          name: parent.title,
        });
      }
    });
    if (breadcrumbsList[breadcrumbsList.length - 1].name === frontmatter.value.title) return;
    breadcrumbsList.push({
      link: '',
      name: frontmatter.value.title,
    });
  };

  watch(() => page.value?.relativePath, () => {
    crumbs();
  }, { immediate: true });

  return {
    breadcrumbsList,
  };
};

