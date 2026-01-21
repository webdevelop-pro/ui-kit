import { describe, expect, it } from 'vitest';
import { formatToNumber } from '../formatToNumber';

describe('formatToNumber', () => {
  it('formats without rounding', () => {
    expect(formatToNumber(1000.0000123, false)).toBe('1,000');
  });

  it('formats with rounding to 2 decimals', () => {
    expect(formatToNumber(1000.3456, true)).toBe('1,000.346');
  });

  it('keeps full precision for Infinity', () => {
    expect(formatToNumber(1000.0000123, Infinity)).toBe('1,000.0000123');
  });

  it('supports compact notation', () => {
    expect(formatToNumber(1200, false, true)).toBe('1.2K');
  });
});
