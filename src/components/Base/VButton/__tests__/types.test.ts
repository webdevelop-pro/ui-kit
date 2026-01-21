import { describe, expectTypeOf, it } from 'vitest';
import type { ButtonProps } from '../types';

describe('VButton types', () => {
  it('includes asChild prop', () => {
    expectTypeOf<ButtonProps>().toMatchTypeOf<{ asChild?: boolean }>();
  });
});
