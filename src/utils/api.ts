import axios, { AxiosError } from 'axios';

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const handleAPIError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const message = axiosError.response?.status === 429
      ? 'Too many requests. Please wait a moment and try again.'
      : axiosError.message;
    
    throw new APIError(
      message,
      axiosError.response?.status,
      axiosError.response?.data
    );
  }
  
  throw new APIError(
    error instanceof Error ? error.message : 'An unexpected error occurred'
  );
};