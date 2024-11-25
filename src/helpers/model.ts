import { JSONSchemaType } from 'ajv';
import cloneDeep from 'lodash/cloneDeep';
import { capitalizeFirstLetter } from 'UiKit/helpers/text';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export function populateModel<T>(source: Partial<T>, defaults: T): T {
  return Object.keys(defaults).reduce((acc, key) => {
    const typedKey = key as keyof T;
    acc[typedKey] = source?.[typedKey] !== undefined ? source[typedKey] : defaults[typedKey];
    return acc;
  }, {} as T);
}


// Function to initialize properties recursively
const initializeProperties = (properties: Record<string, any>): Record<string, any> => {
  // Default type initializers for known types
  const defaultValueMap: Record<string, any> = {
    string: '',
    number: 0,
    object: {},
    boolean: false,
  };
  return Object.keys(properties).reduce((acc, key) => {
    const prop = properties[key];

    // Handle nested objects
    if (prop.type === 'object' && prop.properties) {
      acc[key] = initializeProperties(prop.properties);
    } else {
      // Handle basic types
      acc[key] = defaultValueMap[prop.type] ?? null;
    }

    return acc;
  }, {} as Record<string, any>);
};

export const createFormModel = (schema: JSONSchemaType<T>): Record<string, any> => {
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
  // Initialize form model based on the schema's root definition
  const rootDefinition = mainDataObject.properties;
  return initializeProperties(rootDefinition);
};


export const getOptions = (
  fieldPath: string,
  schemaObject: object, // Pass schemaObject as a prop
): { value: string; name: string }[] => {
  const optionsCache = new Map<string, { value: string; name: string }[]>();
  // Check if options for this field are already cached
  if (optionsCache.has(fieldPath)) {
    return optionsCache.get(fieldPath) || [];
  }

  // Split the fieldPath into parts and traverse the schema object
  const target = fieldPath.split('.').reduce((acc, part) => acc?.[part], schemaObject.value);

  // If the target field doesn't exist, return empty options
  if (!target) {
    optionsCache.set(fieldPath, []);
    return [];
  }

  // Extract the options (enum and enumNames) from the target field
  const values = target?.enum || [];
  const names = target?.enumNames || [];

  // Map the values and names to an array of objects { value, name }
  const options = values.map((value: string, index: number) => ({
    value,
    name: capitalizeFirstLetter(names[index] || value), // Default to the value itself if no enumNames
  }));

  // Cache the options for future use
  optionsCache.set(fieldPath, options);

  return options;
};
