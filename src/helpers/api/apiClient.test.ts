import {
  describe, it, expect, beforeEach, vi, afterEach,
} from 'vitest';
import { ApiClient } from './apiClient';
import { ApiError } from './types';

describe('ApiClient', () => {
  let apiClient: ApiClient;
  const mockFetch = vi.fn();
  const baseURL = 'https://api.example.com';

  beforeEach(() => {
    apiClient = new ApiClient(baseURL);
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('request', () => {
    it('should make successful request with default config', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve({ data: 'test' }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const response = await apiClient.request('/test');

      expect(response).toEqual({
        data: { data: 'test' },
        status: 200,
        headers: expect.any(Headers),
      });
      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/test`,
        expect.objectContaining({
          credentials: 'include',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            accept: 'application/json',
            'X-Request-ID': expect.any(String),
          }),
        }),
      );
    });

    it('should handle non-JSON responses', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'text/plain' }),
        text: () => Promise.resolve('plain text'),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const response = await apiClient.request('/test');

      expect(response.data).toBe('plain text');
    });

    it('should handle request errors with status code', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: () => Promise.resolve({ message: 'Resource not found' }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const promise = apiClient.request('/test');
      await expect(promise).rejects.toMatchObject({
        message: 'HTTP error! status: 404',
        response: {
          error: expect.any(ApiError),
          message: 'HTTP error! status: 404',
          data: {
            timestamp: expect.any(Number),
          },
        },
      });
    });

    it('should deduplicate concurrent requests', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve({ data: 'test' }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const [response1, response2] = await Promise.all([
        apiClient.request('/test'),
        apiClient.request('/test'),
      ]);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(response1).toEqual(response2);
    });

    it('should handle custom baseURL in request config', async () => {
      const customBaseURL = 'https://custom.example.com';
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve({ data: 'test' }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      await apiClient.request('/test', { baseURL: customBaseURL });

      expect(mockFetch).toHaveBeenCalledWith(
        `${customBaseURL}/test`,
        expect.any(Object),
      );
    });

    it('should handle URL parameters correctly', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve({ data: 'test' }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const params = {
        search: 'test',
        page: 1,
        active: true,
        empty: null,
        undefined,
      };

      await apiClient.request('/test', { params });

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/test?search=test&page=1&active=true`,
        expect.any(Object),
      );
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const promise = apiClient.request('/test');
      await expect(promise).rejects.toThrow(ApiError);
      await expect(promise).rejects.toMatchObject({
        message: 'Network error',
      });
    });
  });

  describe('HTTP methods', () => {
    const mockSuccessResponse = {
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: () => Promise.resolve({ data: 'test' }),
    };

    beforeEach(() => {
      mockFetch.mockResolvedValue(mockSuccessResponse);
    });

    it('should make GET request with params', async () => {
      await apiClient.get('/test', { params: { q: 'search' } });

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/test?q=search`,
        expect.objectContaining({
          method: 'GET',
          credentials: 'include',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            accept: 'application/json',
            'X-Request-ID': expect.any(String),
          }),
        }),
      );
    });

    it('should make POST request with data', async () => {
      const data = { name: 'test' };
      await apiClient.post('/test', data);

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/test`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(data),
          credentials: 'include',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            accept: 'application/json',
            'X-Request-ID': expect.any(String),
          }),
        }),
      );
    });

    it('should handle FormData in POST request', async () => {
      const formData = new FormData();
      formData.append('file', new Blob(['test']));
      formData.append('name', 'test.txt');

      await apiClient.post('/test', formData);

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/test`,
        expect.objectContaining({
          method: 'POST',
          body: formData,
          credentials: 'include',
          headers: expect.objectContaining({
            accept: 'application/json',
            'X-Request-ID': expect.any(String),
          }),
        }),
      );
      // Should not have Content-Type header for FormData
      expect(mockFetch.mock.calls[0][1].headers['Content-Type']).toBeUndefined();
    });

    it('should handle absolute URLs correctly', async () => {
      const absoluteUrl = 'https://other-api.example.com/test';
      await apiClient.post(absoluteUrl, { data: 'test' });

      expect(mockFetch).toHaveBeenCalledWith(
        absoluteUrl,
        expect.any(Object),
      );
    });

    it('should handle baseURL override correctly', async () => {
      const customBaseURL = 'https://custom.example.com';
      await apiClient.post('/test', { data: 'test' }, { baseURL: customBaseURL });

      expect(mockFetch).toHaveBeenCalledWith(
        `${customBaseURL}/test`,
        expect.any(Object),
      );
    });

    it('should make PUT request with data', async () => {
      const data = { name: 'test' };
      await apiClient.put('/test', data);

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/test`,
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(data),
          credentials: 'include',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            accept: 'application/json',
            'X-Request-ID': expect.any(String),
          }),
        }),
      );
    });

    it('should make OPTIONS request', async () => {
      await apiClient.options('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/test`,
        expect.objectContaining({
          method: 'OPTIONS',
          credentials: 'include',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            accept: 'application/json',
            'X-Request-ID': expect.any(String),
          }),
        }),
      );
    });

    it('should make OPTIONS request with params', async () => {
      await apiClient.options('/test', { params: { q: 'search' } });

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/test?q=search`,
        expect.objectContaining({
          method: 'OPTIONS',
          credentials: 'include',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            accept: 'application/json',
            'X-Request-ID': expect.any(String),
          }),
        }),
      );
    });

    it('should make PATCH request with data', async () => {
      const data = { name: 'test' };
      await apiClient.patch('/test', data);

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/test`,
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(data),
          credentials: 'include',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            accept: 'application/json',
            'X-Request-ID': expect.any(String),
          }),
        }),
      );
    });

    it('should make DELETE request', async () => {
      await apiClient.delete('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/test`,
        expect.objectContaining({
          method: 'DELETE',
          credentials: 'include',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            accept: 'application/json',
            'X-Request-ID': expect.any(String),
          }),
        }),
      );
    });
  });

  describe('getPaginated', () => {
    it('should handle paginated requests with valid headers', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
          'x-total-count': '100',
        }),
        json: () => Promise.resolve({ data: [] }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const response = await apiClient.getPaginated('/test', 1, 10);

      expect(response).toMatchObject({
        data: { data: [] },
        status: 200,
        pagination: {
          currentPage: 1,
          totalPages: 10,
          totalItems: 100,
          itemsPerPage: 10,
        },
      });
    });

    it('should handle paginated requests with missing total count', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
        }),
        json: () => Promise.resolve({ data: [] }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const response = await apiClient.getPaginated('/test', 1, 10);

      expect(response).toMatchObject({
        data: { data: [] },
        status: 200,
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: 10,
        },
      });
    });

    it('should include custom params in paginated request', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({
          'content-type': 'application/json',
          'x-total-count': '100',
        }),
        json: () => Promise.resolve({ data: [] }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      await apiClient.getPaginated('/test', 1, 10, {
        params: { filter: 'active' },
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringMatching(/^https:\/\/api\.example\.com\/test\?.*$/),
        expect.objectContaining({
          method: 'GET',
          credentials: 'include',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            accept: 'application/json',
            'X-Request-ID': expect.any(String),
          }),
        }),
      );

      // Verify URL contains all required parameters regardless of order
      const url = mockFetch.mock.calls[0][0];
      const urlParams = new URL(url).searchParams;
      expect(urlParams.get('page')).toBe('1');
      expect(urlParams.get('limit')).toBe('10');
      expect(urlParams.get('filter')).toBe('active');
    });
  });

  describe('error handling', () => {
    it('should handle malformed JSON', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.reject(new Error('Invalid JSON')),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(apiClient.request('/test')).rejects.toThrow(ApiError);
    });

    it('should handle unknown errors', async () => {
      const nonErrorObject = { someProperty: 'value' };
      mockFetch.mockRejectedValueOnce(nonErrorObject);

      const promise = apiClient.request('/test');
      await expect(promise).rejects.toThrow(ApiError);
      await expect(promise).rejects.toMatchObject({
        message: 'Unknown error',
      });
    });
  });
});
