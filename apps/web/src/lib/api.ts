const DEFAULT_API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:4000/api"
  : "/api";

const API_BASE_URL =
  import.meta.env.PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function normalizedApiBaseUrl() {
  return API_BASE_URL.endsWith("/") ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
}

function apiUrl(path: string): string {
  return `${normalizedApiBaseUrl()}${path}`;
}

async function parseResponse(response: Response) {
  if (response.status === 204) {
    return null;
  }

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");

  if (!isJson) {
    return null;
  }

  return response.json();
}

function withJsonHeaders(init?: RequestInit): RequestInit {
  const headers = new Headers(init?.headers);

  // Set JSON content type only when sending a non-FormData body.
  const hasBody = init?.body !== undefined && init?.body !== null;
  const isFormData =
    typeof FormData !== "undefined" && init?.body instanceof FormData;

  if (hasBody && !isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  return {
    ...init,
    headers,
  };
}

async function request<T>(
  path: string,
  init: RequestInit,
  options: { redirectOnUnauthorized: boolean },
): Promise<T> {
  const response = await fetch(apiUrl(path), init);
  const payload = await parseResponse(response);

  if (!response.ok) {
    const message =
      payload && typeof payload.message === "string"
        ? payload.message
        : "Error inesperado al comunicarse con la API";

    const error = new ApiError(message, response.status);
    const browserWindow = globalThis.window;

    if (
      browserWindow &&
      options.redirectOnUnauthorized &&
      response.status === 401 &&
      path !== "/auth/login"
    ) {
      browserWindow.location.href = "/login";
    }

    throw error;
  }

  return payload as T;
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  return request<T>(
    path,
    {
      ...withJsonHeaders(init),
      credentials: "include",
    },
    { redirectOnUnauthorized: true },
  );
}

export async function apiFetchPublic<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  return request<T>(
    path,
    {
      ...withJsonHeaders(init),
      credentials: "omit",
    },
    { redirectOnUnauthorized: false },
  );
}

export function apiDownloadUrl(path: string): string {
  return apiUrl(path);
}
