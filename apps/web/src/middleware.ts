import { defineMiddleware } from "astro:middleware";

const AUTH_COOKIE_NAME = "psicometric_token";

function isPublicRoute(pathname: string): boolean {
  return pathname === "/login" || pathname.startsWith("/session/");
}

function isStaticAsset(pathname: string): boolean {
  return pathname.startsWith("/_astro/") || pathname.includes(".");
}

function hasSessionCookie(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) {
    return false;
  }

  return cookieHeader
    .split(";")
    .some((cookie) => cookie.trim().startsWith(`${AUTH_COOKIE_NAME}=`));
}

async function hasValidSession(request: Request, origin: string): Promise<boolean> {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) {
    return false;
  }

  try {
    const response = await fetch(`${origin}/api/auth/me`, {
      headers: { cookie: cookieHeader },
    });

    return response.ok;
  } catch {
    return false;
  }
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, origin } = context.url;

  if (isStaticAsset(pathname) || pathname.startsWith("/api/")) {
    return next();
  }

  const hasCookie = hasSessionCookie(context.request);

  if (pathname === "/login") {
    if (hasCookie && (await hasValidSession(context.request, origin))) {
      return context.redirect("/");
    }

    return next();
  }

  if (isPublicRoute(pathname)) {
    return next();
  }

  if (!hasCookie) {
    return context.redirect("/login");
  }

  return next();
});
