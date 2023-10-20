export interface ApiResponse<T> {
  success: boolean;
  messsage: string;
  data: T;
}