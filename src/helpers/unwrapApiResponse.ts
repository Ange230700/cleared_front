// src\helpers\unwrapApiResponse.ts

import type { ApiResponse } from "~/src/types/ApiResponse";

export function unwrapApiResponse<T>(response: ApiResponse<T>): T {
  if (response.status === "success") return response.data;
  throw new Error(response.error?.message || "API error");
}
