# Expansion de pruebas para evaluacion de candidatos

Fecha: 2026-02-21

## Objetivo

Ampliar el catalogo inicial (VALANTI, Wartegg, 16PF Forma A) con pruebas de preseleccion orientadas a contexto corporativo, con base en evidencia de seleccion de personal y criterios de cumplimiento.

## Evidencia revisada (resumen)

1. La EEOC reconoce tipos de pruebas de empleo como cognitivas, personalidad, aptitud fisica, conocimiento del trabajo e integridad, y exige que no discriminen por raza, sexo, origen, religion, discapacidad o edad.
2. Las Uniform Guidelines (UGESP) incluyen la regla del 80% (4/5) como criterio de deteccion de impacto adverso y exigen monitoreo de equidad.
3. Los Principles de SIOP enfatizan documentar evidencia de validez, confiabilidad y equidad para cualquier procedimiento de seleccion.
4. Metaanalisis recientes mantienen la entrevista estructurada como procedimiento de alta utilidad y confirman el valor del enfoque multimodal de seleccion.
5. En SJT, un metaanalisis reporta relacion positiva con desempeno interpersonal y academico.
6. Metaanalisis de integridad reporta validez incremental para desempeno y contra conductas contraproducentes.
7. O*NET identifica estilos de trabajo relevantes para empleo (cooperacion, integridad, atencion al detalle, dependabilidad), utiles para definir constructos conductuales.

## Criterio de diseno aplicado

Se agregaron pruebas breves, 100% aplicables en el flujo actual:

- Formato: `single_choice` para correccion automatica.
- Modo de puntuacion: `range`.
- Escala: 4 opciones por item (mejor a peor).
- Uso esperado: filtro inicial, no diagnostico clinico.

## Pruebas agregadas

1. Juicio Situacional Laboral (SJT)
- Constructo: decision en contexto, priorizacion, manejo de conflicto, orientacion a resultados.
- Estructura: 10 items situacionales.

2. Integridad y Cumplimiento Laboral
- Constructo: etica, transparencia, trazabilidad, cumplimiento.
- Estructura: 10 items conductuales.

3. Razonamiento Numerico Aplicado
- Constructo: calculo funcional para negocio (porcentajes, promedio, proporcion, productividad).
- Estructura: 12 items objetivos.

4. Atencion al Detalle y Calidad
- Constructo: deteccion de inconsistencias, control preventivo, disciplina de revision.
- Estructura: 10 items situacionales.

5. Comunicacion y Colaboracion
- Constructo: escucha, coordinacion entre areas, feedback y acuerdos.
- Estructura: 10 items situacionales.

## Implementacion tecnica

- Nuevo archivo: `apps/api/src/seed/candidate-screening-tests.ts`
- Integracion al seed: `apps/api/src/seed/default-tests.ts`
- Total de pruebas en seed despues del cambio: 8

## Notas de uso responsable

1. No usar una sola prueba para decisiones finales.
2. Combinar con entrevista estructurada y evidencia de desempeno.
3. Monitorear impacto adverso por grupos (regla 4/5) y ajustar si aplica.
4. Validar localmente por rol, nivel y contexto de negocio antes de uso de alto impacto.

