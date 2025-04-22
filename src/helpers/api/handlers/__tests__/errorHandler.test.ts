import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { ErrorHandler } from '../errorHandler';

describe('ErrorHandler', () => {
  const errorHandler = new ErrorHandler();

  describe('handle', () => {
    it('should handle Response error with __error__ field', async () => {
      const mockResponse = new Response(
        JSON.stringify({ __error__: 'Custom error message' }),
        { status: 400, statusText: 'Bad Request' },
      );

      await expect(errorHandler.handle(mockResponse)).rejects.toMatchObject({
        message: 'Custom error message',
        response: {
          error: mockResponse,
          message: 'Custom error message',
          data: expect.objectContaining({
            timestamp: expect.any(Number),
          }),
        },
      });
    });

    it('should handle Response error with message field', async () => {
      const mockResponse = new Response(
        JSON.stringify({ message: 'Error message' }),
        { status: 400, statusText: 'Bad Request' },
      );

      await expect(errorHandler.handle(mockResponse)).rejects.toMatchObject({
        message: 'Error message',
        response: {
          error: mockResponse,
          message: 'Error message',
          data: expect.objectContaining({
            timestamp: expect.any(Number),
          }),
        },
      });
    });

    it('should handle Response error with statusText when JSON parsing fails', async () => {
      const mockResponse = new Response('Invalid JSON', {
        status: 400,
        statusText: 'Bad Request',
      });

      await expect(errorHandler.handle(mockResponse)).rejects.toMatchObject({
        message: 'Bad Request',
        response: {
          error: mockResponse,
          message: 'Bad Request',
          data: expect.objectContaining({
            timestamp: expect.any(Number),
          }),
        },
      });
    });

    it('should handle Response error with default message when no other message is available', async () => {
      const mockResponse = new Response('Invalid JSON', { status: 400 });

      await expect(errorHandler.handle(mockResponse)).rejects.toMatchObject({
        message: 'An error occurred',
        response: {
          error: mockResponse,
          message: 'An error occurred',
          data: expect.objectContaining({
            timestamp: expect.any(Number),
          }),
        },
      });
    });

    it('should handle Error object with message', async () => {
      const error = new Error('Custom error');

      await expect(errorHandler.handle(error)).rejects.toMatchObject({
        message: 'Custom error',
        response: {
          error,
          message: 'Custom error',
          data: expect.objectContaining({
            timestamp: expect.any(Number),
          }),
        },
      });
    });

    it('should handle generic error without message', async () => {
      const error = {};

      await expect(errorHandler.handle(error)).rejects.toMatchObject({
        message: 'An error occurred',
        response: {
          error,
          message: 'An error occurred',
          data: expect.objectContaining({
            timestamp: expect.any(Number),
          }),
        },
      });
    });

    it('should include timestamp in error response', async () => {
      const errorHandler = new ErrorHandler();
      const error = new Error('Test error');
      const beforeTest = Date.now();

      try {
        await errorHandler.handle(error);
      } catch (e: any) {
        const { timestamp } = e.response.data;
        expect(timestamp).toBeTypeOf('number');
        expect(timestamp).toBeGreaterThanOrEqual(beforeTest);
        expect(timestamp).toBeLessThanOrEqual(Date.now());
      }
    });
  });
});
