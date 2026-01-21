import { JSONSchemaType } from 'ajv/dist/types/json-schema';
import set from 'lodash-es/set.js';
import cloneDeep from 'lodash-es/cloneDeep';
import { computed } from 'vue';
import get from 'lodash-es/get.js';
import pick from 'lodash-es/pick';

interface FilteredObjectElement {
  enum?: Array<any>;
  enumNames?: Array<string>;
  minLength?: number;
  mustBeUS?: boolean;
  title?: string;
  type: string;
}

type FilteredObject = Record<string, FilteredObjectElement>;

function cleanEnums(filteredObject: FilteredObject): FilteredObject {
  Object.keys(filteredObject).forEach((key) => {
    const element = filteredObject[key];
    if (element.type === 'string' && element.enum) {
      delete element.enum; // Remove the `enum` property
    }
  });

  return filteredObject; // Return the modified object
}

export function resolveRef(ref: string, schema: JSONSchemaType<any>) {
  const refPath = ref.replace('#/', '').split('/');
  return get({ ...schema }, refPath.join('.'));
}

export const getFilteredObject = (
  schema: JSONSchemaType<any> | undefined,
  formModel: Record<string, any>,
  refPath: string = schema?.$ref || '',
): FilteredObject => {
  if (!schema || !formModel) return {};

  // Clone schema to avoid mutation
  const clonedSchema = cloneDeep(schema);

  // Resolve schema from reference path, or use the cloned schema directly
  const resolvedObject = refPath ? resolveRef(refPath, clonedSchema) : clonedSchema;

  if (!Object.keys(resolvedObject).length) {
    return {};
  }

  // Remove "required" key safely
  delete resolvedObject.required;

  // Update the cloned schema with the modified object
  set(clonedSchema, [], resolvedObject);

  // If formModel is empty, return the properties of the resolved object
  if (!Object.keys(formModel).length) {
    return resolvedObject.properties;
  }

  // Filter properties based on the keys present in formModel
  return Object.entries(resolvedObject?.properties)?.reduce((filteredObject: FilteredObject, [key, value]) => {
    if (key in formModel) {
      if (value?.$ref) {
        filteredObject[key] = getFilteredObject(schema, formModel[key], value.$ref);
      } else if (value?.type === 'array' && value?.items?.$ref) {
        filteredObject[key] = getFilteredObject(schema, formModel[key], value?.items?.$ref);
      } else {
        filteredObject[key] = value;
      }
    }
    return filteredObject;
  }, {});
};

export function getFieldSchema(
  path: string | undefined,
  ref: string | undefined,
  schema: JSONSchemaType<any>,
): any | undefined {
  if (!path || !ref) return undefined;

  const objectFromRefPath = resolveRef(ref, schema);
  const pathSegments = path.split('.');

  pathSegments.forEach((segment, index) => {
    if (!Number.isNaN(Number(segment))) {
      pathSegments.splice(index, 1);
    }
  });

  const firstChild = pathSegments.shift();
  const restSegments = pathSegments.join('.');

  if (!firstChild || !objectFromRefPath?.properties) {
    return undefined;
  }

  const segment0Property = objectFromRefPath?.properties[firstChild];

  if (segment0Property?.$ref) {
    return getFieldSchema(restSegments, segment0Property.$ref, schema);
  }

  if (
    segment0Property?.type === 'array'
    && segment0Property?.items?.$ref
  ) {
    return getFieldSchema(restSegments, segment0Property.items.$ref, schema);
  }

  return objectFromRefPath;
}

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

export const filterSchema = (schema: JSONSchemaType<any>, formModel: any): any => {
  if (!schema) return schema;

  const newSchema = cloneDeep(schema);
  const path = newSchema.$ref?.replace('#/', '')?.split('/') || [];

  const mainDataObject: any = path.length ? get(newSchema, path.join('.')) : newSchema;
  if (!mainDataObject || !mainDataObject.properties) return newSchema;

  delete mainDataObject.required;
  set(newSchema, path, mainDataObject);
  removeRequiredFromDefinitions(newSchema);

  const keys = Object.keys(formModel || {});
  const filteredProperties = keys.length
    ? pick(mainDataObject.properties, keys)
    : {};

  const cleanedObject = cleanEnums(filteredProperties as any);
  set(newSchema, [...path, 'properties'], cleanedObject);
  return newSchema;
};

export const undefinedEmptyProp = (data: object) => {
  const obj = {};
  Object.entries(data).forEach(([key, val]) => {
    if (val === '') Object.assign(obj, { [key]: undefined as unknown });
    else Object.assign(obj, { [key]: val as unknown });
  });
  return obj;
};

export const scrollToError = (parentClass: string) => {
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
