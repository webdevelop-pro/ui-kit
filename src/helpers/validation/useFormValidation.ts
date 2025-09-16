import {
  computed, reactive, ref, watch, unref, type Ref, type ComputedRef, type Reactive,
} from 'vue';
import { ajv } from './ajv';
import { useFormErrors } from './useFormErrors';
import type { JSONSchemaType } from 'ajv/dist/types/json-schema';
import type { ErrorObject } from 'ajv';
import merge from 'lodash/merge';

// Define the type for the return value of useFormErrors
interface FormErrors {
  rawErrors: Readonly<Ref<readonly ErrorObject[]>>;
  fieldErrors: ComputedRef<Record<string, any> | undefined>;
  hasErrors: ComputedRef<boolean>;
  setErrors: (errors: ErrorObject[] | undefined | null) => void;
  clearErrors: () => void;
  clearFieldError: (fieldName: string) => void;
  hasFieldError: (path: string) => boolean;
  getFieldError: (path: string) => string;
}

export interface FormValidationReturn<T> {
  model: Reactive<T>;
  validation: Ref<unknown>;
  isValid: ComputedRef<boolean>;
  onValidate: () => void;
  schemaObject: Ref<unknown>;
  resetValidation: () => void;
  formErrors: FormErrors;
  isFieldRequired: (fieldPath: string) => boolean;
  getErrorText: (fieldPath: string, errorData: Ref<Record<string, any>>) => (string | any[])[];
  scrollToError: (parentClass: string) => void;
  getOptions: (fieldPath: string) => { value: string; name: string }[];
  getReferenceType: (schema?: any) => string;
}

const undefinedEmptyProp = (data: object) => {
  const obj: Record<string, any> = {};
  Object.entries(data).forEach(([key, val]) => {
    if (val === '') {
      obj[key] = undefined;
    } else if (val && typeof val === 'object' && !Array.isArray(val)) {
      obj[key] = undefinedEmptyProp(val);
    } else {
      obj[key] = val;
    }
  });
  return obj;
};

/**
 * Extract the reference type from a schema's $ref property
 * @param schema - The schema object to extract reference type from
 * @returns The reference type (e.g., 'Individual', 'Entity', 'Trust') or 'Individual' as fallback
 */
export const getReferenceType = (schema?: any): string => {
  if (!schema?.$ref) return 'Individual'; // fallback
  
  // Extract the reference type from schema
  const refPath = schema.$ref;
  const refType = refPath.split('/').pop(); // Gets 'Individual', 'Entity', 'Trust', etc.
  
  // Map to supported types or fallback to Individual
  const supportedTypes = ['Individual', 'Entity', 'Trust', 'Sdira', 'Solo401k'];
  return supportedTypes.includes(refType) ? refType : 'Individual';
};

/**
 * Remove all required arrays from schema definitions
 * @param schema - The schema object to clean
 * @returns The cleaned schema with all required arrays removed
 */
function removeRequiredFromDefinitions(schema: any) {
  const traverse = (node: any) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach(traverse);
      return;
    }

    if (node.required) delete node.required;

    const defs = node.definitions || node.$defs;
    if (defs && typeof defs === 'object') {
      Object.values(defs).forEach(traverse);
    }
  };

  traverse(schema);
  return schema;
}

export function useFormValidation<T extends object>(
  schemaFrontend: JSONSchemaType<T> | Ref<JSONSchemaType<T>>,
  schemaBackend: JSONSchemaType<T> | Ref<JSONSchemaType<T>> | undefined,
  initialModel: T,
  fieldsPaths: string[] | Ref<string[]>,
): FormValidationReturn<T> {
  const model = reactive<T>({ ...initialModel });
  const validation = ref<unknown>();
  const formErrors = useFormErrors();

  // General schema computation that handles all cases
  const currentSchema = computed((): JSONSchemaType<T> => {
    const frontend = unref(schemaFrontend);
    const backend = unref(schemaBackend);
    
    // If no backend schema, return frontend only
    if (!backend) {
      return frontend;
    }
    
    // If no frontend schema, return backend only
    if (!frontend) {
      return backend;
    }
    
    // Remove all required arrays from backend schema before merging
    const cleanedBackend = backend ? removeRequiredFromDefinitions(backend) : backend;

    // Minimal sanitization: drop invalid keyword values that break Ajv (recursive)
    const sanitizeInvalidKeywordValues = (schema: any) => {
      const visit = (node: any) => {
        if (!node || typeof node !== 'object') return;
        if (Array.isArray(node)) { node.forEach(visit); return; }
        if ('contentMediaType' in node && typeof node.contentMediaType !== 'string') delete node.contentMediaType;
         if (node.properties && typeof node.properties === 'object') Object.values(node.properties).forEach(visit);
        if (node.items) visit(node.items);
        if (Array.isArray(node.allOf)) node.allOf.forEach(visit);
        if (Array.isArray(node.anyOf)) node.anyOf.forEach(visit);
        if (Array.isArray(node.oneOf)) node.oneOf.forEach(visit);
        if (node.not) visit(node.not);
        const defs = node.definitions || node.$defs;
        if (defs && typeof defs === 'object') Object.values(defs).forEach(visit);
      };
      visit(schema);
      return schema;
    };
    const sanitizedBackend = cleanedBackend ? sanitizeInvalidKeywordValues(cleanedBackend) : cleanedBackend;
    
    // If both exist, merge them (backend takes precedence, then frontend)
    const mergedSchema: any = merge({}, sanitizedBackend, frontend);
    return mergedSchema as JSONSchemaType<T>;
  });
  // Create compiled validator with memoization
  const compiledValidator = computed(() => ajv.compile(currentSchema.value));

  const isValid = computed(() => !formErrors.hasFormErrors(validation.value, unref(fieldsPaths)));

  // Shared helpers for $ref resolution and path traversal
  const resolveRef = (schemaNode: any, rootSchema: any): any => {
    if (!schemaNode?.$ref) return schemaNode;
    const ref = schemaNode.$ref as string;
    if (ref === '#') return rootSchema;
    if (!ref.startsWith('#/')) return schemaNode;
    const path = ref.substring(2).split('/');
    let current: any = rootSchema;
    for (const segment of path) {
      if (current && typeof current === 'object' && segment in current) {
        current = current[segment];
      } else {
        return schemaNode;
      }
    }
    return current;
  };

  const getSchemaAtPath = (path: string, rootSchema: any): any => {
    const pathParts = path.split('.');
    let currentSchema = resolveRef(rootSchema, rootSchema);
    for (const part of pathParts) {
      if (!currentSchema || typeof currentSchema !== 'object') return null;
      // If the path contains an array index (numeric segment), descend into items
      if (/^\d+$/.test(part)) {
        if (currentSchema.items) {
          currentSchema = resolveRef(currentSchema.items, rootSchema);
          continue;
        }
        return null;
      }
      // Navigate into arrays if encountered
      if (currentSchema.type === 'array' && currentSchema.items) {
        currentSchema = resolveRef(currentSchema.items, rootSchema);
      }
      const nextSchema = currentSchema.properties?.[part];
      if (!nextSchema) return null;
      currentSchema = resolveRef(nextSchema, rootSchema);
    }
    return currentSchema;
  };

  const onValidate = () => {
    const validator = compiledValidator.value;
    const formData = undefinedEmptyProp(model);
    console.log('currentSchema', currentSchema.value)
    console.log('formData', formData)
    
    // Validate the form data
    validator(formData);
    
    // Get validation errors if any
    const rawErrors = validator.errors;
    validator.errors = null; // Clear errors for next validation

    // Process errors via useFormErrors and store validation result
    formErrors.setErrors(rawErrors || []);
    validation.value = formErrors.fieldErrors.value;
    console.log('validation.value', validation.value)
  };

  const resetValidation = () => {
    validation.value = undefined;
  };

  // Watch model changes and validate only when not valid
  watch(() => model, () => {
    if (!isValid.value) {
      onValidate();
    }
  }, { deep: true });

  /**
   * Check if a field is required based on the current schema
   * @param fieldPath - The path to the field (e.g., 'user.email', 'profile.address.street')
   * @returns boolean indicating if the field is required
   */
  const isFieldRequired = (fieldPath: string): boolean => {
    if (!fieldPath || !currentSchema.value) return false;
    // Helper function to get parent schema (for checking required array)
    const getParentSchema = (path: string, rootSchema: any): any => {
      // For top-level fields, the parent is the resolved root (to follow $ref)
      if (!path.includes('.')) return resolveRef(rootSchema, rootSchema);
      
      const pathParts = path.split('.');
      const parentPath = pathParts.slice(0, -1).join('.');
      if (!parentPath) return rootSchema;
      
      return getSchemaAtPath(parentPath, rootSchema);
    };

    // Get the field schema and parent schema
    const fieldSchema = getSchemaAtPath(fieldPath, currentSchema.value);
    if (!fieldSchema) return false;
    
    let parentSchema = getParentSchema(fieldPath, currentSchema.value);
    if (!parentSchema) return false;
    // If parent is an array, check required on the item schema instead
    if (parentSchema && parentSchema.type === 'array' && parentSchema.items) {
      parentSchema = resolveRef(parentSchema.items, currentSchema.value);
    }
    
    // Extract the field name and check if required
    const fieldName = fieldPath.split('.').pop() || '';
    const isRequiredInSchema = fieldSchema.required === true;
    const isRequiredInParent = parentSchema.required?.includes(fieldName);
    
    return isRequiredInSchema || isRequiredInParent || false;
  };

  // Helper function to get error text for a field
  const getErrorText = (fieldPath: string, errorData?: Ref<Record<string, any>>) => {
    const fieldErrors = formErrors.getFieldError(fieldPath);
    const apiError = errorData?.value?.[fieldPath];
    
    return [
      fieldErrors,
      ...(apiError && Array.isArray(apiError) ? apiError : [])
    ];
  };

  const scrollToError = (parentClass: string) => {
    const errorTargets = computed(() => (document.getElementsByClassName(parentClass)));
  
    const parentElement = errorTargets.value[0];
    if (parentElement) {
      const errorElements = parentElement.getElementsByClassName('v-form-group__error');
      const target = errorElements[0];
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Get options for select-like fields using currentSchema.value
  const getOptions = (fieldPath: string): { value: string; name: string }[] => {
    // Find target node with $ref resolution at each step
    let target: any = getSchemaAtPath(fieldPath, currentSchema.value);
    
    if (!target) {
      return [];
    }

    // If array at the target, inspect items
    if (target.type === 'array' && target.items) {
      target = resolveRef(target.items, currentSchema.value);
    }

    const values = Array.isArray(target?.enum) ? target.enum : [];
    const names = target?.enumNames || target?.['x-enumNames'] || target?.titles || [];
    
    return values.map((value: any, index: number) => ({
      value: String(value),
      name: (String(names[index] ?? value)).charAt(0).toUpperCase() + (String(names[index] ?? value)).slice(1),
    }));
  };

  return {
    model,
    validation,
    isValid,
    onValidate,
    schemaObject: currentSchema,
    resetValidation,
    formErrors,
    isFieldRequired,
    getErrorText,
    scrollToError,
    getOptions,
    getReferenceType,
  };
}
