export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

export interface RequestConfig extends RequestInit {
  baseURL?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type ActionState<T> = {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
};
