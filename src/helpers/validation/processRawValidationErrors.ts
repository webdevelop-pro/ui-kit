import { ErrorObject } from 'ajv';
import { ErrorSchema, ValidationError } from './types';
import { toErrorSchema } from './toErrorSchema';
import { REQUIRED_ERROR_MESSAGE } from './constants';


export function transformValidationErrors(errors: ErrorObject[] = []): ValidationError[] {
  return errors.flatMap((e: ErrorObject) => {
    const {
      instancePath, keyword, params, schemaPath, message,
    } = e;
    const formattedErrors: ValidationError[] = [];

    if (keyword === 'errorMessage' && params.errors) {
      // eslint-disable-next-line
      params.errors.forEach((error: ErrorObject) => {
        let property = error.instancePath ? error.instancePath.replace(/^\//, '').replace(/\//g, '.') : '';
        if ('missingProperty' in error.params) {
          property = error.params.missingProperty;
        }
        formattedErrors.push({
          name: error.keyword,
          property,
          message,
          params: error.params,
          schemaPath: error.schemaPath,
        });
      });
    } else {
      let property = instancePath ? instancePath.replace(/^\//, '').replace(/\//g, '.') : '';
      if ('missingProperty' in params) {
        property = property ? `${property}.${params.missingProperty}` : params.missingProperty;
      }
      if ('failingKeyword' in params) {
        property = property ? `${property}.${params.failingKeyword}` : params.failingKeyword;
      }

      let messageFormatted = message;
      switch (keyword) {
        case 'required':
          messageFormatted = REQUIRED_ERROR_MESSAGE;
          break;
        case 'minLength':
          messageFormatted = `Should have at least ${params.limit} characters`;
          break;
        default:
      }

      formattedErrors.push({
        name: keyword,
        property,
        message: messageFormatted,
        params,
        schemaPath,
      });
    }

    return formattedErrors;
  });
}

interface ErrorSchema {
  [key: string]: any;
}

function formatErrorSchema(schema: ErrorSchema): ErrorSchema {
  if ('__errors' in schema) {
    // eslint-disable-next-line
    return schema.__errors.join(', ');
  }
  const formattedSchema: ErrorSchema = {};
  // eslint-disable-next-line
  for (const key in schema) {
    // eslint-disable-next-line
    if (schema.hasOwnProperty(key)) {
      formattedSchema[key] = formatErrorSchema(schema[key]);
    }
  }
  return formattedSchema;
}

export function processRawValidationErrors(rawErrors: ErrorObject[]) {
  const errors = transformValidationErrors(rawErrors);
  const errorsSchema = toErrorSchema(errors);
  return formatErrorSchema(errorsSchema);
}
