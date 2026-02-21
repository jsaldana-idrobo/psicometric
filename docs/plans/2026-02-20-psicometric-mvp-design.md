# Diseño MVP - Psicometric

## Contexto
Equipo de psicólogos que hoy opera en Excel + Word para evaluaciones psicotécnicas laborales. El MVP debe centralizar autenticación, pacientes, aplicación de pruebas, cálculo automático e informe PDF.

## Arquitectura validada
- Monorepo con `pnpm workspaces` + `turbo`.
- `apps/web`: Astro SSR híbrido + React para interacciones.
- `apps/api`: NestJS modular + MongoDB (Mongoose).
- `packages/shared`: tipos comunes para crecer sin duplicación.
- Seguridad: JWT en cookie `httpOnly`, hash bcrypt, aislamiento por psicólogo.

## Módulos de backend
- `auth`: registro/login/logout/me.
- `patients`: CRUD completo con edad calculada automáticamente.
- `tests`: pruebas preconfiguradas y administradas desde backend.
- `results`: aplicación de prueba, cálculo de puntaje, interpretación por rangos, observaciones, recomendación.
- `reports`: exportación PDF profesional por paciente.

## Flujo UX principal
- Login.
- Dashboard pacientes.
- Crear/editar paciente.
- Ver detalle de paciente.
- Aplicar prueba en flujo corto (3 clics).
- Guardar resultado con observaciones.
- Descargar informe PDF.

## Despliegue
- Vercel para web y api.
- URL objetivo frontend: `https://psicometric.vercel.app`.
- Mongo gestionado (Atlas recomendado).

## No-MVP explícito
- Multiempresa.
- Roles avanzados.
- Métricas dashboard.
- Firma digital criptográfica.
- Envío automático de informes por correo.
