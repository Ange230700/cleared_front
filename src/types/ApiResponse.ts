// src\types\ApiResponse.ts

export type ApiResponseSuccess<T = unknown> = {
  status: "success";
  data: T;
  error: null;
};

export type ApiResponseError = {
  status: "error";
  data: null;
  error: { message: string; [key: string]: unknown };
};

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;
