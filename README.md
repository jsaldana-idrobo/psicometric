# Psicometric Monorepo

MVP para gestión de evaluaciones psicotécnicas laborales.

## Stack
- Frontend: Astro + React (`apps/web`)
- Backend: NestJS + MongoDB (`apps/api`)
- Monorepo: pnpm workspaces + turbo

## Requisitos
- Node.js 20+
- pnpm 10+
- Docker (opcional, para Mongo local)

## Arranque local
1. Instalar dependencias:
   ```bash
   pnpm install
   ```
2. Levantar Mongo local (opcional):
   ```bash
   pnpm db:up
   ```
3. Configurar variables de entorno:
   - Copia `apps/api/.env.example` a `apps/api/.env`
   - Copia `apps/web/.env.example` a `apps/web/.env`
4. Ejecutar en desarrollo:
   ```bash
   pnpm dev
   ```

Servicios:
- Web: `http://localhost:4321`
- API: `http://localhost:4000/api`

## Rutas principales API
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET/POST/PATCH/DELETE /api/patients`
- `GET /api/tests`
- `POST /api/results`
- `GET /api/results/patient/:patientId`
- `PATCH /api/results/:id/notes`
- `GET /api/reports/patient/:patientId/pdf`

## Despliegue Vercel
### Web (URL objetivo limpia)
1. Crea proyecto en Vercel con root `apps/web`.
2. Asigna el nombre de proyecto `psicometric` para obtener `https://psicometric.vercel.app`.
3. Configura env var:
   - `PUBLIC_API_BASE_URL=/api`
4. La app usa `apps/web/vercel.json` para hacer proxy same-origin hacia API y mantener cookies de sesión en el dominio web.

### API
1. Crea proyecto en Vercel con root `apps/api`.
2. La app usa `apps/api/vercel.json` para ejecutar Nest en función serverless.
3. Configura env vars en Vercel:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN=28800`
   - `WEB_ORIGIN=https://psicometric.vercel.app`
   - `NODE_ENV=production`
   - `CLINIC_NAME`
   - `CLINIC_LOGO_PATH` (opcional)

## Notas
- Los usuarios los crea el administrador (no hay registro público en el login).
- Las pruebas del MVP se cargan automáticamente en el backend al iniciar si la colección `tests` está vacía.
