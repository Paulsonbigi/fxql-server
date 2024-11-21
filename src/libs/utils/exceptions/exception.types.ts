export interface ErrorResponse {
  status?: number;
  name?: string;
  code?: string;
  message?: string;
  data?: any;
  stack?: any;
  meta?: any;
}
