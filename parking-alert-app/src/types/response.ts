export interface IResponse<T = any> {
  code?: string;
  message?: string;
  data?: T;
}
