import { describe, expect, it } from 'vitest';
import type { IFrontmatter } from '../types';
import { convertPages, pages } from '../pages';

describe('types/pages', () => {
  it('builds pages tree and resolves by URL', () => {
    const raw: IFrontmatter[] = [
      { url: '/section', slug: 'section', draft: false } as IFrontmatter,
      { url: '/section/page', slug: 'page', draft: false } as IFrontmatter,
    ];
    convertPages(raw);
    const result = pages.getPageByURL('/section/page');
    expect(result?.data?.url).toBeUndefined();
  });
});
