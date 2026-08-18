import { describe, expect, it } from 'vitest';
import { getFilerImageSrcset } from '../filerImage';

describe('getFilerImageSrcset', () => {
  it('builds a srcset for a filer public file url', () => {
    expect(getFilerImageSrcset('https://api.webdevelop.biz/filer-api/v1.0/public/files/945711')).toBe(
      'https://api.webdevelop.biz/filer-api/v1.0/public/files/945711?size=small 211w, https://api.webdevelop.biz/filer-api/v1.0/public/files/945711?size=medium 384w, https://api.webdevelop.biz/filer-api/v1.0/public/files/945711?size=big 924w'
    );
  });

  it('rebuilds the full srcset when the incoming filer url already has a size param', () => {
    expect(getFilerImageSrcset('https://api.webdevelop.biz/filer-api/v1.0/public/files/945711?size=medium')).toBe(
      'https://api.webdevelop.biz/filer-api/v1.0/public/files/945711?size=small 211w, https://api.webdevelop.biz/filer-api/v1.0/public/files/945711?size=medium 384w, https://api.webdevelop.biz/filer-api/v1.0/public/files/945711?size=big 924w'
    );
  });

  it('returns undefined for non-filer urls', () => {
    expect(getFilerImageSrcset('/images/blog/3.jpg')).toBeUndefined();
  });
});
