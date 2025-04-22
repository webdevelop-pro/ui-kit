import {
  describe, it, expect, beforeEach, vi,
} from 'vitest';
import { LoadingHandler } from '../loadingHandler';

describe('LoadingHandler', () => {
  let loadingHandler: LoadingHandler;

  beforeEach(() => {
    loadingHandler = new LoadingHandler();
  });

  describe('setLoading', () => {
    it('should set loading state', () => {
      loadingHandler.setLoading('test-key', true);
      expect(loadingHandler.isLoading('test-key')).toBe(true);

      loadingHandler.setLoading('test-key', false);
      expect(loadingHandler.isLoading('test-key')).toBe(false);
    });

    it('should handle multiple keys independently', () => {
      loadingHandler.setLoading('key1', true);
      loadingHandler.setLoading('key2', false);

      expect(loadingHandler.isLoading('key1')).toBe(true);
      expect(loadingHandler.isLoading('key2')).toBe(false);
    });

    it('should notify listeners when loading state changes', () => {
      const listener = vi.fn();
      loadingHandler.subscribe(listener);

      loadingHandler.setLoading('test-key', true);
      expect(listener).toHaveBeenCalledWith('test-key', true);

      loadingHandler.setLoading('test-key', false);
      expect(listener).toHaveBeenCalledWith('test-key', false);
    });
  });

  describe('isLoading', () => {
    it('should return false for non-existent keys', () => {
      expect(loadingHandler.isLoading('non-existent')).toBe(false);
    });

    it('should return correct loading state for existing keys', () => {
      loadingHandler.setLoading('test-key', true);
      expect(loadingHandler.isLoading('test-key')).toBe(true);
    });
  });

  describe('subscribe', () => {
    it('should add listener and return unsubscribe function', () => {
      const listener = vi.fn();
      const unsubscribe = loadingHandler.subscribe(listener);

      loadingHandler.setLoading('test-key', true);
      expect(listener).toHaveBeenCalledWith('test-key', true);

      unsubscribe();
      loadingHandler.setLoading('test-key', false);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should support multiple listeners', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      loadingHandler.subscribe(listener1);
      loadingHandler.subscribe(listener2);

      loadingHandler.setLoading('test-key', true);

      expect(listener1).toHaveBeenCalledWith('test-key', true);
      expect(listener2).toHaveBeenCalledWith('test-key', true);
    });

    it('should handle unsubscribe of specific listener', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      const unsubscribe1 = loadingHandler.subscribe(listener1);
      loadingHandler.subscribe(listener2);

      unsubscribe1();
      loadingHandler.setLoading('test-key', true);

      expect(listener1).not.toHaveBeenCalled();
      expect(listener2).toHaveBeenCalledWith('test-key', true);
    });
  });

  describe('edge cases', () => {
    it('should handle repeated subscriptions of the same listener', () => {
      const listener = vi.fn();

      loadingHandler.subscribe(listener);
      loadingHandler.subscribe(listener);

      loadingHandler.setLoading('test-key', true);

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should handle unsubscribe being called multiple times', () => {
      const listener = vi.fn();
      const unsubscribe = loadingHandler.subscribe(listener);

      unsubscribe();
      unsubscribe(); // Should not throw error

      loadingHandler.setLoading('test-key', true);
      expect(listener).not.toHaveBeenCalled();
    });

    it('should handle setting loading state to same value', () => {
      const listener = vi.fn();
      loadingHandler.subscribe(listener);

      loadingHandler.setLoading('test-key', true);
      loadingHandler.setLoading('test-key', true);

      expect(listener).toHaveBeenCalledTimes(2);
    });
  });
});
