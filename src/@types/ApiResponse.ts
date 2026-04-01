import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    status: number;
}

export interface LoginTokenPayload {
  email: string;
  iat: number;
  exp: number;
}

export interface MutationConfig {
  key: string[];
  url: string;
  enabled?: boolean;
}