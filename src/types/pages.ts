import set from 'lodash/set';
import get from 'lodash/get';

import { IFrontmatter } from './types';

class Page {
  _data: IFrontmatter;
  // Pages in format: slug: { Page }
  _childrens: {};
  _parent: Page|null;
  // Virtual - means its created to handle childrens but page itself does not exist
  // for example /section/page - exist
  // but there is no /section page
  _virtual: Boolean

  constructor(data: IFrontmatter, virtualPage: Boolean) {
    this._data = data;
    this._parent = null;
    this._childrens = {};
    this._virtual = virtualPage;
    // this.pages = pages;
  }

  next() {
    const parent = this.parent();
    if (parent !== null) {
      const childs = parent.childs();
      let pageIndex = -1;
      childs.forEach((el:IFrontmatter, idx:number) => {
        if (el.url == this._data.url) {
          pageIndex = idx;
        }
      });
      if (pageIndex !== -1) {
        return childs[pageIndex+1] || null;
      }
    }
    return null;
  }

  nextPage() {
    const parent = this.parent();
    if (parent !== null) {
      const childs = parent._childrens;
      const childsKeys = Object.keys(childs);
      let pageIndex = -1;
      childsKeys.forEach((slug:string, idx:number) => {
        if (slug == this._data.slug) {
          pageIndex = idx;
        }
      });
      if (pageIndex !== -1) {
        return childs[childsKeys[pageIndex+1]] || null;
      }
    }
    return null;
  }

  prev() {
    const parent = this.parent();
    if (parent !== null) {
      const childs = parent.childs();
      let pageIndex = -1;
      childs.forEach((el:IFrontmatter, idx:number) => {
        if (el.url == this._data.url) {
          pageIndex = idx;
        }
      });
      if (pageIndex !== -1) {
        return childs[pageIndex-1] || null;
      }
    }
    return null;
  }

  prevPage() {
    const parent = this.parent();
    if (parent !== null) {
      const childs = parent._childrens;
      const childsKeys = Object.keys(childs);
      let pageIndex = -1;
      childsKeys.forEach((slug:string, idx:number) => {
        if (slug == this._data.slug) {
          pageIndex = idx;
        }
      });
      if (pageIndex !== -1) {
        return childs[childsKeys[pageIndex-1]] || null;
      }
    }
    return null;
  }

  parent(skipVirtual = true):Page|null {
    if (skipVirtual) {
      return this._parent;
    }
    let parent = this.parent();
    while(parent && parent.isVirtual() === true) {
      parent = parent.parent();
    }
    return parent;
  }

  childs(skipCurrent = false):IFrontmatter[] {
    const res:IFrontmatter[] = [];
    Object.keys(this._childrens).forEach((slug) => {
      if (skipCurrent === false || slug !== this._data.slug) {
        res.push(this._childrens[slug]._data);
      }
    });
    return res;
  }

  isVirtual() {
    return this._virtual;
  }

  getChilds(key: string, val: string):Page[] {
    const res:Page[] = [];
    Object.keys(this._childrens).forEach((slug) => {
      const el = this._childrens[slug];
      if (key == '' || el._data[key] == val) {
        res.push(el);
      }
    });
    return res;
  }

  getChild(key: keyof IFrontmatter, val: string):Page|null {
    const res = this.getChilds(key, val);
    if (res.length > 0) {
      return res[0];
    }
    return null;
  }

  childsLength():number { 
    return Object.keys(this._childrens).length;
  }

  getPageByURL(url:string) {
    let path = url.replaceAll('/', '._childrens.').split('.');
    // does not work if there is a number in path
    // return get(pages, path);
    path = path.slice(1);
    let tempPage = pages;
    path.forEach((elem) => {
      // we need this for some reason during production build tempPage
      // can be undefined
      if (typeof tempPage === 'undefined') {
        return null;
      }
      tempPage = tempPage[elem];
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
    let rootPage = new Page(rawPages[""]._data, false);
    // no need to do anything if we have just 1 element
    if (keys.length !== 4) {
      keys.forEach((key) => {
        if (key != "") {
          let pge = convertDictToPage(rawPages[key], key);
          pge._parent = rootPage;
          rootPage._childrens[key.toString()] = pge;
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
  unSortedPages._parent = parent;
  if (keys.length !== 4) {
    keys.forEach((key) => {
      if (key !== "_data" && key !== "_childrens" && key !== "_parent" && key !== "_virtual") {
        const pge = convertDictToPage(unSortedPages[key], key);
        pge._parent = unSortedPages;
        polish(pge, unSortedPages);
        unSortedPages._childrens[key.toString()] = pge;
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
        isExist._virtual = false;
        isExist._data = pge._data;
      } else {
        set(tmpPages, path, pge);
      }
    }
  });
  // find root page and make it a lead of all pages
  pages = fixRoot(tmpPages);
  const childs = pages._childrens;
  Object.keys(childs).forEach((slug:string) => {
    polish(childs[slug], pages);
  });
  // polish(pages, null);
  return pages;
}

export { pages, Page };
