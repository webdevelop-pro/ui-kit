/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import set from 'lodash/set';
import get from 'lodash/get';

import { IFrontmatter } from './types';
import { filterByKeyVal } from '../helpers/allData';

interface IPage {
  data: IFrontmatter;
  children: Record<string, Page>;
  parent: Page|null;
  virtual: boolean;

  next(): Page|null;
  prev(): Page|null;
  isVirtual(): boolean;
  getChilds(): Array<Page>;
  getChild(key: string, value: any): Page|null;
  getParent(skipVirtual: true): Page|null;
  getPageByURL(url: string): Page|null;
  filterChilds(key: string, value: any): Array<Page>;
  childsLength(): number;
}

class Page implements IPage {
  public data: IFrontmatter;

  // Pages in format: slug: { Page }
  public children: Record<string, Page> = {};

  public parent: Page|null;

  // Virtual - means its created to handle childrens but page itself does not exist
  // for example /section/page - exist
  // but there is no /section page
  public virtual: boolean;

  constructor(data: IFrontmatter, virtualPage: boolean) {
    this.data = data;
    this.parent = null;
    this.children = {};
    this.virtual = virtualPage;
  }

  // if check for example use cases then will check only in folder for example fintech
  public next(): Page | null {
    if (!this.parent) return null;
    const siblings = this.parent.getChilds();
    const index = siblings.findIndex((el) => el.data.url === this.data.url);
    return index !== -1 && index + 1 < siblings.length ? siblings[index + 1] : siblings[0];
  }

  public prev(): Page | null {
    if (!this.parent) return null;
    const siblings = this.parent.getChilds();
    const index = siblings.findIndex((el) => el.data.url === this.data.url);
    return index > 0 ? siblings[index - 1] : siblings[siblings.length - 1];
  }

  public getParent(skipVirtual = true): Page | null {
    let currentParent = this.parent;
    while (skipVirtual && currentParent?.isVirtual()) {
      currentParent = currentParent.parent;
    }
    return currentParent;
  }

  public isVirtual(): boolean {
    return this.virtual;
  }

  public getChilds(skipVirtual = true): Page[] {
    return Object.values(this.children).filter((child) => !skipVirtual || !child.isVirtual());
  }

  public getPages(data: IFrontmatter[], filterFuncs = [], sortFuncs = []) {
    filterFuncs.forEach((filterFunc) => {
      data = filterFunc(data);
    });
    sortFuncs.forEach((sortFunc) => {
      data = sortFunc(data);
    });
    return data;
  }

  public filterPages(
    data: IFrontmatter[],
    key: keyof IFrontmatter,
    val: string,
  ) {
    return this.getPages(data, [filterByKeyVal(key, val)], []);
  }

  public filterChilds(key: string, val: string): Page[] {
    const filteredPages = this.filterPages(Object.values(this.children).map((child) => child.data), key, val);
    const matchingPages = Object.values(this.children).filter((child) => (
      filteredPages.some((filtered) => filtered.url === child.data.url)
    ));
    return matchingPages.concat(
      ...Object.values(this.children).map((child) => child.filterChilds(key, val)),
    );
  }

  public getChild(key: keyof IFrontmatter, val: string): Page | null {
    return this.filterChilds(key, val)[0] || null;
  }

  public childsLength(): number {
    return Object.keys(this.children).length;
  }

  public getPageByURL(url:string): Page | null {
    let path = url.replaceAll('/', '.').split('.');
    // does not work if there is a number in path
    // return get(pages, path);
    path = path.slice(1);
    let tempPage = pages;
    // eslint-disable-next-line consistent-return
    path.forEach((elem:string) => {
      // we need this for some reason during production build tempPage
      // can be undefined
      if (typeof tempPage === 'undefined') {
        return null;
      }
      tempPage = tempPage.children[elem];
      if (tempPage === null) {
        return null;
      }
    });
    return tempPage;
  }
}

// eslint-disable-next-line import/no-mutable-exports
let pages = new Page({} as IFrontmatter, true);

function convertDictToPage(obj: any, key: string): Page {
  if (!(obj instanceof Page)) {
    const newPage = new Page({ url: `/${key}`, slug: key } as IFrontmatter, true);
    Object.assign(newPage, obj);
    return newPage;
  }
  return obj;
}

// find a page with path="" and make it parent
function fixRoot(rawPages: Page): Page {
  const keys = Object.keys(rawPages);
  if (rawPages['']) {
    const rootPage = new Page(rawPages[''].data, false);
    // no need to do anything if we have just 1 element
    if (keys.length !== 4) {
      keys.forEach((key) => {
        if (key !== '') {
          const pge = convertDictToPage(rawPages[key], key);
          pge.parent = rootPage;
          rootPage.children[key.toString()] = pge;
        }
      });
    }
    return rootPage;
  }
  return new Page({}, false);
}

// recursively create childrens and parent links for each page
// starting from the bottom pages
function polish(unSortedPages: Page, parent: Page|null): void {
  const keys = Object.keys(unSortedPages);
  unSortedPages.parent = parent;
  if (keys.length !== 4) {
    keys.forEach((key) => {
      if (key !== 'data' && key !== 'children' && key !== 'parent' && key !== 'virtual') {
        const pge = convertDictToPage(unSortedPages[key], key);
        pge.parent = unSortedPages;
        polish(pge, unSortedPages);
        unSortedPages.children[key.toString()] = pge;
        delete unSortedPages[key];
      }
    });
  }
}

export function convertPages(rawData: IFrontmatter[]): Page {
  const tmpPages: Record<string, Page> = {};
  rawData.forEach((el) => {
    if (el.title && el.draft !== true) {
      // todo
      // bug - if file path contains . it will break everything
      const path = el.url?.substring(1).replaceAll('/', '.') || '';
      const pge = new Page(el, false);
      // todo
      // bug if directory containes only numbers
      const isExist = get(tmpPages, path);
      if (isExist !== undefined) {
        isExist.virtual = false;
        isExist.data = pge.data;
      } else {
        set(tmpPages, path, pge);
      }
    }
  });
  // find root page and make it a lead of all pages
  pages = fixRoot(tmpPages);
  const childs = pages.children;
  Object.keys(childs).forEach((slug:string) => {
    polish(childs[slug], pages);
  });
  // polish(pages, null);
  return pages;
}

export { pages, Page };
