export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface ApiErrorData {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}
