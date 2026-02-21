import { defineMiddleware } from 'astro:middleware';

// Session access is validated against the API. This keeps deployment flexible
// when web and API run on different Vercel projects/domains.
export const onRequest = defineMiddleware((_context, next) => {
  return next();
});
