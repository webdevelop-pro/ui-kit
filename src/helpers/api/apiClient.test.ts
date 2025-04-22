import {
  describe, it, expect, beforeEach, vi, afterEach,
} from 'vitest';
import { ApiClient } from './apiClient';

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
    it('should make successful request', async () => {
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

    it('should handle request errors', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: () => Promise.resolve({ message: 'Resource not found' }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(apiClient.request('/test')).rejects.toThrow();
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

    it('should make GET request', async () => {
      await apiClient.get('/test', { params: { q: 'search' } });

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/test?q=search`,
        expect.objectContaining({ method: 'GET' }),
      );
    });

    it('should make POST request', async () => {
      const data = { name: 'test' };
      await apiClient.post('/test', data);

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/test`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(data),
        }),
      );
    });

    it('should make PUT request', async () => {
      const data = { name: 'test' };
      await apiClient.put('/test', data);

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/test`,
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      );
    });

    it('should make PATCH request', async () => {
      const data = { name: 'test' };
      await apiClient.patch('/test', data);

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/test`,
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(data),
        }),
      );
    });

    it('should make DELETE request', async () => {
      await apiClient.delete('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        `${baseURL}/test`,
        expect.objectContaining({ method: 'DELETE' }),
      );
    });
  });

  describe('getPaginated', () => {
    it('should handle paginated requests', async () => {
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
        pagination: {
          currentPage: 1,
          totalPages: 10,
          totalItems: 100,
          itemsPerPage: 10,
        },
      });
    });
  });

  describe('error handling', () => {
    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(apiClient.request('/test')).rejects.toThrow('Network error');
    });

    it('should handle malformed JSON', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.reject(new Error('Invalid JSON')),
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      await expect(apiClient.request('/test')).rejects.toThrow();
    });
  });
});
