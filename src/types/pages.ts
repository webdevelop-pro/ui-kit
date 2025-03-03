import set from 'lodash/set';
import get from 'lodash/get';

import { IFrontmatter } from './types';

interface IPage {
  data: IFrontmatter;
  children: Object;
  parent: Page|null;
  virtual: Boolean;

  next(): Page|null;
  prev(): Page|null;
  isVirtual(): Boolean;
  getChilds(): Array<Page>;
  getChild(key: string, value: any): Page|null;
  getParent(skipVirtual: true): Page|null;
  getPageByURL(url: string): Page|null;
  filterChilds(key: string, value: any): Array<Page>;
  childsLength(): number;
}

class Page implements IPage {
  data: IFrontmatter;
  // Pages in format: slug: { Page }
  children: {};
  parent: Page|null;
  // Virtual - means its created to handle childrens but page itself does not exist
  // for example /section/page - exist
  // but there is no /section page
  virtual: Boolean

  constructor(data: IFrontmatter, virtualPage: Boolean) {
    this.data = data;
    this.parent = null;
    this.children = {};
    this.virtual = virtualPage;
  }

  next(): Page|null {
    // ToDo
    // cache response
    const parent = this.parent;
    if (parent !== null) {
      const childs = parent.getChilds();
      let pageIndex = -1;
      childs.forEach((el:Page, idx:number) => {
        if (el.data.url == this.data.url) {
          pageIndex = idx;
        }
      });
      if (pageIndex > -1) {
        return childs[pageIndex+1] || null;
      }
    }
    return null;
  }

  prev(): Page|null {
    // ToDo
    // cache response
    const parent = this.parent;
    if (parent !== null) {
      const childs = parent.getChilds();
      let pageIndex = -1;
      childs.forEach((el:Page, idx:number) => {
        if (el.data.url == this.data.url) {
          pageIndex = idx;
        }
      });
      if (pageIndex > 0) {
        return childs[pageIndex-1] || null;
      }
    }
    return null;
  }

  getParent(skipVirtual = true):Page|null {
    if (skipVirtual == false) {
      return this.parent;
    }
    let parent = this.parent;
    while(parent && parent.isVirtual() === true) {
      parent = parent.parent;
    }
    return parent;
  }

  isVirtual() {
    return this.virtual;
  }

  getChilds(skipVirtual = true):Page[] {
    const res:Page[] = [];
    Object.keys(this.children).forEach((slug) => {
      const el = this.children[slug];
      if(skipVirtual == false || skipVirtual == true && el.isVirtual() == false) {
        res.push(el);
      }
    });
    return res;
  }

  filterChilds(key: string, val: string, skipVirtual = false): Page[] {
    //   // ToDo
    //   // Create more powerful filter where you can pass 
    //   // different functions for filtering
    const res: Page[] = [];

    const filterRecursive = (children: Record<string, Page>) => {
      Object.keys(children).forEach((slug) => {
        const el = children[slug];
        if (skipVirtual === false || (skipVirtual === true && el.isVirtual() === false)) {
          if (key === '' || el.data[key] === val) {
            res.push(el);
          }
        }
        // If the element has children, recursively filter them
        if (el.children && Object.keys(el.children).length > 0) {
          filterRecursive(el.children);
        }
      });
    };

    filterRecursive(this.children);
    return res;
  }

  getChild(key: keyof IFrontmatter, val: string):Page|null {
    const res = this.filterChilds(key, val);
    if (res.length > 0) {
      return res[0];
    }
    return null;
  }

  childsLength():number { 
    // ToDo
    // Cache response
    return Object.keys(this.children).length;
  }

  getPageByURL(url:string) {
    let path = url.replaceAll('/', '.').split('.');
    // does not work if there is a number in path
    // return get(pages, path);
    path = path.slice(1);
    let tempPage = pages;
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

let pages = new Page({}, true)

function convertDictToPage(_obj, key:string) {
  if (Page.prototype.isPrototypeOf(_obj) === false) {
    let pge = new Page({url: `/${key}`, slug: key }, true);
    Object.keys(_obj).forEach((subKey:string) => {
      pge[subKey.toString()] = _obj[subKey];
    });
    return pge;
  }
  return _obj;
}

// find a page with path="" and make it parent
function fixRoot(rawPages: Page) {
  const keys = Object.keys(rawPages);
  if (rawPages[""]) {
    let rootPage = new Page(rawPages[""].data, false);
    // no need to do anything if we have just 1 element
    if (keys.length !== 4) {
      keys.forEach((key) => {
        if (key != "") {
          let pge = convertDictToPage(rawPages[key], key);
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
function polish(unSortedPages: Page, parent: Page|null) {
  const keys = Object.keys(unSortedPages);
  unSortedPages.parent = parent;
  if (keys.length !== 4) {
    keys.forEach((key) => {
      if (key !== "data" && key !== "children" && key !== "parent" && key !== "virtual") {
        const pge = convertDictToPage(unSortedPages[key], key);
        pge.parent = unSortedPages;
        polish(pge, unSortedPages);
        unSortedPages.children[key.toString()] = pge;
        delete unSortedPages[key];
      }
    });
  }
}

export function convertPages(rawData) {
  const tmpPages = {};
  rawData.forEach((el) => {
    if (el.title && el.draft !== true) {
      // todo
      // bug - if file path contains . it will break everything
      const path = el.url.substring(1).replaceAll('/', '.');
      const pge = new Page(el, false)
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
