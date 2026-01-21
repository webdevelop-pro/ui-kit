import { describe, expect, it } from 'vitest';
import type { JSONSchemaType } from 'ajv/dist/types/json-schema';
import {
  filterSchema,
  getFieldSchema,
  getFilteredObject,
  resolveRef,
  undefinedEmptyProp,
} from '../general';

describe('validation/general', () => {
  const schema: JSONSchemaType<any> = {
    $ref: '#/definitions/Root',
    definitions: {
      Root: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          nested: { $ref: '#/definitions/Nested' },
        },
        required: ['name'],
      },
      Nested: {
        type: 'object',
        properties: {
          age: { type: 'number' },
        },
      },
    },
  } as any;

  it('resolves schema refs', () => {
    const resolved = resolveRef('#/definitions/Root', schema);
    expect(resolved.properties?.name).toBeDefined();
  });

  it('filters schema based on model', () => {
    const filtered = getFilteredObject(schema, { name: '', nested: {} });
    expect(Object.keys(filtered)).toEqual(['name', 'nested']);
  });

  it('gets field schema by path', () => {
    const result = getFieldSchema('nested.age', '#/definitions/Root', schema);
    expect(result).toBeTruthy();
  });

  it('filters schema properties and removes required', () => {
    const filtered = filterSchema(schema, { name: '' });
    const root = resolveRef('#/definitions/Root', filtered);
    expect(root.required).toBeUndefined();
    expect(Object.keys(root.properties)).toEqual(['name']);
  });

  it('converts empty strings to undefined', () => {
    expect(undefinedEmptyProp({ a: '', b: 'ok' })).toEqual({ a: undefined, b: 'ok' });
  });
});
