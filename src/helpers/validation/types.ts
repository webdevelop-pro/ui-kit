export type ErrorSchema<T = any> = {
  [key: string]: ErrorSchema<T>;
} & {
  __errors?: string[];
};

export interface ValidationError {
  name: string;
  property: string; // dotted path, e.g. "level1.level2.0.field"
  message?: string;
  params?: Record<string, unknown>;
  schemaPath?: string;
}


