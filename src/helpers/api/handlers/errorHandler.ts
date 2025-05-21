import { ApiError } from './types';

interface ErrorResponse {
  error: string;
  message: string;
  data: {
    timestamp: number;
  }
}

export class ErrorHandler {
  async handle(error: any): Promise<never> {
    const errorResponse: ErrorResponse = {
      error,
      message: await this.getErrorMessage(error),
      data: {
        timestamp: Date.now(),
      },
    };

    const apiError: ApiError = new Error(errorResponse.message);
    apiError.response = errorResponse;

    throw apiError;
  }

  // eslint-disable-next-line class-methods-use-this
  private async getErrorMessage(error: any): Promise<string> {
    if (error instanceof Response) {
      try {
        const data = await error.json();
        return data.__error__ || data.message || error.statusText || 'An error occurred';
      } catch {
        return error.statusText || 'An error occurred';
      }
    }
    return error.message || 'An error occurred';
  }
}
