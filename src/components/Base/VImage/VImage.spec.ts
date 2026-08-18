import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import VImage from './VImage.vue';

const initialCompleteDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'complete');
const initialNaturalWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'naturalWidth');

const restoreImageDescriptors = () => {
  if (initialCompleteDescriptor) {
    Object.defineProperty(HTMLImageElement.prototype, 'complete', initialCompleteDescriptor);
  }

  if (initialNaturalWidthDescriptor) {
    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', initialNaturalWidthDescriptor);
  }
};

afterEach(() => {
  restoreImageDescriptors();
  vi.restoreAllMocks();
});

describe('VImage', () => {
  it('keeps the img element mounted without display:none while a lazy image is loading', () => {
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

    const image = wrapper.get('img');

    await image.trigger('load');

    expect(image.classes()).not.toContain('is--loading');
    expect(wrapper.emitted('loading:src')).toEqual([[true], [false]]);
  });

  it('clears the skeleton for an already-complete image on mount', async () => {
    Object.defineProperty(HTMLImageElement.prototype, 'complete', {
      configurable: true,
      get: () => true,
    });
    Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', {
      configurable: true,
      get: () => 100,
    });

    const wrapper = mount(VImage, {
      props: {
        src: 'https://example.com/image.jpg',
        alt: 'Example image',
      },
    });

    await nextTick();
    await nextTick();

    const image = wrapper.get('img');

    expect(image.classes()).not.toContain('is--loading');
    expect(wrapper.emitted('loading:src')).toEqual([[true], [false]]);
  });
});
