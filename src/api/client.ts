import type {
  ApiError,
  ApiSystemError,
  ApiUnknownError,
  ApiValidationError,
} from "./errors";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "./tokenStorage";

const API_BASE_URL =
  (import.meta as { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL ??
  "https://rest-test.machineheads.ru";

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: BodyInit | null;
  skipAuth?: boolean;
};

export type ApiResponse<T> = {
  data: T;
  headers: Headers;
};

const parseResponseBody = async (response: Response) => {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
};

const buildError = (status: number, body: unknown): ApiError => {
  if (status === 422 && Array.isArray(body)) {
    return {
      type: "validation",
      status,
      errors: body
        .filter((item) => item && typeof item === "object")
        .map((item) => ({
          field: String((item as { field?: string }).field ?? ""),
          message: String((item as { message?: string }).message ?? ""),
        })),
    };
  }

  if (body && typeof body === "object") {
    const system = body as {
      name?: string;
      message?: string;
      code?: number;
      status?: number;
    };
    if (system.message || system.name || system.code) {
      return {
        type: "system",
        status,
        name: system.name,
        message: system.message,
        code: system.code,
      };
    }
  }

  return {
    type: "unknown",
    status,
    message: typeof body === "string" ? body : "Unexpected error",
  };
};

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw {
      type: "system",
      status: 401,
      message: "Refresh token is missing",
    } satisfies ApiSystemError;
  }

  const formData = new FormData();
  formData.append("refresh_token", refreshToken);

  const response = await fetch(`${API_BASE_URL}/auth/token-refresh`, {
    method: "POST",
    body: formData,
  });

  const body = await parseResponseBody(response);
  if (!response.ok) {
    throw buildError(response.status, body);
  }

  setTokens(
    body as {
      access_token: string;
      refresh_token: string;
      access_expired_at?: number;
      refresh_expired_at?: number;
    },
  );
  return body as {
    access_token: string;
    refresh_token: string;
    access_expired_at?: number;
    refresh_expired_at?: number;
  };
};

export const apiRequest = async <T>(
  path: string,
  options: RequestOptions = {},
  allowRetry = true,
): Promise<ApiResponse<T>> => {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const headers: Record<string, string> = {
    ...(options.headers ?? {}),
  };

  if (!options.skipAuth) {
    const token = getAccessToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    method: options.method ?? "GET",
    headers,
    body: options.body ?? null,
  });

  if (response.status === 401 && allowRetry && !options.skipAuth) {
    try {
      await refreshAccessToken();
      return apiRequest<T>(path, options, false);
    } catch (error) {
      clearTokens();
      throw error as ApiError;
    }
  }

  const body = await parseResponseBody(response);
  if (!response.ok) {
    throw buildError(response.status, body);
  }

  return { data: body as T, headers: response.headers };
};
