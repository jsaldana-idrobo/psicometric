import { TestDefinition } from '../tests/schemas/test.schema';

export const defaultTests: Omit<
  TestDefinition,
  'active' | 'createdAt' | 'updatedAt'
>[] = [
  {
    name: 'Inventario de Estabilidad Emocional',
    category: 'Personalidad',
    description:
      'Evalúa la respuesta emocional frente a escenarios de presión laboral y adaptación al cambio.',
    questions: [
      {
        id: 'q1',
        text: 'Cuando tengo varias tareas urgentes, generalmente:',
        options: [
          { id: 'q1o1', text: 'Me bloqueo con facilidad', value: 1 },
          { id: 'q1o2', text: 'Me cuesta, pero logro avanzar', value: 2 },
          { id: 'q1o3', text: 'Priorizo y ejecuto con calma', value: 3 },
        ],
      },
      {
        id: 'q2',
        text: 'Ante una crítica constructiva, suelo:',
        options: [
          { id: 'q2o1', text: 'Tomarla de forma personal', value: 1 },
          { id: 'q2o2', text: 'Analizar una parte', value: 2 },
          { id: 'q2o3', text: 'Integrarla para mejorar', value: 3 },
        ],
      },
      {
        id: 'q3',
        text: 'En situaciones de conflicto interpersonal:',
        options: [
          { id: 'q3o1', text: 'Evito involucrarme', value: 1 },
          { id: 'q3o2', text: 'Dialogo si es necesario', value: 2 },
          { id: 'q3o3', text: 'Busco soluciones activamente', value: 3 },
        ],
      },
      {
        id: 'q4',
        text: 'Cuando un plan cambia inesperadamente:',
        options: [
          { id: 'q4o1', text: 'Me frustro por largo tiempo', value: 1 },
          { id: 'q4o2', text: 'Necesito tiempo para ajustarme', value: 2 },
          { id: 'q4o3', text: 'Me adapto con rapidez', value: 3 },
        ],
      },
      {
        id: 'q5',
        text: 'Mi nivel de control emocional en jornadas demandantes es:',
        options: [
          { id: 'q5o1', text: 'Bajo', value: 1 },
          { id: 'q5o2', text: 'Intermedio', value: 2 },
          { id: 'q5o3', text: 'Alto', value: 3 },
        ],
      },
    ],
    interpretationRanges: [
      {
        min: 5,
        max: 8,
        label: 'Bajo',
        description:
          'Se sugiere fortalecer manejo emocional y tolerancia al estrés.',
      },
      {
        min: 9,
        max: 12,
        label: 'Medio',
        description:
          'Muestra un equilibrio funcional con áreas puntuales de mejora.',
      },
      {
        min: 13,
        max: 15,
        label: 'Alto',
        description:
          'Presenta buena regulación emocional para entornos laborales exigentes.',
      },
    ],
  },
  {
    name: 'Escala de Razonamiento Operativo',
    category: 'Aptitudes',
    description:
      'Mide la capacidad de análisis, priorización y resolución de problemas en contexto laboral.',
    questions: [
      {
        id: 'q1',
        text: 'Cuando recibo un problema nuevo, primero:',
        options: [
          { id: 'q1o1', text: 'Actúo sin analizar', value: 1 },
          { id: 'q1o2', text: 'Reviso datos principales', value: 2 },
          { id: 'q1o3', text: 'Defino hipótesis y plan', value: 3 },
        ],
      },
      {
        id: 'q2',
        text: 'Si debo elegir entre varias tareas, normalmente:',
        options: [
          { id: 'q2o1', text: 'Empiezo por la más simple', value: 1 },
          { id: 'q2o2', text: 'Me baso en la urgencia', value: 2 },
          { id: 'q2o3', text: 'Priorizo impacto y urgencia', value: 3 },
        ],
      },
      {
        id: 'q3',
        text: 'Frente a un error repetitivo en el proceso:',
        options: [
          { id: 'q3o1', text: 'Corrijo caso a caso', value: 1 },
          { id: 'q3o2', text: 'Identifico causa probable', value: 2 },
          { id: 'q3o3', text: 'Diseño mejora estructural', value: 3 },
        ],
      },
      {
        id: 'q4',
        text: 'Al analizar información extensa:',
        options: [
          { id: 'q4o1', text: 'Me cuesta separar lo importante', value: 1 },
          { id: 'q4o2', text: 'Identifico puntos clave con apoyo', value: 2 },
          { id: 'q4o3', text: 'Sintetizo y concluyo rápido', value: 3 },
        ],
      },
      {
        id: 'q5',
        text: 'Cuando hay presión por resultados:',
        options: [
          { id: 'q5o1', text: 'Baja mi precisión', value: 1 },
          { id: 'q5o2', text: 'Mantengo nivel aceptable', value: 2 },
          { id: 'q5o3', text: 'Conservo foco y calidad', value: 3 },
        ],
      },
    ],
    interpretationRanges: [
      {
        min: 5,
        max: 8,
        label: 'Bajo',
        description:
          'Requiere acompañamiento en estructuración del razonamiento operativo.',
      },
      {
        min: 9,
        max: 12,
        label: 'Medio',
        description:
          'Cuenta con capacidad adecuada para tareas operativas de complejidad media.',
      },
      {
        min: 13,
        max: 15,
        label: 'Alto',
        description:
          'Muestra alta competencia analítica y de priorización laboral.',
      },
    ],
  },
];
