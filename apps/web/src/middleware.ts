import { defineMiddleware } from "astro:middleware";

const API_BASE_URL =
  import.meta.env.PUBLIC_API_BASE_URL ?? "http://localhost:4000/api";

function isPublicRoute(pathname: string): boolean {
  return pathname === "/login" || pathname.startsWith("/session/");
}

function isStaticAsset(pathname: string): boolean {
  return pathname.startsWith("/_astro/") || pathname.includes(".");
}

async function hasValidSession(request: Request): Promise<boolean> {
  const cookie = request.headers.get("cookie");

  if (!cookie) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/auth/me`, {
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

  if (isStaticAsset(pathname)) {
    return next();
  }

  const isAuthenticated = await hasValidSession(context.request);

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
