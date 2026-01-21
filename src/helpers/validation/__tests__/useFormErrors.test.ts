import { describe, expect, it } from 'vitest';
import type { ErrorObject } from 'ajv';
import { useFormErrors } from '../useFormErrors';

describe('useFormErrors', () => {
  it('builds field errors and reads them', () => {
    const { setErrors, hasFieldError, getFieldError } = useFormErrors();
    const errors: ErrorObject[] = [
      {
        instancePath: '',
        keyword: 'required',
        params: { missingProperty: 'email' },
        schemaPath: '#/required',
        message: 'should have required property',
      } as ErrorObject,
    ];
    setErrors(errors);
    expect(hasFieldError('email')).toBe(true);
    expect(getFieldError('email')).toBe('Please complete');
  });

  it('can clear a single field error', () => {
    const { setErrors, clearFieldError, hasFieldError } = useFormErrors();
    const errors: ErrorObject[] = [
      {
        instancePath: '/profile',
        keyword: 'required',
        params: { missingProperty: 'name' },
        schemaPath: '#/required',
        message: 'should have required property',
      } as ErrorObject,
    ];
    setErrors(errors);
    expect(hasFieldError('profile.name')).toBe(true);
    clearFieldError('profile');
    expect(hasFieldError('profile.name')).toBe(false);
  });

  it('detects errors across field paths', () => {
    const { setErrors, hasFormErrors, fieldErrors } = useFormErrors();
    const errors: ErrorObject[] = [
      {
        instancePath: '',
        keyword: 'required',
        params: { missingProperty: 'email' },
        schemaPath: '#/required',
        message: 'should have required property',
      } as ErrorObject,
    ];
    setErrors(errors);
    expect(hasFormErrors(fieldErrors.value, ['email'])).toBe(true);
    expect(hasFormErrors(fieldErrors.value, ['missing'])).toBe(false);
  });
});
