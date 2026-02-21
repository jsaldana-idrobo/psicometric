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

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  if (isStaticAsset(pathname) || pathname.startsWith("/api/")) {
    return next();
  }

  const isAuthenticated = hasSessionCookie(context.request);

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
