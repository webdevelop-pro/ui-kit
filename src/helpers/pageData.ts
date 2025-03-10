/* eslint-disable no-param-reassign */
import { stripHtmlAndMarkdown } from './text';
import { getFirst200Characters } from './general';
import { urlFormat } from './url';

export function getSlugFromURL(url: string) {
  return url.split('/')?.pop()?.replace('.html', '').trim();
}

export function getSummary(description: string) {
  return stripHtmlAndMarkdown(getFirst200Characters(description.replaceAll('"', "'")));
}

export function getImage(img: string) {
  // image can be on different domain, for example https://img.youtube.com/vi/6B-KagJZ3kI/maxresdefault.jpg
  const image = (img === undefined || img === '') ? '/images/sharing.png' : img;
  return image;
}

export function normalizeFrontmatter(pageData) {
  pageData.frontmatter.url = urlFormat(pageData.relativePath ? `/${pageData.relativePath.replace(/index\.md$/, '').replace('.md', '')}` : pageData.url);
  if (Object.prototype.hasOwnProperty.call(pageData.frontmatter, 'slug') === false) {
    pageData.frontmatter.slug = getSlugFromURL(pageData.frontmatter.url);
  }
  if (Object.prototype.hasOwnProperty.call(pageData.frontmatter, 'summary') === false) {
    if (pageData.frontmatter.description) {
      pageData.frontmatter.summary = getSummary(pageData.frontmatter.description);
    } else {
      pageData.frontmatter.summary = getSummary(pageData.src || '');
    }
  }
  if (Object.prototype.hasOwnProperty.call(pageData.frontmatter, 'cover') === false) {
    pageData.frontmatter.cover = { image: '' };
  }
  pageData.frontmatter.cover.image = getImage(pageData.frontmatter.cover?.image);
}
