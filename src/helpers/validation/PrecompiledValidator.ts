
import { ajv } from './ajv';
import { JSONSchemaType, ValidateFunction } from 'ajv';
import { processRawValidationErrors } from './processRawValidationErrors';
import merge from 'lodash/merge';
import { undefinedEmptyProp } from './general';

export class PrecompiledValidator<T> {
  private readonly rootSchema: JSONSchemaType<T>;

  private readonly compiledValidator: ValidateFunction<T>;

  constructor(schema1: JSONSchemaType<T>, schema2?: JSONSchemaType<T>) {
    let schema = schema1;
    if (schema2) schema = merge(schema1, schema2);
    this.rootSchema = schema;
    this.compiledValidator = this.getCompiledValidator(schema);
  }

  private getRawErrors() {
    const { errors } = this.compiledValidator;
    this.compiledValidator.errors = null;

    return errors;
  }

  // eslint-disable-next-line
  private getCompiledValidator(schema: JSONSchemaType<T>) {
    return ajv.compile(schema);
  }

  private getIsValid(formData: T) {
    return this.compiledValidator(formData);
  }

  private getRawValidation(formData: T) {
    this.getIsValid(formData);
    return this.getRawErrors();
  }

  public getFormValidationErrors(formData: T) {
    const rawErrors = this.getRawValidation(undefinedEmptyProp(formData));
    // Need empty structure here
    // Solve this if no error validation
    if (!rawErrors) return {};
    return processRawValidationErrors(rawErrors);
  }
}
