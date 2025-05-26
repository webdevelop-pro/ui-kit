import { v4 as uuidv4 } from 'uuid';
import { ErrorHandler } from './handlers/errorHandler';
import {
  ApiResponse, RequestConfig, ApiError,
} from './types';

export class ApiClient {
  private errorHandler = new ErrorHandler();

  private pendingRequests = new Map<string, Promise<any>>();

  constructor(private baseURL: string = '') {
    this.baseURL = new URL(baseURL || window.location.origin).toString();
  }

  private async executeRequest<T>(url: string, config: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const fullUrl = new URL(url, config.baseURL || this.baseURL);

      if (config.params) {
        Object.entries(config.params).forEach(([key, value]) => {
          if (value != null) {
            fullUrl.searchParams.append(key, String(value));
          }
        });
      }

      const response = await fetch(fullUrl.toString(), {
        credentials: 'include',
        ...config,
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          'X-Request-ID': uuidv4(),
          ...config.headers,
        },
      });

      if (!response.ok) {
        throw new ApiError(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();

      return {
        data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        await this.errorHandler.handle(error);
        throw error;
      }
      throw new ApiError(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  async request<T>(url: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const requestKey = `${config.method || 'GET'}-${url}`;

    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }

    const promise = this.executeRequest<T>(url, config);
    this.pendingRequests.set(requestKey, promise);

    try {
      return await promise;
    } finally {
      this.pendingRequests.delete(requestKey);
    }
  }

  get<T>(url: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  post<T>(url: string, data?: any, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<T>(url: string, data?: any, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  patch<T>(url: string, data?: any, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  delete<T>(url: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }

  async getPaginated<T>(
    url: string,
    page: number,
    limit: number,
    config?: Omit<RequestConfig, 'method' | 'body'>,
  ): Promise<ApiResponse<T> & { pagination: { currentPage: number; totalPages: number; totalItems: number; itemsPerPage: number } }> {
    const response = await this.get<T>(url, {
      ...config,
      params: {
        ...config?.params,
        page,
        limit,
      },
    });

    const totalItems = Number(response.headers.get('x-total-count')) || 0;
    const itemsPerPage = limit;

    return {
      ...response,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / itemsPerPage),
        totalItems,
        itemsPerPage,
      },
    };
  }
}
