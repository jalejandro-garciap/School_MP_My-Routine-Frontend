export interface ApiResponse<T> {
  success: boolean;
  messsage: string;
  data: T;
}

export interface ApiResponseError {
  success: boolean;
  messsage: string;
  errors: string[];
}