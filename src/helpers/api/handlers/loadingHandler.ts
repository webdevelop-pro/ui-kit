export class LoadingHandler {
  private loadingStates = new Map<string, boolean>();

  private listeners = new Set<(key: string, isLoading: boolean) => void>();

  setLoading(key: string, isLoading: boolean): void {
    this.loadingStates.set(key, isLoading);
    this.notifyListeners(key, isLoading);
  }

  isLoading(key: string): boolean {
    return this.loadingStates.get(key) || false;
  }

  subscribe(listener: (key: string, isLoading: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(key: string, isLoading: boolean): void {
    this.listeners.forEach((listener) => listener(key, isLoading));
  }
}
