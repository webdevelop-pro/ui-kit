import { describe, expect, it } from 'vitest';
import type { JSONSchemaType } from 'ajv/dist/types/json-schema';
import { ref } from 'vue';
import { useFormValidation, getReferenceType } from '../useFormValidation';

describe('useFormValidation', () => {
  const schema: JSONSchemaType<any> = {
    $ref: '#/definitions/Form',
    definitions: {
      Form: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          role: { type: 'string', enum: ['admin'], enumNames: ['Admin'] },
        },
        required: ['email'],
      },
    },
  } as any;

  it('extracts reference types', () => {
    expect(getReferenceType({ $ref: '#/definitions/Entity' })).toBe('Entity');
    expect(getReferenceType({ $ref: '#/definitions/Unknown' })).toBe('Individual');
  });

  it('detects required fields and options', () => {
    const form = useFormValidation(schema, undefined, { email: '', role: '' }, ['email', 'role']);
    expect(form.isFieldRequired('email')).toBe(true);
    expect(form.isFieldRequired('role')).toBe(false);
    expect(form.getOptions('role')).toEqual([{ value: 'admin', name: 'Admin' }]);
  });

  it('sets errors on validation', () => {
    const errorData = ref<Record<string, any>>({});
    const form = useFormValidation(schema, undefined, { email: '', role: '' }, ['email', 'role']);
    form.onValidate();
    const [message] = form.getErrorText('email', errorData);
    expect(message).toBe('Please complete');
  });
});
