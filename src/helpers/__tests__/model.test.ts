import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { createFormModel, getOptions, populateModel } from '../model';

describe('helpers/model', () => {
  it('populates model using defaults', () => {
    const defaults = { a: 1, b: 2 };
    const result = populateModel({ a: 9, c: 3 } as any, defaults);
    expect(result).toEqual({ a: 9, b: 2 });
  });

  it('creates form model from schema', () => {
    const schema: any = {
      $ref: '#/definitions/Root',
      definitions: {
        Root: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            count: { type: 'number' },
            active: { type: 'boolean' },
          },
        },
      },
    };
    expect(createFormModel(schema)).toEqual({ name: '', count: 0, active: false });
  });

  it('builds options from enum + enumNames', () => {
    const schemaObject = ref({
      role: { enum: ['admin', 'user'], enumNames: ['Admin', 'User'] },
    });
    expect(getOptions('role', schemaObject)).toEqual([
      { value: 'admin', name: 'Admin' },
      { value: 'user', name: 'User' },
    ]);
  });
});
