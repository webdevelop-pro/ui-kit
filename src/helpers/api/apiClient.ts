import { v4 as uuidv4 } from 'uuid';
import { ErrorHandler } from './handlers/errorHandler';
import { LoadingHandler } from './handlers/loadingHandler';
import {
  ApiResponse, RequestConfig, HttpMethod, ApiError,
} from './types';

export class ApiClient {
  private errorHandler = new ErrorHandler();

  private loadingHandler = new LoadingHandler();

  private pendingRequests = new Map<string, Promise<any>>();

  constructor(private baseURL: string = '') {
    this.baseURL = new URL(baseURL || window.location.origin).toString();
  }

  async request<T>(
    url: string,
    config: RequestConfig = {},
  ): Promise<ApiResponse<T>> {
    const requestKey = `${config.method || 'GET'}-${url}`;

    if (this.loadingHandler.isLoading(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }

    try {
      this.loadingHandler.setLoading(requestKey, true);
      const promise = this.executeRequest<T>(url, config);
      this.pendingRequests.set(requestKey, promise);
      return await promise;
    } finally {
      this.loadingHandler.setLoading(requestKey, false);
      this.pendingRequests.delete(requestKey);
    }
  }

  private async executeRequest<T>(url: string, config: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const fullUrl = new URL(url, config.baseURL || this.baseURL);

      // Add query params support
      if (config.params) {
        Object.entries(config.params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
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
        throw new ApiError(response);
      }

      let data: T;
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text() as unknown as T;
      }

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

  get<T>(url: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  post<T, D = any>(
    url: string,
    data?: D,
    config?: Omit<RequestConfig, 'method' | 'body'>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    });
  }

  put<T, D = any>(
    url: string,
    data?: D,
    config?: Omit<RequestConfig, 'method' | 'body'>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    });
  }

  patch<T, D = any>(
    url: string,
    data?: D,
    config?: Omit<RequestConfig, 'method' | 'body'>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
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
  ): Promise<PaginatedResponse<T>> {
    const response = await this.get<T>(url, {
      ...config,
      params: {
        ...config?.params,
        page,
        limit,
      },
    });

    const totalItems = Number(response.headers.get('x-total-count'));
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
