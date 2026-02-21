const API_BASE_URL =
  import.meta.env.PUBLIC_API_BASE_URL ?? "http://localhost:4000/api";

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
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

async function request<T>(
  path: string,
  init: RequestInit,
  options: { redirectOnUnauthorized: boolean },
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);
  const payload = await parseResponse(response);

  if (!response.ok) {
    const message =
      payload && typeof payload.message === "string"
        ? payload.message
        : "Error inesperado al comunicarse con la API";

    const error = new ApiError(message, response.status);

    if (
      typeof window !== "undefined" &&
      options.redirectOnUnauthorized &&
      response.status === 401 &&
      path !== "/auth/login" &&
      path !== "/auth/register"
    ) {
      window.location.href = "/login";
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
      ...init,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
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
      ...init,
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
    },
    { redirectOnUnauthorized: false },
  );
}

export function apiDownloadUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}
