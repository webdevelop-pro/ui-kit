import { JSONSchemaType } from 'ajv';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { computed } from 'vue';
import get from 'lodash/get';

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
  if (!schema) return schema;

  // Clone schema to avoid mutation
  const clonedSchema = cloneDeep(schema);

  // Resolve schema from reference path, or use the cloned schema directly
  const resolvedObject = refPath ? resolveRef(refPath, clonedSchema) : clonedSchema;

  // Remove "required" key safely
  delete resolvedObject.required;

  // Update the cloned schema with the modified object
  set(clonedSchema, [], resolvedObject);

  // If formModel is empty, return the properties of the resolved object
  if (!Object.keys(formModel).length) {
    return resolvedObject.properties;
  }

  // Filter properties based on the keys present in formModel
  return Object.entries(resolvedObject.properties).reduce((filteredObject: FilteredObject, [key, value]) => {
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

  if (!firstChild || !objectFromRefPath.properties) {
    return undefined;
  }

  const segment0Property = objectFromRefPath.properties[firstChild];

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

function removeRequiredFromDefinitions(schema: JSONSchemaType<any>) {
  if (schema.definitions && typeof schema.definitions === 'object') {
    Object.values(schema.definitions).forEach((definition) => {
      // Remove 'required' if it exists
      if (definition.required) {
        delete definition.required;
      }

      // Recursively process nested definitions
      if (definition.definitions && typeof definition.definitions === 'object') {
        removeRequiredFromDefinitions(definition);
      }
    });
  }
  return schema;
}

export const filterSchema = (schema: JSONSchemaType<any>, formModel: any): any => {
  if (!schema) return schema;
  // clone deep to ensure we don't mix schemas
  let newSchema = cloneDeep(schema);
  // get path
  const path = newSchema.$ref?.replace('#/', '')?.split('/') || [];

  // get object from path
  let mainDataObject = newSchema;
  // eslint-disable-next-line
  for (const key of path) { // TODO reqrite as array iteration
    if (key !== '') mainDataObject = mainDataObject[key];
  }
  // remove required
  delete mainDataObject.required;
  set(newSchema, path, mainDataObject);
  newSchema = removeRequiredFromDefinitions(newSchema);


  // filter by keys
  const filteredObject: any = {};
  // eslint-disable-next-line
  for (const key in mainDataObject.properties) { // TODO reqrite as array iteration
    // eslint-disable-next-line
    if (formModel.hasOwnProperty(key)) {
      // eslint-disable-next-line
      filteredObject[key] = mainDataObject.properties[key];
    }
  }
  const cleanedObject = cleanEnums(filteredObject);
  // put changes data to schema and return
  path.push('properties');
  set(newSchema, path, cleanedObject);
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
