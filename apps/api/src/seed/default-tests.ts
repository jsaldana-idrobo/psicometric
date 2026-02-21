import {
  QuestionType,
  TestDefinition,
  TestScoringMode,
} from '../tests/schemas/test.schema';

export const defaultTests: Omit<
  TestDefinition,
  'active' | 'createdAt' | 'updatedAt'
>[] = [
  {
    name: 'VALANTI',
    category: 'Valores y Tendencias',
    description:
      'Cuestionario de 30 pares de afirmaciones con distribución 3-0, 2-1, 1-2 y 0-3 para perfil de preferencias.',
    instructions:
      'Asigna puntajes entre ambas afirmaciones de cada ítem. La suma entre izquierda y derecha siempre debe ser 3.',
    scoringMode: TestScoringMode.PROFILE,
    profileLabels: {
      left: 'Puntaje izquierda',
      right: 'Puntaje derecha',
      balance: 'Balance izquierda-derecha',
    },
    questions: [
      {
        id: 'q1',
        text: 'Afirmación izquierda: Muestro dedicación a las personas que amo | Afirmación derecha: Actúo con perseverancia',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q1o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q1o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q1o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q1o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q2',
        text: 'Afirmación izquierda: Soy tolerante | Afirmación derecha: Prefiero actuar con ética',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q2o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q2o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q2o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q2o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q3',
        text: 'Afirmación izquierda: Al pensar, utilizo mi intuición o "sexto sentido" | Afirmación derecha: Me siento una persona digna',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q3o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q3o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q3o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q3o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q4',
        text: 'Afirmación izquierda: Logro buena concentración mental | Afirmación derecha: Perdono todas las ofensas de cualquier persona',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q4o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q4o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q4o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q4o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q5',
        text: 'Afirmación izquierda: Normalmente razono mucho en mis acciones | Afirmación derecha: Me destaco por el liderazgo',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q5o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q5o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q5o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q5o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q6',
        text: 'Afirmación izquierda: Pienso con integridad | Afirmación derecha: Me coloco objetivos y metas en mi vida personal',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q6o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q6o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q6o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q6o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q7',
        text: 'Afirmación izquierda: Soy una persona de iniciativa | Afirmación derecha: En mi trabajo normalmente soy curioso',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q7o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q7o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q7o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q7o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q8',
        text: 'Afirmación izquierda: Doy amor | Afirmación derecha: Para pensar hago síntesis de las distintas ideas',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q8o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q8o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q8o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q8o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q9',
        text: 'Afirmación izquierda: Me siento en calma | Afirmación derecha: Pienso con veracidad',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q9o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q9o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q9o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q9o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q10',
        text: 'Afirmación izquierda: Irrespetar la propiedad | Afirmación derecha: Sentir inquietud',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q10o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q10o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q10o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q10o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q11',
        text: 'Afirmación izquierda: Ser irresponsable | Afirmación derecha: Ser desconsiderado hacia cualquier persona',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q11o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q11o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q11o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q11o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q12',
        text: 'Afirmación izquierda: Caer en contradicciones al pensar | Afirmación derecha: Sentir intolerancia',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q12o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q12o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q12o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q12o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q13',
        text: 'Afirmación izquierda: Ser violento | Afirmación derecha: Actuar con cobardía',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q13o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q13o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q13o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q13o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q14',
        text: 'Afirmación izquierda: Sentirse presumido | Afirmación derecha: Generar divisiones y discordia entre los seres humanos',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q14o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q14o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q14o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q14o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q15',
        text: 'Afirmación izquierda: Ser cruel | Afirmación derecha: Sentir ira',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q15o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q15o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q15o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q15o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q16',
        text: 'Afirmación izquierda: Pensar con confusión | Afirmación derecha: Tener odio en el corazón',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q16o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q16o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q16o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q16o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q17',
        text: 'Afirmación izquierda: Decir blasfemias | Afirmación derecha: Ser escandaloso',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q17o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q17o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q17o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q17o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q18',
        text: 'Afirmación izquierda: Crear desigualdades entre los seres humanos | Afirmación derecha: Apasionarse por una idea',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q18o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q18o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q18o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q18o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q19',
        text: 'Afirmación izquierda: Sentirse inconstante | Afirmación derecha: Crear rivalidad hacia otros',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q19o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q19o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q19o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q19o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q20',
        text: 'Afirmación izquierda: Pensamientos irracionales | Afirmación derecha: Traicionar a un desconocido',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q20o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q20o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q20o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q20o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q21',
        text: 'Afirmación izquierda: Ostentar las riquezas materiales | Afirmación derecha: Sentirse infeliz',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q21o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q21o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q21o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q21o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q22',
        text: 'Afirmación izquierda: Entorpecer la cooperación entre los seres humanos | Afirmación derecha: La maldad',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q22o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q22o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q22o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q22o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q23',
        text: 'Afirmación izquierda: Odiar a cualquier ser de la naturaleza | Afirmación derecha: Hacer distinciones entre las personas',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q23o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q23o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q23o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q23o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q24',
        text: 'Afirmación izquierda: Sentirse intranquilo | Afirmación derecha: Ser infiel',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q24o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q24o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q24o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q24o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q25',
        text: 'Afirmación izquierda: Tener la mente dispersa | Afirmación derecha: Mostrar apatía al pensar',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q25o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q25o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q25o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q25o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q26',
        text: 'Afirmación izquierda: La injusticia | Afirmación derecha: Sentirse angustiado',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q26o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q26o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q26o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q26o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q27',
        text: 'Afirmación izquierda: Vengarse de los que odian a todo el mundo | Afirmación derecha: Vengarse del que hace daño a un familiar',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q27o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q27o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q27o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q27o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q28',
        text: 'Afirmación izquierda: Usar abusivamente el poder | Afirmación derecha: Distraerse',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q28o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q28o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q28o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q28o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q29',
        text: 'Afirmación izquierda: Ser desagradecido con los que ayudan | Afirmación derecha: Ser egoísta con todos',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q29o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q29o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q29o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q29o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
      {
        id: 'q30',
        text: 'Afirmación izquierda: Cualquier forma de irrespeto | Afirmación derecha: Odiar',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q30o1',
            text: '3 izquierda / 0 derecha',
            value: 3,
            profileScores: {
              left: 3,
              right: 0,
              balance: 3,
            },
          },
          {
            id: 'q30o2',
            text: '2 izquierda / 1 derecha',
            value: 2,
            profileScores: {
              left: 2,
              right: 1,
              balance: 1,
            },
          },
          {
            id: 'q30o3',
            text: '1 izquierda / 2 derecha',
            value: 1,
            profileScores: {
              left: 1,
              right: 2,
              balance: -1,
            },
          },
          {
            id: 'q30o4',
            text: '0 izquierda / 3 derecha',
            value: 0,
            profileScores: {
              left: 0,
              right: 3,
              balance: -3,
            },
          },
        ],
      },
    ],
    interpretationRanges: [
      {
        min: 0,
        max: 29,
        label: 'Predominio derecha',
        description:
          'La distribución muestra mayor peso en las afirmaciones del lado derecho.',
      },
      {
        min: 30,
        max: 60,
        label: 'Balance medio',
        description:
          'La distribución entre ambos lados se mantiene en una zona intermedia.',
      },
      {
        min: 61,
        max: 90,
        label: 'Predominio izquierda',
        description:
          'La distribución muestra mayor peso en las afirmaciones del lado izquierdo.',
      },
    ],
  },
  {
    name: 'Wartegg',
    category: 'Proyectiva gráfica',
    description:
      'Aplicación digital del Wartegg con 8 láminas de dibujo y preguntas de cierre para análisis cualitativo.',
    instructions:
      'Dibuja en cada lámina, asigna un título a cada una y responde las preguntas finales de análisis.',
    scoringMode: TestScoringMode.MANUAL,
    questions: [
      {
        id: 'draw1',
        text: 'Lámina 1: integra el estímulo base y realiza un dibujo completo en el recuadro.',
        type: QuestionType.DRAWING,
        options: [],
      },
      {
        id: 'title1',
        text: 'Lámina 1: escribe un título breve para tu dibujo.',
        type: QuestionType.TEXT,
        options: [],
      },
      {
        id: 'draw2',
        text: 'Lámina 2: integra el estímulo base y realiza un dibujo completo en el recuadro.',
        type: QuestionType.DRAWING,
        options: [],
      },
      {
        id: 'title2',
        text: 'Lámina 2: escribe un título breve para tu dibujo.',
        type: QuestionType.TEXT,
        options: [],
      },
      {
        id: 'draw3',
        text: 'Lámina 3: integra el estímulo base y realiza un dibujo completo en el recuadro.',
        type: QuestionType.DRAWING,
        options: [],
      },
      {
        id: 'title3',
        text: 'Lámina 3: escribe un título breve para tu dibujo.',
        type: QuestionType.TEXT,
        options: [],
      },
      {
        id: 'draw4',
        text: 'Lámina 4: integra el estímulo base y realiza un dibujo completo en el recuadro.',
        type: QuestionType.DRAWING,
        options: [],
      },
      {
        id: 'title4',
        text: 'Lámina 4: escribe un título breve para tu dibujo.',
        type: QuestionType.TEXT,
        options: [],
      },
      {
        id: 'draw5',
        text: 'Lámina 5: integra el estímulo base y realiza un dibujo completo en el recuadro.',
        type: QuestionType.DRAWING,
        options: [],
      },
      {
        id: 'title5',
        text: 'Lámina 5: escribe un título breve para tu dibujo.',
        type: QuestionType.TEXT,
        options: [],
      },
      {
        id: 'draw6',
        text: 'Lámina 6: integra el estímulo base y realiza un dibujo completo en el recuadro.',
        type: QuestionType.DRAWING,
        options: [],
      },
      {
        id: 'title6',
        text: 'Lámina 6: escribe un título breve para tu dibujo.',
        type: QuestionType.TEXT,
        options: [],
      },
      {
        id: 'draw7',
        text: 'Lámina 7: integra el estímulo base y realiza un dibujo completo en el recuadro.',
        type: QuestionType.DRAWING,
        options: [],
      },
      {
        id: 'title7',
        text: 'Lámina 7: escribe un título breve para tu dibujo.',
        type: QuestionType.TEXT,
        options: [],
      },
      {
        id: 'draw8',
        text: 'Lámina 8: integra el estímulo base y realiza un dibujo completo en el recuadro.',
        type: QuestionType.DRAWING,
        options: [],
      },
      {
        id: 'title8',
        text: 'Lámina 8: escribe un título breve para tu dibujo.',
        type: QuestionType.TEXT,
        options: [],
      },
      {
        id: 'favorite',
        text: '¿Cuál lámina fue la más fácil para ti y por qué?',
        type: QuestionType.TEXT,
        options: [],
      },
      {
        id: 'hardest',
        text: '¿Cuál lámina fue la más difícil para ti y por qué?',
        type: QuestionType.TEXT,
        options: [],
      },
      {
        id: 'sequence',
        text: 'Explica el orden que seguiste para dibujar las láminas.',
        type: QuestionType.TEXT,
        options: [],
      },
    ],
    interpretationRanges: [
      {
        min: 0,
        max: 0,
        label: 'Pendiente análisis',
        description:
          'La interpretación del Wartegg se realiza mediante revisión cualitativa profesional.',
      },
    ],
  },
  {
    name: '16PF Forma A',
    category: 'Personalidad',
    description:
      'Cuestionario de 187 reactivos de respuesta A/B/C para evaluación de rasgos de personalidad.',
    instructions:
      'Selecciona una opción por cada reactivo. Responde según tu forma habitual de actuar y pensar.',
    scoringMode: TestScoringMode.RANGE,
    profileLabels: {
      A: 'Conteo respuestas A',
      B: 'Conteo respuestas B',
      C: 'Conteo respuestas C',
    },
    questions: [
      {
        id: 'q1',
        text: 'He comprendido bien las instrucciones para contestar al Cuestionario',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q1o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q1o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q1o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q2',
        text: 'Estoy dispuesto a contestar todas las cuestiones con sinceridad',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q2o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q2o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q2o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q3',
        text: '¿Cuáles de las siguientes palabras es diferente de las otras dos?',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q3o1',
            text: 'Algo',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q3o2',
            text: 'Nada',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q3o3',
            text: 'Mucho',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q4',
        text: 'Poseo suficiente energía para enfrentarme a todos mis problemas',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q4o1',
            text: 'Siempre',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q4o2',
            text: 'Frecuentemente',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q4o3',
            text: 'Raras veces',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q5',
        text: 'Evito criticar a la gente y sus ideas',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q5o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q5o2',
            text: 'Algunas veces',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q5o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q6',
        text: 'Hago agudas y sarcásticas observaciones a la gente si creo que las merece',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q6o1',
            text: 'Generalmente',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q6o2',
            text: 'Algunas veces',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q6o3',
            text: 'Nunca',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q7',
        text: 'Me gusta más la música semiclásica que las canciones populares',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q7o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q7o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q7o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q8',
        text: 'Si veo peleándose a los niños de miis vécinos:!',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q8o1',
            text: 'Les dejo solucionar sus problemas',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q8o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q8o3',
            text: 'Razono: con ellos la solución',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q9',
        text: 'En situaciones sociales',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q9o1',
            text: 'Fácilmente soy de los que',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q9o2',
            text: 'Intervengo algunas veces',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q9o3',
            text: 'Prefiero quedarme tránquila- toman inicintivas mente a distancia',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q10',
        text: 'Sería más interesante ser',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q10o1',
            text: 'Ingeniero de la construcción',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q10o2',
            text: 'No estoy seguro entre los dos',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q10o3',
            text: 'Escritor de teatro',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q11',
        text: 'Generalmente puedo tolerar a la gente presuntuosa, aunque fanfarronee o piense demasiado bien de ella misma',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q11o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q11o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q11o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q12',
        text: 'Cuando una persona no es honrada, casi siempre se le puede notar en la cara',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q12o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q12o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q12o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q13',
        text: 'Aceptaría mejor el riesgo de un-trabajo donde pudiera tener ganancias mayores; aunque eventuales, que otro con sueldo pequeño, pero seguro',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q13o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q13o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q13o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q14',
        text: 'De vez en cuando siento un vago temor o un repentino miedo, sin poder comprender las razones',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q14o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q14o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q14o3',
            text: 'No!',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q15',
        text: 'Cuando me critican duramente por algo que no he hecho:!',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q15o1',
            text: 'No me siento culpable',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q15o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q15o3',
            text: 'Todavía me siento un poco culpable',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q16',
        text: 'Casi todo se puede comprar con dinero',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q16o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q16o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q16o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q17',
        text: 'La mayoría de las personas serian más felices si convivieran más con la gente de su nivel e hicie- ran las cosas como los demás',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q17o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q17o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q17o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q18',
        text: 'En ocasiones, mirándome en un espejo, me entran dudas sobre lo que es mi derecha o izquierda',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q18o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q18o2',
            text: "No estoy seguro'",
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q18o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q19',
        text: "Cuando algo realméñte'me pone furioso, suelo calmarme muy pronto",
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q19o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q19o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q19o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q20',
        text: 'Preferiría tener una casa',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q20o1',
            text: 'En un barrio con vida social',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q20o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q20o3',
            text: 'Aislada en el bosque',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q21',
        text: 'Con el mismo horario y sueldo, sería más interesante ser',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q21o1',
            text: 'El cocinero de un buen',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q21o2',
            text: 'No estoy seguro entre',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q21o3',
            text: 'El que sirve las mesas en el: restaurante ambos restaurante',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q22',
        text: 'Cansado es a trabajar como orgulloso es a',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q22o1',
            text: 'Sonreir',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q22o2',
            text: 'Tener éxito',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q22o3',
            text: 'Ser feliz',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q23',
        text: 'Me pongo algo nervioso ante animales salvajes, incluso cuando están encerrados en fuertes jaulas',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q23o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q23o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q23o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q24',
        text: 'Una ley anticuada debería cambiarse',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q24o1',
            text: 'Sólo después de muchas discusiones',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q24o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q24o3',
            text: 'Inmediatamente',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q25',
        text: 'La mayor parte de lás personas me consideran un interlocutor agradable',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q25o1',
            text: 'Si',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q25o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q25o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q26',
        text: 'Me gusta salir a divertirme o ir a un espectáculo: o::!',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q26o1',
            text: 'Más de una vez por semana',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q26o2',
            text: 'Alrededor de una vez por',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q26o3',
            text: 'Menos de una vez por sema- (más de lo corriente) semana (lo corriente) na (menos de lo corriente)',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q27',
        text: 'Cuando veo gente desaliñada y sucia',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q27o1',
            text: 'Lo acepto simplemente',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q27o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q27o3',
            text: 'Me disgusta y me fastidia',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q28',
        text: 'Estando en un grupo social me siento un-poco turbado si de pronto paso aser el foco: de atención',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q28o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q28o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q28o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q29',
        text: 'Cuando voy por la calle prefiero detenerme antes a ver a un artista pintando que a escuchar a la MN gente discutir',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q29o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q29o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q29o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q30',
        text: 'Cuando me ponen al frente de algo, insisto en que se sigan mis instrucciones; en caso contrario, renuncio',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q30o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q30o2',
            text: 'Algunas veces',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q30o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q31',
        text: 'Sería mejor que las vacaciones fueran más largas y obligatorias para todas las personas',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q31o1',
            text: 'De acuerdo',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q31o2',
            text: 'No estoy. seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q31o3',
            text: 'En desacuerdo',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q32',
        text: 'Hablo acerca de mis sentimientos',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q32o1',
            text: 'Sólo si es necesario',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q32o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q32o3',
            text: 'Fácilmente, siempre que tengo ocasión',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q33',
        text: 'Me siento muy abatido cuando la gente me critica en un grupo: l 1]',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q33o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q33o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q33o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q34',
        text: 'Si mi jefe (profesor) me llama a su despacho: p',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q34o1',
            text: 'Aprovecho la ocasión para pedirle',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q34o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q34o3',
            text: 'Temo haber hecho algo malo: algo que deseo!',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q35',
        text: 'Mis decisiones se apoyan más en',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q35o1',
            text: 'El corazón',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q35o2',
            text: 'Los sentimientos y la razón por igual',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q35o3',
            text: 'La cabeza',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q36',
        text: 'En mi adolescencia pertenecía a equipos deportivos',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q36o1',
            text: 'Algunas veces',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q36o2',
            text: 'A menudo',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q36o3',
            text: 'La-mayoría de las veces',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q37',
        text: 'Cuando hablo con alguien, me gusta:: Ñ',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q37o1',
            text: 'Decir las cosas tal como se me ocurren',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q37o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q37o3',
            text: 'Organizar antes mis. ideas',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q38',
        text: 'A veces me pongo en estado de tensión y agitación cuando pienso en los sucesos del día',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q38o1',
            text: 'Si',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q38o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q38o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q39',
        text: 'He sido elegido para hacer algo',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q39o1',
            text: 'Sólo en pocas ocasiones',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q39o2',
            text: 'Varlas veces',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q39o3',
            text: 'Muchas veces',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q40',
        text: '¿Cuál de las siguientes cosas es diferente de las otras dos?',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q40o1',
            text: 'Vela',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q40o2',
            text: 'Luna',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q40o3',
            text: 'Luz eléctrica',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q41',
        text: 'Sorpresa es a extraño como miedo es a',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q41o1',
            text: 'Valeroso',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q41o2',
            text: 'Ansioso',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q41o3',
            text: 'Terrible',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q42',
        text: 'A veces no puedo dormirme porque tengo una idea que me da vueltas en la cabeza',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q42o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q42o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q42o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q43',
        text: 'Me siento desasosegado cuando trabajo en un proyecto que requiere una acción rápida que afecta a los demás',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q43o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q43o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q43o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q44',
        text: 'Indudablemente tengo menos amigos que la mayoría de las. personas',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q44o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q44o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q44o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q45',
        text: 'Aborrecería tener que estar en un lugar donde hubiera poca gente con quien hablar',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q45o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q45o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q45o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q46',
        text: 'Creo que es más importantes mucha libertad que buena educación y respeto a la ley',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q46o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q46o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q46o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q47',
        text: 'Siempre me alegra formar parte de un grupo grande, como una reunión, un baile o una asamblea',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q47o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q47o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q47o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q48',
        text: 'En mi época de estudiante me gustaba (me gusta)',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q48o1',
            text: 'La música',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q48o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q48o3',
            text: 'La actividad de tipo manual',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q49',
        text: 'Si alguien se enfada conmigo:!',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q49o1',
            text: 'Intento calmarle',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q49o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q49o3',
            text: 'Me irrito con él',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q50',
        text: 'Para los padres es más importante',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q50o1',
            text: 'Ayudar a sus hijos a desarrollarse',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q50o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q50o3',
            text: "Enseñarles a' controlar sus afectivamente emociones",
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q51',
        text: 'Siento de vez en cuando las necesidad de ocuparme en una actividad física enérgica',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q51o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q51o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q51o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q52',
        text: 'Hay veces en que no me siento con humor para ver a alguien',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q52o1',
            text: 'Muy raramente',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q52o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q52o3',
            text: 'Muy a menudo',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q53',
        text: 'A veces los demás me advierten que yo muestro mi excitación demasiado claramente en la voz y en los modales',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q53o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q53o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q53o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q54',
        text: 'Lo que el mundo necesita es',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q54o1',
            text: 'Ciudadanos más sensatos',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q54o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q54o3',
            text: 'Más idealistas con proyectos y constantes para un mundo mejor',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q55',
        text: 'Preferiría tener un negocio propio, no compartido con otra persona',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q55o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q55o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q55o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q56',
        text: 'Tengo mi habitación organizada de un modo inteligente y estético, con las cosas colocadas cas) siempre en lugares conocidos',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q56o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q56o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q56o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q57',
        text: 'En ocasiones dudo si la gente con quien estoy hablando se interesa realmente por lo que digo',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q57o1',
            text: 'Si',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q57o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q57o3',
            text: 'No Pese a la pégina siguiente',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q58',
        text: 'Si tuviera que escoger, preferiría ser',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q58o1',
            text: 'Guarda forestal',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q58o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q58o3',
            text: 'Profesor de Enseñanza Media',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q59',
        text: '¿Cuál de las siguientes fracciones es diferente de las otras dos?',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q59o1',
            text: '3/7',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q59o2',
            text: '3/9',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q59o3',
            text: '3/11',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q60',
        text: 'Tamaño es a longitud como delito es a',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q60o1',
            text: 'Prisión',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q60o2',
            text: 'Castigo',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q60o3',
            text: 'Robo',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q61',
        text: 'En mi vida personal consigo casi siempre todos mis propósitos',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q61o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q61o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q61o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q62',
        text: 'Tengo algunas características en las que me siento claramente superior a la mayor parte de la gente',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q62o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q62o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q62o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q63',
        text: 'Sólo asisto a actos sociales cuando estoy obligado, y me mantengo aparte.en las demás ocasiones',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q63o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q63o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q63o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q64',
        text: 'Es mejor ser cauto y esperar poco que optimista y esperar siempre el éxito',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q64o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q64o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q64o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q65',
        text: 'Algunas veces la gente dice que soy descuidado, aunque me considera una persona agradable',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q65o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q65o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q65o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q66',
        text: 'Suelo permaneter callado delante de personas mayores (con mucha más experiencia, edad o je- j rarquía): i',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q66o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q66o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q66o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q67',
        text: 'Tengo un buen sentido de la orientación (sitúo fácilmente los puntos cardinales), cuando me en-: cuentro en un lugar desconocido: ¡',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q67o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q67o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q67o3',
            text: 'No A',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q68',
        text: 'Cuando leo en una revista un artículo tendencioso o injusto, me inclino más a olvidarlo que a replicar o devolver el golpe',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q68o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q68o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q68o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q69',
        text: 'En tareas de grupo, preferiría: —!',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q69o1',
            text: 'Intentar mejorar los',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q69o2',
            text: 'Término-medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q69o3',
            text: 'Llevar las actas: o registros y procurar preparativos.: que-se cumplan las normas',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q70',
        text: 'Me gustaría más andar con personas corteses que con individuos rebeldes y toscos',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q70o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q70o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q70o3',
            text: 'No o',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q71',
        text: 'Si mis conocidos me tratan mal o muestran que yo les disgusto',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q71o1',
            text: 'No me importa nada',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q71o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q71o3',
            text: 'Me siento abatido',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q72',
        text: 'Siempre estoy alerta ante los intentos de propaganda en las cosas que leo: o',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q72o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q72o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q72o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q73',
        text: 'Me gustaría más gozar de la vida tranquilamente y a mi modo que ser admirado por mis resul- tados',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q73o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q73o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q73o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q74',
        text: 'Para estar informado, prefiero',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q74o1',
            text: 'Discutir los acontecimientos',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q74o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q74o3',
            text: 'Apoyarme en las informaciones: con la gente periodísticas de actualidad',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q75',
        text: 'Me encuentro formado (maduro) para la mayor parte de las cosas',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q75o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q75o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q75o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q76',
        text: 'Me encuentro más abatido que ayudado por el tipo de crítica que la gente suele hacer: p p',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q76o1',
            text: 'A menudo',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q76o2',
            text: 'Ocasionalmente',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q76o3',
            text: 'Nunca E',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q77',
        text: 'En las fiestas de cumpleaños: l',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q77o1',
            text: 'Me gusta hacer regalos',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q77o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q77o3',
            text: 'Pienso. que comprar: regalos. personales: es un poco latoso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q78',
        text: 'AB es a dc como SR es',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q78o1',
            text: 'qp',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q78o2',
            text: 'pa',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q78o3',
            text: 'tu',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q79',
        text: 'Mejor es a pésimo como menor es a',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q79o1',
            text: 'Mayor',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q79o2',
            text: 'Optimo',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q79o3',
            text: 'Máximo',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q80',
        text: 'Mis amigos me han fallado',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q80o1',
            text: 'Muy rara vez',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q80o2',
            text: 'Ocaslonalmente',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q80o3',
            text: 'Muchas veces',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q81',
        text: 'Cuando me siento abatido hago grandes esfuerzos por ocultar mis sentimientos a los demás: ]',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q81o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q81o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q81o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q82',
        text: 'Gasto gran parte de mi tiempo libre hablando con los amigos sobre situaciones sociales agra- dables vividas en el pasado',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q82o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q82o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q82o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q83',
        text: 'Pensando en las dificultades de mi trabajo:!',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q83o1',
            text: 'Intento organizarme antes de',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q83o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q83o3',
            text: 'Doy por supuesto que puedo que aparezcan: dominarlas cuando vengan',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q84',
        text: 'Me cuesta bastante hablar o dirigir la palabra a un grupo numeroso',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q84o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q84o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q84o3',
            text: 'No ]',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q85',
        text: 'He experimentado en varias situaciones sociales el llamado nerviosismo del orador',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q85o1',
            text: 'Muy frecuentemente',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q85o2',
            text: 'Ocasionalmente',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q85o3',
            text: 'Casi nunca',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q86',
        text: 'Prefiero leer',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q86o1',
            text: 'Una- narración realista de contiendas',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q86o2',
            text: "No éstoy' seguro",
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q86o3',
            text: 'Una novela imaginativa militares o políticas y delicada',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q87',
        text: 'Cuando la gente autoritaria trata de dominarme, hago justamente lo contrario de lo que quiere',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q87o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q87o2',
            text: 'Término medió',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q87o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q88',
        text: 'Suelo olvidar muchas cosas triviales y sin importancia, tales como los nombres de las calles y tiendas de la ciudad',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q88o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q88o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q88o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q89',
        text: 'Me gustaría la profesión de veterinario, ocupado con las enfermedades y curación de los ani males: l',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q89o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q89o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q89o3',
            text: 'No Ñ',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q90',
        text: 'Me resulta embarazoso que me dediquen elogios o cumplidos',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q90o1',
            text: 'St',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q90o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q90o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q91',
        text: 'Siendo adolescente, cuando mi Opinión era distinta de la de mis padres, normalmente',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q91o1',
            text: 'Mantenía mi opinión —',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q91o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q91o3',
            text: 'Aceptaba su autoridad',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q92',
        text: 'Me gusta tomar parte activa en-las tareas sociales, trabajos de comité, etc.:: e',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q92o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q92o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q92o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q93',
        text: 'Al llevar a cabo una tarea, no estoy satisfecho hasta que se ha considerado con toda atención el menor detalle',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q93o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q93o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q93o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q94',
        text: 'Tengo ocasiones en que me es difícil alejar un sentimiento de compasión hacia mí mismo',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q94o1',
            text: 'A menudo',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q94o2',
            text: 'Algunas veces',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q94o3',
            text: 'Nunca',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q95',
        text: 'Siempre soy capaz de controlar perfectamente la expresión de mis sentimientos',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q95o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q95o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q95o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q96',
        text: 'Ante un nuevo invento utilitario, me gustaría',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q96o1',
            text: 'Trabajar sobre él en el laboratorio',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q96o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q96o3',
            text: 'Venderlo a la gente',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q97',
        text: 'La siguiente serie de letras XOOOOXXOOOXXX continúa con el grupo',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q97o1',
            text: 'OXAX',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q97o2',
            text: 'OOXXx',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q97o3',
            text: 'X000',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q98',
        text: 'Algunas personas parecen ignorarme o evitarme, aunque no sé por qué',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q98o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q98o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q98o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q99',
        text: 'La gente me trata menos razonablemente de lo que merecen mis buenas intenciones',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q99o1',
            text: 'A menudo',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q99o2',
            text: 'Ocasionalmente',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q99o3',
            text: 'Nunca',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q100',
        text: 'Aunque no sea en un grupo mixto de mujeres y hombres, me disgusta que se use un lenguaje obs: ceno',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q100o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q100o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q100o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q101',
        text: 'Me gusta hacer cosas atrevidas y temerarias sólo por el placer de divertirme',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q101o1',
            text: 'Si',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q101o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q101o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q102',
        text: 'Me resulta molesta la vista de una habitación muy sucia',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q102o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q102o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q102o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q103',
        text: 'Cuando estoy en un grupo pequeño, me agrada quedarme en un segundo término y dejar que otros lleven el peso de la conversación',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q103o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q103o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q103o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q104',
        text: 'Me resulta fácil mezclarme con la gente en una reunión social',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q104o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q104o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q104o3',
            text: 'Falso Ñ',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q105',
        text: 'Sería más interesante ser',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q105o1',
            text: 'Orientador vocacional para ayudar, a los.Jó',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q105o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q105o3',
            text: 'Directivo de una em venes en la búsqueda de su profesión presa industrial',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q106',
        text: "Por regla general, mis jefes y mi' familia me encuentran defectós sólo cuando realmente: existen",
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q106o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q106o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q106o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q107',
        text: 'Me disgusta el modo con que algunas personas se fijan en otras en la calle o en: las tiendas',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q107o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q107o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q107o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q108',
        text: 'Como los alimentos con gusto y placer, aunque no siempre tan cuidadosa y educadamente como Otras personas',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q108o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q108o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q108o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q109',
        text: 'Temo algún castigo incluso cuando no he hecho nada malo',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q109o1',
            text: 'A menudo',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q109o2',
            text: 'Ocasionalmente',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q109o3',
            text: 'Nunca',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q110',
        text: 'Me gustaría más tener un trabajo con:!',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q110o1',
            text: 'Un determinado',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q110o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q110o3',
            text: 'Un sueldo más alto pero siempre que demuestre: sueldo fijo a los demás que lo merezco',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q111',
        text: 'Me molesta que la gente piense que mi comportamiento es demasiado raro o fuera de lo co- rriente',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q111o1',
            text: 'Mucho',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q111o2',
            text: 'Algo',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q111o3',
            text: 'Nada en absoluto',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q112',
        text: 'A veces dejo que sentimientos de envidia o celos influyan en mis acciones',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q112o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q112o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q112o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q113',
        text: 'En ocasiones, contrariedades muy pequeñas me irritan mucho',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q113o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q113o2',
            text: 'Término. medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q113o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q114',
        text: 'Siempre duermo bien, nunca hablo en sueños ni me levanto sonámbulo',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q114o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q114o2',
            text: 'Términpg medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q114o3',
            text: 'No.!',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q115',
        text: 'Me resultaría más interesante trabajar en una empresa',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q115o1',
            text: 'Atendiendo a los clientes',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q115o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q115o3',
            text: 'Llevando las cuentas o los archivos',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q116',
        text: 'Azada es a cavar como cuchillo es a',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q116o1',
            text: 'Cortar',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q116o2',
            text: 'Añilar',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q116o3',
            text: 'Picar',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q117',
        text: 'Cuando la gente no es razonable, yo normalmente',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q117o1',
            text: 'Me quedo tan tranquilo',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q117o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q117o3',
            text: 'La menosprecio',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q118',
        text: 'Silos demás hablan en voz alta cuando estoy escuchando música',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q118o1',
            text: 'Puedo concentrarme en ella sin que me',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q118o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q118o3',
            text: 'Eso mé impide disfrutar. molesten de ella y me incomoda',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q119',
        text: 'Creo que se me describe mejor. como',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q119o1',
            text: 'Comedido y reposado',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q119o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q119o3',
            text: 'Enérgico',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q120',
        text: 'Preferiría vestirme con sencillez y corrección que con un estilo personal y llamativo',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q120o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q120o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q120o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q121',
        text: 'Me niego-a admitir sugerencias bien intencionadas: de los. demás, aunque sé que no debería ha- cerlo: _',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q121o1',
            text: 'Algunas veces',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q121o2',
            text: 'Casi nunca',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q121o3',
            text: 'Nunca',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q122',
        text: 'Cuando es necesario que alguien emplee un poco de diplomacia y persuasión para conseguir: que la gente actúe, generalmente sólo me lo encargan a mí',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q122o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q122o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q122o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q123',
        text: 'Me considero a mí mismo como una persona. muy abierta y sociable',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q123o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q123o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q123o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q124',
        text: 'Me gusta la música',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q124o1',
            text: 'Ligera, movida y animada',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q124o2',
            text: 'Térinino medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q124o3',
            text: 'Emotiva y sentimental',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q125',
        text: 'Si estoy completámente ségúro de que uña persóna es injusta o se comporta egoístaménte, se lo digo, incluso si esto me causa problemas',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q125o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q125o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q125o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q126',
        text: 'En un viaje largo, preferiría',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q126o1',
            text: 'Leer.algo profundo pero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q126o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q126o3',
            text: 'Pasar él tiempo -charlaido sobre. cual: interesante quier cosa con un compañero de viaje',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q127',
        text: 'En una situación que puede llegar a ser peligrosa, creo que es: mejor alborotar o hablar alto, aún: cuando se pierdan la calma y la cortesía',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q127o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q127o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q127o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q128',
        text: 'Es muy exagerada. la idea de que la enfermedad proviene tanto de causas mentales como físicas',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q128o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q128o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q128o3',
            text: 'No!',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q129',
        text: 'En cualquier gran ceremonia oficial debería mantenerse la pompa y el esplendor',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q129o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q129o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q129o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q130',
        text: 'Cuando hay que hacer algo, me gustaría más trabajar',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q130o1',
            text: 'En equipo',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q130o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q130o3',
            text: 'Yo solo',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q131',
        text: 'Creo firmemente que tal vez el jefe no tenga siempre la razón, pero siempre tiene la razón por ser el jefe',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q131o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q131o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q131o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q132',
        text: 'Suelo enfadarme con las personas demasiado pronto',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q132o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q132o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q132o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q133',
        text: 'Siempre puedo cambiar viejos hábitos sin dificultad y sin volver a ellos',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q133o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q133o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q133o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q134',
        text: 'Si el sueldo fuera el mismo, preferiría ser',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q134o1',
            text: 'Abogado',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q134o2',
            text: 'No estoy seguro entre ambos',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q134o3',
            text: 'Navegante o piloto',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q135',
        text: 'Llama es a calor como rosa es a',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q135o1',
            text: 'Espina',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q135o2',
            text: 'Pétalo',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q135o3',
            text: 'Aroma',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q136',
        text: 'Cuando se acerca el momento de algo que he planeado y he esperado, en ocasiones pierdo la ilusión por ello',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q136o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q136o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q136o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q137',
        text: 'Puedo trabajar cuidadosamente en la mayor parte de las cosas sin. que me molesten las personas que hacen mucho ruido a mi alrededor',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q137o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q137o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q137o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q138',
        text: "En ocasiones hablo a desconocidos sobre cosas' que considero importantes, aunque no me pre-. gunten sobre ellas",
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q138o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q138o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q138o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q139',
        text: 'Me atrae más pasar una tarde ocupado en una tarea tranquila a la que tenga afición que estar en una reunión animada',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q139o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q139o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q139o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q140',
        text: 'Cuando debo decidir algo, tengo siempre presentes las reglas básicas de lo justo y lo injusto:!',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q140o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q140o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q140o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q141',
        text: 'En el trato social',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q141o1',
            text: 'Muestro mis emociones tal como',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q141o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q141o3',
            text: 'Guardo mis emociones para las siento mis adentros j',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q142',
        text: 'Admiro más la belleza de un poema que la de un arma de fuego bien construida: o',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q142o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q142o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q142o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q143',
        text: 'A veces digo en broma disparates, sólo para sorprender a la gente y ver qué responden',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q143o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q143o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q143o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q144',
        text: 'Me agradaría ser un periódista que escribiera sobre teatro, conciertos, ópera, etc',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q144o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q144o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q144o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q145',
        text: 'Nunca siento la necesidad de garabatear, dibujar o moverme cuando estoy sentado en una re- unión: S',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q145o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q145o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q145o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q146',
        text: 'Si alguien me dice algo que yo sé que no es cierto, suelo pensar',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q146o1',
            text: 'Es un mentiroso',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q146o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q146o3',
            text: 'Evidentemente no está bien informado',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q147',
        text: 'La gente me considera con justicia una persona activa pero con éxito sólo mediano',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q147o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q147o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q147o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q148',
        text: 'Si se suscitara una controversia violenta entre Otros miembros de un grupo de discusión',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q148o1',
            text: 'Me gustaría ver quién es',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q148o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q148o3',
            text: 'Desearía que se suavizara de o el ganador nuevo la situación',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q149',
        text: 'Me gusta planear mis cosas solo, sin interrupciones y sugerencias de otros',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q149o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q149o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q149o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q150',
        text: 'Me gusta seguir mis propios caminos, en vez de actuar según normas establecidas',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q150o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q150o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q150o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q151',
        text: 'Me pongo nervioso (tenso) cuando pienso en todas las cosas que tengo que hacer',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q151o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q151o2',
            text: 'Algunas veces',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q151o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q152',
        text: 'No me perturba que la gente me haga alguna sugerencia cuando estoy jugando',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q152o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q152o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q152o3',
            text: 'Falso:: >',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q153',
        text: 'Me parece más interesante ser',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q153o1',
            text: 'Artista',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q153o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q153o3',
            text: 'Secretario de-un club social',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q154',
        text: '¿Cuál de las siguientes palabras es diferente de las otras.dos?',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q154o1',
            text: 'Ancho',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q154o2',
            text: 'Zilgzag',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q154o3',
            text: 'Recto',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q155',
        text: 'He tenido sueños tan intensos que no me han dejado dormir bien',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q155o1',
            text: 'A menudo',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q155o2',
            text: 'Ocasionalmente',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q155o3',
            text: 'Prácticamente nunca',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q156',
        text: 'Aunque tenga pocas posibilidades de éxito, creo que todavía me merece la pena correr el riesgo',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q156o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q156o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q156o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q157',
        text: 'Cuando yo sé muy bien lo que el grupo tiene que hacer, me gusta ser el único en dar las órdenes',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q157o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q157o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q157o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q158',
        text: 'Me consideran una persona muy entusiasta',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q158o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q158o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q158o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q159',
        text: 'Soy una persona bastante estricta, e insisto siempre en hacer las cosas tan correctamente como sea posible',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q159o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q159o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q159o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q160',
        text: 'Me disgusta un poco que la gente me esté mirando cuando trabajo',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q160o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q160o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q160o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q161',
        text: 'Como no siempre es posible conseguir las cosas utilizando gradualmente métodos razonables, a veces es necesario emplear la fuerza',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q161o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q161o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q161o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q162',
        text: 'Si se pasa por alto una buena observación mías: ES: o',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q162o1',
            text: 'La dejo pasar',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q162o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q162o3',
            text: 'Doy a: la gente-la oportunidad de volvera escucharla',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q163',
        text: 'Me gustaría hacer el trabajo de un oficial encargado: de los casos de delincuentes bajo fianza',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q163o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q163o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q163o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q164',
        text: 'Hay que ser prudente antes de mezclarse con cualquier desconocido, puesto que hay peligros de: ¡infección y de otro tipo',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q164o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q164o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q164o3',
            text: 'No!',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q165',
        text: 'En un viaje al extranjero, preferiría ir en un grupo organizado, con un experto, que planear yo : mismo los lugares que deseo visitar',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q165o1',
            text: 'Si',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q165o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q165o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q166',
        text: 'Si la gente se aprovecha de mi amistad, no me quedo resentido y lo olvido pronto',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q166o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q166o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q166o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q167',
        text: 'Creo que la sociedad debería aceptar nuevas costumbres, de acuerdo con la razón, y olvidar los viejos usos y.tradiciones',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q167o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q167o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q167o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q168',
        text: 'Aprendo mejor: ]',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q168o1',
            text: 'Leyendo un libro bien escrito',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q168o2',
            text: "' Término medio",
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q168o3',
            text: 'Participando en un grupo de discusión',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q169',
        text: 'Me gusta esperar a estar seguro de que lo que voy a decir es correcto, antes de exponer mis ideas',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q169o1',
            text: 'Siempre',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q169o2',
            text: 'Generalmente',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q169o3',
            text: 'Sólo si es posible',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q170',
        text: 'Algunas veces me sacan de quicio de un modo insoportable pequeñas cosas, aunque reconozca que son triviales',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q170o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q170o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q170o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q171',
        text: 'No suelo decir, sin pensarlas, cosas que luego lamento mucho',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q171o1',
            text: 'Verdadero',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q171o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q171o3',
            text: 'Falso',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q172',
        text: 'Si se me pidiera colaborar en una campaña caritativa',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q172o1',
            text: 'Aceptaría',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q172o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q172o3',
            text: 'Diría cortésmente que estoy muy ocupado',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q173',
        text: 'Pronto es a nunca como cerca es a',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q173o1',
            text: 'En ningún sitio',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q173o2',
            text: 'Lejos',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q173o3',
            text: 'En otro sitio',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q174',
        text: 'Si cometo una falta social desagradable, puedo olvidarla pronto',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q174o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q174o2',
            text: 'No estoy seguró',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q174o3',
            text: 'No A',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q175',
        text: 'Se me considera un hombre de ideas que casi siempre puede apuntar algúna solución a un problema',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q175o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q175o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q175o3',
            text: 'No 4',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q176',
        text: 'Creo que se me da mejor mostrar',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q176o1',
            text: 'Aplomo en las pugnas y discusiones',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q176o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q176o3',
            text: 'Tolerancia con los deseos de de una reunión los demás',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q177',
        text: 'Me gusta un trabajo que presente cambios, variedad y viajes, aunque implique algún peligro',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q177o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q177o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q177o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q178',
        text: 'Me gusta un trabajo que requiera dotes de atención y exactitud',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q178o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q178o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q178o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q179',
        text: 'Soy de ese tipo de personas con tanta energía que siempre están ocupadas: Ñ',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q179o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q179o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q179o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q180',
        text: 'En mi época de estudiante prefería (prefiero)',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q180o1',
            text: 'Lengua o Literatura',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q180o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q180o3',
            text: 'Matemáticas o Aritmética',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q181',
        text: 'Algunas veces me ha turbado el que la: gente diga a mi espalda cosas desagradables de mí sin fundamento: Ñ',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q181o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q181o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q181o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q182',
        text: 'Hablar con personas corrientes, convencionales y rutinarias',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q182o1',
            text: 'Es a menudo muy inte',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q182o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q182o3',
            text: 'Me fastidia porque no hay profundidad o: se sante e instructivo trata de chismes y cosas sin importancia',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q183',
        text: 'Algunas cosas me irritan tanto que creo que entonces lo mejor es no hablar',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q183o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q183o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q183o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q184',
        text: 'En la formación del niño, es más importante',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q184o1',
            text: 'Darle bastante afecto',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q184o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q184o3',
            text: 'Procurar que aprenda hábitos y actitudes de- Ps seables',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q185',
        text: 'Los demás me consideran una persona firme e imperturbable, impasible ante los vaivenes de las circunstancias:. Ñ eS',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q185o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q185o2',
            text: 'Término medio',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q185o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q186',
        text: 'Creo que en el mundo actual es más importante resolver: a A',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q186o1',
            text: 'El problema de la intención moral',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q186o2',
            text: 'No estoy seguro +',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q186o3',
            text: 'Los problemas políticos',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
      {
        id: 'q187',
        text: 'Creo que no me he saltado ninguna cuestión y he contestado a todas de modo apropiado',
        type: QuestionType.SINGLE_CHOICE,
        options: [
          {
            id: 'q187o1',
            text: 'Sí',
            value: 3,
            profileScores: {
              A: 1,
            },
          },
          {
            id: 'q187o2',
            text: 'No estoy seguro',
            value: 2,
            profileScores: {
              B: 1,
            },
          },
          {
            id: 'q187o3',
            text: 'No',
            value: 1,
            profileScores: {
              C: 1,
            },
          },
        ],
      },
    ],
    interpretationRanges: [
      {
        min: 187,
        max: 311,
        label: 'Bajo',
        description:
          'Puntaje acumulado en el tercio inferior de la escala general de la prueba.',
      },
      {
        min: 312,
        max: 436,
        label: 'Medio',
        description:
          'Puntaje acumulado en el tercio medio de la escala general de la prueba.',
      },
      {
        min: 437,
        max: 561,
        label: 'Alto',
        description:
          'Puntaje acumulado en el tercio superior de la escala general de la prueba.',
      },
    ],
  },
];
