import { describe, expect, it } from 'vitest';
import { getImage, getSlugFromURL, getSummary, normalizeFrontmatter } from '../pageData';

describe('helpers/pageData', () => {
  it('extracts slug from URL', () => {
    expect(getSlugFromURL('/some/path/page.html')).toBe('page');
  });

  it('provides fallback image', () => {
    expect(getImage('')).toBe('/images/sharing.png');
    expect(getImage('/custom.png')).toBe('/custom.png');
  });

  it('creates summary from description', () => {
    expect(getSummary('<p>Hello **World**</p>')).toBe('Hello ');
  });

  it('normalizes frontmatter fields', () => {
    const pageData: any = {
      relativePath: 'docs/index.md',
      frontmatter: { description: 'Hello world' },
      src: 'Hello world',
    };
    normalizeFrontmatter(pageData);
    expect(pageData.frontmatter.url).toBe('/docs/');
    expect(pageData.frontmatter.slug).toBe('');
    expect(pageData.frontmatter.summary).toBe('Hello world');
    expect(pageData.frontmatter.cover.image).toBe('/images/sharing.png');
  });
});
