/** The type that describes an error in a field */
export type FieldError = string;

/** The type that describes the list of errors for a field */
export type FieldErrors = {
  /** The list of errors for the field */
  __errors?: FieldError[];
};

/** Type describing a recursive structure of `FieldErrors`s for an object with a non-empty set of keys */
export type ErrorSchema<T = any> = FieldErrors & {
  /** The set of errors for fields in the recursive object structure */
  [key in keyof T]?: ErrorSchema<T[key]>;
};

/** The type for error produced by RJSF schema validation */
export type ValidationError = {
  /** Name of the error, for example, "required" or "minLength" */
  name?: string;
  /** Message, for example, "is a required property" or "should NOT be shorter than 3 characters" */
  message?: string;
  /** An object with the error params returned by ajv
   * ([see doc](https://github.com/ajv-validator/ajv/tree/6a671057ea6aae690b5967ee26a0ddf8452c6297#error-parameters)
   * for more info)
   */
  params?: any;
  /** A string in Javascript property accessor notation to the data path of the field with the error. For example,
   * `.name` or `['first-name']`
   */
  property?: string;
  /** JSON pointer to the schema of the keyword that failed validation. For example, `#/fields/firstName/required`.
   * (Note: this may sometimes be wrong due to a [bug in ajv](https://github.com/ajv-validator/ajv/issues/512))
   */
  schemaPath?: string;
};
