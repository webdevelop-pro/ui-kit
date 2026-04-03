import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import VImage from './VImage.vue';

describe('VImage', () => {
  it('keeps the img element mounted while a lazy image is loading', () => {
    const wrapper = mount(VImage, {
      props: {
        src: 'https://example.com/image.jpg',
        alt: 'Example image',
        loading: 'lazy',
      },
    });

    const image = wrapper.get('img');

    expect(image.attributes('src')).toBe('https://example.com/image.jpg');
    expect(image.attributes('style')).toBeUndefined();
    expect(image.classes()).toContain('is--loading');
  });

  it('clears the loading state after the image loads', async () => {
    const wrapper = mount(VImage, {
      props: {
        src: 'https://example.com/image.jpg',
        alt: 'Example image',
        loading: 'lazy',
      },
    });

    await wrapper.get('img').trigger('load');

    expect(wrapper.get('img').classes()).not.toContain('is--loading');
    expect(wrapper.emitted('loading:src')).toEqual([[true], [false]]);
  });
});
