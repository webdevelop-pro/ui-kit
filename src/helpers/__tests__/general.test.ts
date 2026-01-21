import { describe, expect, it } from 'vitest';
import type { IFrontmatter } from 'UiKit/types/types';
import {
  booleanFormatToString,
  checkObjectAndDeleteNotRequiredFields,
  combineTags,
  filterItemsByTag,
  findPagesByParentFolder,
  formatPhoneNumber,
  getFirst200Characters,
  getUniqueCapitalizedTags,
  groupItemsByRawUrl,
  groupRelatedPagesFormat,
  isEmpty,
  mergeObjects,
  transformedArray,
  urlize,
} from '../general';

describe('helpers/general', () => {
  it('formats phone numbers', () => {
    expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890');
    expect(formatPhoneNumber('+1 (234) 567-8901')).toBe('+1 (234) 567-8901');
    expect(formatPhoneNumber(undefined)).toBeUndefined();
  });

  it('formats booleans to strings', () => {
    expect(booleanFormatToString(true)).toBe('Yes');
    expect(booleanFormatToString(false)).toBe('No');
    expect(booleanFormatToString(undefined)).toBeUndefined();
  });

  it('filters object fields by defaults and required', () => {
    const result = checkObjectAndDeleteNotRequiredFields(
      ['type'],
      ['keep'],
      { type: 'a', drop: 'nope', keep: 'keep' },
    );
    expect(result).toEqual({ type: 'a', keep: 'keep' });
  });

  it('creates url-friendly slugs', () => {
    expect(urlize('Hello World!')).toBe('hello-world');
  });

  it('deduplicates and capitalizes tags', () => {
    const tags = getUniqueCapitalizedTags([
      { tags: ['foo', 'Foo', 'bar/baz'] },
      { tags: ['BAR/BAZ', 'qux'] },
    ]);
    expect(tags).toEqual(['Foo', 'Bar/Baz', 'Qux']);
  });

  it('combines tags case-insensitively', () => {
    expect(combineTags(['Foo'], ['foo', 'Bar'])).toEqual(['Foo', 'Bar']);
  });

  it('filters items by normalized tag', () => {
    const items = [{ tags: ['Foo Bar'] }, { tags: ['Other'] }];
    const filtered = filterItemsByTag(items, 'foo-bar');
    expect(filtered).toEqual([items[0]]);
  });

  it('extracts first line after frontmatter', () => {
    const text = '---\nmeta\n---\n\nHello world\nNext line';
    expect(getFirst200Characters(text)).toBe('Hello world');
  });

  it('finds pages by parent folder', () => {
    const pages = [
      { url: '/a/b', is_main: true },
      { url: '/a/b/c', is_main: false },
      { url: '/a/d', is_main: true },
    ] as IFrontmatter[];
    const result = findPagesByParentFolder(pages, '/a/b/c');
    expect(result.map((p) => p.url)).toEqual(['/a/b', '/a/b/c']);
  });

  it('groups items by raw url', () => {
    const data = [
      { url: '/a/b/one' },
      { url: '/a/b/two' },
      { url: '/a/c/three' },
    ] as IFrontmatter[];
    const grouped = groupItemsByRawUrl(data, '/a/b/one') as Record<string, IFrontmatter[]>;
    expect(Object.keys(grouped)).toEqual([]);
  });

  it('formats related pages groups', () => {
    const pages = [{ url: '/a/b' }, { url: '/a/c' }] as IFrontmatter[];
    const data = { '/a/b': [{ url: '/a/b' }] };
    const result = groupRelatedPagesFormat(pages, data);
    expect(result).toEqual([{ groupBy: pages[0], items: data['/a/b'] }]);
  });

  it('merges nested entities and transforms arrays', () => {
    const obj1 = { company: { entities: { a: { filename: 'a.pdf' } } } };
    const obj2 = { company: { entities: { b: { filename: 'b.pdf', updated_at: '2024-01-01', url: '/b' } } } };
    const merged = mergeObjects(obj1, obj2);
    const list = transformedArray(merged);
    expect(merged.company.entities.a.filename).toBe('a.pdf');
    expect(list).toEqual([
      { name: 'a.pdf', 'object-type': 'company', updated_at: undefined, url: undefined },
      { name: 'b.pdf', 'object-type': 'company', updated_at: '2024-01-01', url: '/b' },
    ]);
  });

  it('detects empty objects', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
  });
});
