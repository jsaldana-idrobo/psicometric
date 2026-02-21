import { defineMiddleware } from "astro:middleware";

const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL ?? "/api";

function isPublicRoute(pathname: string): boolean {
  return pathname === "/login" || pathname.startsWith("/session/");
}

function isStaticAsset(pathname: string): boolean {
  return pathname.startsWith("/_astro/") || pathname.includes(".");
}

function resolveApiBaseUrl(originUrl: URL): string {
  const normalized = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return normalized;
  }

  const basePath = normalized.startsWith("/") ? normalized : `/${normalized}`;
  return new URL(basePath, originUrl.origin).toString().replace(/\/$/, "");
}

async function hasValidSession(request: Request, apiBaseUrl: string): Promise<boolean> {
  const cookie = request.headers.get("cookie");

  if (!cookie) {
    return false;
  }

  try {
    const response = await fetch(`${apiBaseUrl}/auth/me`, {
      headers: { cookie },
    });

    return response.ok;
  } catch {
    return false;
  }
}

// Session access is validated against the API. This keeps deployment flexible
// when web and API run on different Vercel projects/domains.
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  if (isStaticAsset(pathname) || pathname.startsWith("/api/")) {
    return next();
  }

  const isAuthenticated = await hasValidSession(
    context.request,
    resolveApiBaseUrl(context.url),
  );

  if (isPublicRoute(pathname)) {
    if (pathname === "/login" && isAuthenticated) {
      return context.redirect("/");
    }

    return next();
  }

  if (!isAuthenticated) {
    return context.redirect("/login");
  }

  return next();
});
