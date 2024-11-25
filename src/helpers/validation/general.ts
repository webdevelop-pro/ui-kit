import { JSONSchemaType } from 'ajv';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { computed } from 'vue';

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

const resolveSchema = (schemaRef: JSONSchemaType<any>, ref: string): any => {
  const path = ref?.replace('#/', '')?.split('/') || [];
  let resolvedObject = schemaRef;
  // eslint-disable-next-line
  for (const key of path) {
    if (key !== '') resolvedObject = resolvedObject[key];
  }
  return resolvedObject;
};

export const getFilteredObject = (schema: JSONSchemaType<any>, formModel: any): FilteredObject => {
  if (!schema) return schema;
  // clone deep to ensure we don't mix schemas
  const newSchema = cloneDeep(schema);

  const mainDataObject = schema.$ref ? resolveSchema(newSchema, newSchema.$ref) : newSchema;

  // Remove "required" key
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  delete mainDataObject.required;
  set(newSchema, [], mainDataObject);

  // filter by keys
  const filteredObject: FilteredObject = {};
  // eslint-disable-next-line
  for (const key in mainDataObject.properties) { // TODO reqrite as array iteration
    // eslint-disable-next-line
    if (formModel.hasOwnProperty(key)) {
      // eslint-disable-next-line
      filteredObject[key] = mainDataObject.properties[key].$ref ? resolveSchema(newSchema, mainDataObject.properties[key].$ref).properties : mainDataObject.properties[key];
    }
  }


  return filteredObject;
};


export const filterSchema = (schema: JSONSchemaType<any>, formModel: any): any => {
  if (!schema) return schema;
  // clone deep to ensure we don't mix schemas
  const newSchema = cloneDeep(schema);
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

type JsonSchema = Record<string, any>;

export function resolveRef(fullSchema: JsonSchema): JsonSchema {
  const root = fullSchema.$schema ? fullSchema : fullSchema.definitions;

  const traverse = (schema: JsonSchema): JsonSchema => {
    const innerSchema = cloneDeep(schema);
    if (innerSchema && typeof innerSchema === 'object') {
      if ('$ref' in innerSchema) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const refPath = innerSchema.$ref.split('/').slice(1);
        // eslint-disable-next-line
        return refPath.reduce((obj: { [x: string]: any; }, key: string | number) => obj && obj[key], root);
      }
      Object.entries(innerSchema).forEach(([key, value]) => {
        innerSchema[key] = traverse(value);
      });
    }
    return innerSchema;
  };

  return traverse(fullSchema);
}

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
