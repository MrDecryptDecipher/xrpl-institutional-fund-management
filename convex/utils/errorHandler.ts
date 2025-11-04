import { v } from "convex/values";

export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: any;
  timestamp: number;
}

export interface SuccessResponse<T = any> {
  success: true;
  data: T;
  timestamp: number;
}

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse;

export function createErrorResponse(
  error: string, 
  code?: string, 
  details?: any
): ErrorResponse {
  return {
    success: false,
    error,
    code,
    details,
    timestamp: Date.now()
  };
}

export function createSuccessResponse<T>(data: T): SuccessResponse<T> {
  return {
    success: true,
    data,
    timestamp: Date.now()
  };
}

export function createHttpResponse<T>(
  response: ApiResponse<T>,
  status?: number
): Response {
  const httpStatus = response.success ? (status || 200) : (status || 400);
  
  return new Response(JSON.stringify(response), {
    status: httpStatus,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}

