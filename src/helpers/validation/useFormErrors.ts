import { computed, readonly, ref } from 'vue';
import type { ErrorObject } from 'ajv';
import { REQUIRED_ERROR_MESSAGE } from './constants';
import toPath from 'lodash/toPath';
import get from 'lodash/get';
import type { ValidationError, ErrorSchema } from './types';

function lastPropertySegment(path?: string): string {
  if (!path) return '';
  const withoutLeadingSlash = path.replace(/^\//, '');
  const bySlash = withoutLeadingSlash.split('/');
  const lastSlashSegment = bySlash[bySlash.length - 1] ?? '';
  const byDot = lastSlashSegment.split('.');
  return byDot[byDot.length - 1] ?? '';
}

export function useFormErrors() {
  const rawErrors = ref<ErrorObject[]>([]);
  // Track ignored field names for selective clearing without mutating source errors
  const ignoredFieldNames = ref<string[]>([]);

  const ignoredSet = computed(() => new Set(ignoredFieldNames.value));

  const filteredErrors = computed(() =>
    rawErrors.value.filter((e) => {
      const field = lastPropertySegment(e.instancePath);
      return !ignoredSet.value.has(field);
    }),
  );

  function transformValidationErrors(errors: ErrorObject[] = []): ValidationError[] {
    return errors.flatMap((error: ErrorObject) => {
      const { instancePath, keyword, params, schemaPath, message } = error as any;

      if (keyword === 'errorMessage' && params?.errors) {
        return (params.errors as ErrorObject[]).map((nested: ErrorObject) => {
          const nestedParams: any = (nested as any).params || {};
          const base = nested.instancePath ? nested.instancePath.replace(/^\//, '').replace(/\//g, '.') : '';
          const property = 'missingProperty' in nestedParams ? nestedParams.missingProperty : base;
          return {
            name: String((nested as any).keyword),
            property,
            message,
            params: nestedParams,
            schemaPath: String((nested as any).schemaPath),
          } as ValidationError;
        });
      }

      let property = instancePath ? String(instancePath).replace(/^\//, '').replace(/\//g, '.') : '';
      const safeParams: any = params || {};
      if ('missingProperty' in safeParams) {
        property = property ? `${property}.${safeParams.missingProperty}` : String(safeParams.missingProperty);
      }
      if ('failingKeyword' in safeParams) {
        property = property ? `${property}.${safeParams.failingKeyword}` : String(safeParams.failingKeyword);
      }

      let messageFormatted = message as string | undefined;
      switch (keyword) {
        case 'required':
          messageFormatted = REQUIRED_ERROR_MESSAGE;
          break;
        case 'minLength':
          messageFormatted = `Should have at least ${safeParams?.limit} characters`;
          break;
        default:
      }

      return [{
        name: String(keyword),
        property,
        message: messageFormatted,
        params: safeParams,
        schemaPath: String(schemaPath),
      } as ValidationError];
    });
  }

  function formatErrorSchema(schema: ErrorSchema): Record<string, any> | string | undefined {
    if ('__errors' in schema) {
      const list = schema.__errors || [];
      return list.length ? list.join(', ') : undefined;
    }
    const formattedSchema: Record<string, any> = {};
    const anySchema = schema as unknown as Record<string, ErrorSchema>;
    Object.keys(anySchema).forEach((key) => {
      formattedSchema[key] = formatErrorSchema(anySchema[key]);
    });
    return formattedSchema;
  }

  function buildFieldErrors(raw: ErrorObject[]) {
    const errors = transformValidationErrors(raw);
    const errorsSchema: ErrorSchema = {};
    if (!errors.length) return formatErrorSchema(errorsSchema) as Record<string, any> | undefined;

    errors.forEach(({ property, message }) => {
      if (!message) return;
      const path = property === '.' ? [] : toPath(property);
      if (path.length && path[0] === '') path.splice(0, 1);
      let node: any = errorsSchema;
      for (const segment of path) {
        if (!node[segment] || typeof node[segment] !== 'object') node[segment] = {} as ErrorSchema;
        node = node[segment];
      }
      if (!Array.isArray(node.__errors)) node.__errors = [];
      node.__errors.push(message);
    });

    return formatErrorSchema(errorsSchema) as Record<string, any> | undefined;
  }

  const fieldErrors = computed(() => {
    const result = buildFieldErrors(filteredErrors.value);
    return (result && typeof result === 'object') ? (result as Record<string, any>) : {};
  });

  const hasErrors = computed(() => Object.keys(fieldErrors.value).length > 0);

  function setErrors(errors: ErrorObject[] | undefined | null) {
    rawErrors.value = Array.isArray(errors) ? errors : [];
    ignoredFieldNames.value = [];
  }

  function clearErrors() {
    rawErrors.value = [];
    ignoredFieldNames.value = [];
  }

  function clearFieldError(fieldName: string) {
    if (!fieldName) return;
    if (!ignoredSet.value.has(fieldName)) {
      ignoredFieldNames.value = [...ignoredFieldNames.value, fieldName];
    }
  }

  function hasFieldError(path: string): boolean {
    if (!path) return false;
    const groups = fieldErrors.value as Record<string, unknown>;
    if (!groups || typeof groups !== 'object') return false;
    const value = get(groups, path);
    return typeof value === 'string';
  }

  function getFieldError(path: string): string {
    if (!path) return '';
    const groups = fieldErrors.value as Record<string, unknown>;
    if (!groups || typeof groups !== 'object') return '';
    const value = get(groups, path);
    return typeof value === 'string' ? value : '';
  }

  const hasFormErrors = (errors, fieldPaths) => {
    const containsStringError = (node: any): boolean => {
      if (node == null) return false;
      if (typeof node === 'string') return node.trim() !== '';
      if (Array.isArray(node)) return node.some(containsStringError);
      if (typeof node === 'object') return Object.values(node).some(containsStringError);
      return false;
    };

    return fieldPaths.some((path: string) => {
      const value = get(errors, path);
      return containsStringError(value);
    });
  };

  return {
    rawErrors: readonly(rawErrors),
    fieldErrors,
    hasErrors,
    setErrors,
    clearErrors,
    clearFieldError,
    hasFieldError,
    getFieldError,
    hasFormErrors,
  };
}


