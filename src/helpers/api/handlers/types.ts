export interface ApiResponse<T = any> {
  data: T;
  status: number;
  headers: Headers;
}

export interface ApiError extends Error {
  status?: number;
  response?: any;
}

export interface RequestConfig extends RequestInit {
  baseURL?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  throttleWait?: number;
}
