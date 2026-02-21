# Variables de Entorno para Vercel

## 1) Proyecto API (`apps/api`)
Configura estas variables en Vercel > Project > Settings > Environment Variables:

- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN` = `28800`
- `WEB_ORIGIN` = `https://psicometric.vercel.app`
- `NODE_ENV` = `production`
- `CLINIC_NAME` = `Psicometric Consultorio`
- `CLINIC_LOGO_PATH` (opcional)

Referencia: `apps/api/.env.vercel.example`

## 2) Proyecto Web (`apps/web`)
Configura:

- `PUBLIC_API_BASE_URL` = `/api`

Referencia: `apps/web/.env.vercel.example`

## 3) Orden recomendado de configuración
1. Claim de API.
2. Asignar variables de API.
3. Redeploy de API.
4. Claim de Web.
5. Asignar `PUBLIC_API_BASE_URL=/api`.
6. Redeploy de Web.
7. Renombrar proyecto Web a `psicometric` para obtener `https://psicometric.vercel.app`.

## 4) Nota importante sobre sesión
Usa `PUBLIC_API_BASE_URL=/api` para que el login pase por el mismo dominio del frontend y la cookie `httpOnly` se guarde en `psicometric.vercel.app`.
