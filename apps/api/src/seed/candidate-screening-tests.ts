import type { TestDefinition } from '../tests/schemas/test.schema';

type SeedTest = Omit<TestDefinition, 'active' | 'createdAt' | 'updatedAt'>;

export const candidateScreeningTests: SeedTest[] = [
  {
    name: 'Juicio Situacional Laboral (SJT)',
    category: 'Competencias laborales',
    description:
      'Prueba de juicio situacional con escenarios breves de contexto organizacional. Recomendada para filtro inicial de toma de decisiones en el trabajo.',
    instructions:
      'Lee cada escenario y marca la respuesta que mejor representa una accion efectiva, etica y orientada a resultados.',
    scoringMode: 'range',
    questions: [
      {
        id: 'sjt1',
        text: 'Tu lider te pide cerrar un informe hoy, pero detectas un dato inconsistente a 30 minutos del envio.',
        type: 'single_choice',
        options: [
          {
            id: 'sjt1o1',
            text: 'Avisas de inmediato, explicas impacto y propones una correccion con hora estimada.',
            value: 4,
          },
          {
            id: 'sjt1o2',
            text: 'Corriges sin avisar y envias cuando termines, aunque no cumplas el horario.',
            value: 3,
          },
          {
            id: 'sjt1o3',
            text: 'Envias el informe como esta para cumplir y corriges luego.',
            value: 2,
          },
          {
            id: 'sjt1o4',
            text: 'No haces cambios y esperas a que te pregunten.',
            value: 1,
          },
        ],
      },
      {
        id: 'sjt2',
        text: 'Un cliente interno solicita una excepcion al proceso que podria afectar la trazabilidad.',
        type: 'single_choice',
        options: [
          {
            id: 'sjt2o1',
            text: 'Revisas la politica, explicas riesgos y escalas para una decision formal.',
            value: 4,
          },
          {
            id: 'sjt2o2',
            text: 'Aceptas la excepcion esta vez y documentas despues.',
            value: 3,
          },
          {
            id: 'sjt2o3',
            text: 'Niega la solicitud sin explicar el motivo.',
            value: 2,
          },
          {
            id: 'sjt2o4',
            text: 'Ignoras la solicitud para evitar conflicto.',
            value: 1,
          },
        ],
      },
      {
        id: 'sjt3',
        text: 'En una reunion hay desacuerdo fuerte entre dos areas y debes facilitar una salida.',
        type: 'single_choice',
        options: [
          {
            id: 'sjt3o1',
            text: 'Clarificas objetivo comun, separas hechos de opiniones y propones acuerdo con responsables.',
            value: 4,
          },
          {
            id: 'sjt3o2',
            text: 'Buscas un punto medio rapido, aunque no quede claro quien ejecuta.',
            value: 3,
          },
          {
            id: 'sjt3o3',
            text: 'Respaldas al area con mayor jerarquia para cerrar rapido.',
            value: 2,
          },
          {
            id: 'sjt3o4',
            text: 'Dejas la discusion abierta para evitar tension.',
            value: 1,
          },
        ],
      },
      {
        id: 'sjt4',
        text: 'Recibes una tarea urgente mientras ya tienes dos entregables criticos en curso.',
        type: 'single_choice',
        options: [
          {
            id: 'sjt4o1',
            text: 'Repriorizas con tu lider, defines alcance minimo viable y confirmas nuevos tiempos.',
            value: 4,
          },
          {
            id: 'sjt4o2',
            text: 'Aceptas todo y trabajas mas horas sin ajustar expectativas.',
            value: 3,
          },
          {
            id: 'sjt4o3',
            text: 'Postergas una tarea por tu cuenta sin informar a nadie.',
            value: 2,
          },
          {
            id: 'sjt4o4',
            text: 'Rechazas la nueva tarea sin analizar opciones.',
            value: 1,
          },
        ],
      },
      {
        id: 'sjt5',
        text: 'Un companero nuevo comete errores repetidos en un proceso que dominas.',
        type: 'single_choice',
        options: [
          {
            id: 'sjt5o1',
            text: 'Le das retroalimentacion concreta, muestras ejemplo correcto y acuerdan seguimiento.',
            value: 4,
          },
          {
            id: 'sjt5o2',
            text: 'Corriges tu mismo los errores para acelerar.',
            value: 3,
          },
          {
            id: 'sjt5o3',
            text: 'Comentas el problema con otros companeros, pero no con el.',
            value: 2,
          },
          {
            id: 'sjt5o4',
            text: 'Lo dejas para que aprenda solo.',
            value: 1,
          },
        ],
      },
      {
        id: 'sjt6',
        text: 'Tu equipo identifica una causa raiz que contradice una suposicion de la jefatura.',
        type: 'single_choice',
        options: [
          {
            id: 'sjt6o1',
            text: 'Presentas evidencia verificable, alternativas y riesgos de no actuar.',
            value: 4,
          },
          {
            id: 'sjt6o2',
            text: 'Suavizas el hallazgo para no incomodar y esperas nueva revision.',
            value: 3,
          },
          {
            id: 'sjt6o3',
            text: 'Descartas el hallazgo para alinear el discurso.',
            value: 2,
          },
          {
            id: 'sjt6o4',
            text: 'Evitas participar para no exponerte.',
            value: 1,
          },
        ],
      },
      {
        id: 'sjt7',
        text: 'Debes responder una queja de cliente por retraso en un pedido.',
        type: 'single_choice',
        options: [
          {
            id: 'sjt7o1',
            text: 'Reconoces el impacto, explicas estado real y compartes plan con fechas verificables.',
            value: 4,
          },
          {
            id: 'sjt7o2',
            text: 'Ofreces una disculpa general y dices que luego envias detalle.',
            value: 3,
          },
          {
            id: 'sjt7o3',
            text: 'Trasladas la responsabilidad a otra area para cerrar rapido.',
            value: 2,
          },
          {
            id: 'sjt7o4',
            text: 'No respondes hasta tener solucion final completa.',
            value: 1,
          },
        ],
      },
      {
        id: 'sjt8',
        text: 'Una decision operativa debe tomarse hoy, pero falta informacion secundaria.',
        type: 'single_choice',
        options: [
          {
            id: 'sjt8o1',
            text: 'Decides con la mejor evidencia disponible, documentas supuestos y defines punto de control.',
            value: 4,
          },
          {
            id: 'sjt8o2',
            text: 'Pospones hasta tener toda la informacion, aunque se afecte el plazo.',
            value: 3,
          },
          {
            id: 'sjt8o3',
            text: 'Decides solo por intuicion para acelerar.',
            value: 2,
          },
          {
            id: 'sjt8o4',
            text: 'Esperas que otra persona asuma la decision.',
            value: 1,
          },
        ],
      },
      {
        id: 'sjt9',
        text: 'Detectas una mejora de proceso que reduce errores, pero implica cambiar una rutina del equipo.',
        type: 'single_choice',
        options: [
          {
            id: 'sjt9o1',
            text: 'Piloteas la mejora con metricas, recoges feedback y escalas gradualmente.',
            value: 4,
          },
          {
            id: 'sjt9o2',
            text: 'Implementas el cambio completo de inmediato para acelerar resultados.',
            value: 3,
          },
          {
            id: 'sjt9o3',
            text: 'Esperas meses para no incomodar al equipo.',
            value: 2,
          },
          {
            id: 'sjt9o4',
            text: 'No propones nada porque no es obligatorio.',
            value: 1,
          },
        ],
      },
      {
        id: 'sjt10',
        text: 'Un error menor de tu equipo ya fue corregido, pero pudo afectar un reporte previo.',
        type: 'single_choice',
        options: [
          {
            id: 'sjt10o1',
            text: 'Informas oportunamente, detallas impacto real y dejas evidencia de la correccion.',
            value: 4,
          },
          {
            id: 'sjt10o2',
            text: 'No informas porque el error ya esta corregido.',
            value: 3,
          },
          {
            id: 'sjt10o3',
            text: 'Informas solo si alguien lo detecta.',
            value: 2,
          },
          {
            id: 'sjt10o4',
            text: 'Eliminas rastros para evitar reprocesos.',
            value: 1,
          },
        ],
      },
    ],
    interpretationRanges: [
      {
        min: 10,
        max: 20,
        label: 'Bajo ajuste situacional',
        description:
          'Muestra oportunidades de mejora en criterio practico, priorizacion y toma de decisiones en contexto laboral.',
      },
      {
        min: 21,
        max: 30,
        label: 'Ajuste situacional medio',
        description:
          'Evidencia criterios funcionales en escenarios comunes, con margen de mejora en complejidad o presion.',
      },
      {
        min: 31,
        max: 40,
        label: 'Alto ajuste situacional',
        description:
          'Muestra decisiones consistentes con enfoque de riesgo, colaboracion y orientacion a resultados.',
      },
    ],
  },
  {
    name: 'Integridad y Cumplimiento Laboral',
    category: 'Integridad laboral',
    description:
      'Prueba de integridad orientada a conductas de cumplimiento, responsabilidad y transparencia en entorno organizacional.',
    instructions:
      'Selecciona la opcion que refleje mejor una conducta etica, trazable y alineada con politicas internas.',
    scoringMode: 'range',
    questions: [
      {
        id: 'int1',
        text: 'Un companero te pide registrar una hora de salida que no corresponde para "ayudarlo".',
        type: 'single_choice',
        options: [
          {
            id: 'int1o1',
            text: 'Te niegas, explicas el riesgo y recomiendas regularizarlo por el canal formal.',
            value: 4,
          },
          {
            id: 'int1o2',
            text: 'Aceptas una sola vez y pides que no se repita.',
            value: 2,
          },
          {
            id: 'int1o3',
            text: 'Lo haces si el companero promete devolverte el favor.',
            value: 1,
          },
          {
            id: 'int1o4',
            text: 'Ignoras el tema para no meterte en problemas.',
            value: 3,
          },
        ],
      },
      {
        id: 'int2',
        text: 'Encuentras un gasto menor sin soporte en un reporte que debes aprobar.',
        type: 'single_choice',
        options: [
          {
            id: 'int2o1',
            text: 'Solicitas soporte y dejas registro antes de aprobar.',
            value: 4,
          },
          {
            id: 'int2o2',
            text: 'Apruebas porque el monto es bajo.',
            value: 1,
          },
          {
            id: 'int2o3',
            text: 'Apruebas y pides el soporte despues.',
            value: 2,
          },
          {
            id: 'int2o4',
            text: 'Rechazas sin explicar.',
            value: 3,
          },
        ],
      },
      {
        id: 'int3',
        text: 'Recibes informacion confidencial de un cliente por error en copia de correo.',
        type: 'single_choice',
        options: [
          {
            id: 'int3o1',
            text: 'Notificas el error, eliminas copia local y confirmas tratamiento seguro de la informacion.',
            value: 4,
          },
          {
            id: 'int3o2',
            text: 'Guardas el correo por si sirve para futuras decisiones.',
            value: 1,
          },
          {
            id: 'int3o3',
            text: 'Lo comentas con tu equipo para que esten al tanto.',
            value: 2,
          },
          {
            id: 'int3o4',
            text: 'No haces nada porque no fue tu error.',
            value: 1,
          },
        ],
      },
      {
        id: 'int4',
        text: 'Tu jefe directo sugiere omitir un control para cumplir una meta de corto plazo.',
        type: 'single_choice',
        options: [
          {
            id: 'int4o1',
            text: 'Explicas riesgos, propones alternativa y escalas por canal de cumplimiento si persiste.',
            value: 4,
          },
          {
            id: 'int4o2',
            text: 'Aceptas por ser una instruccion directa.',
            value: 1,
          },
          {
            id: 'int4o3',
            text: 'Omites control esta vez y lo retomas despues.',
            value: 2,
          },
          {
            id: 'int4o4',
            text: 'Te retiras de la tarea sin informar.',
            value: 2,
          },
        ],
      },
      {
        id: 'int5',
        text: 'Detectas que enviaste un archivo con una version anterior al cliente.',
        type: 'single_choice',
        options: [
          {
            id: 'int5o1',
            text: 'Informas de inmediato, envias version correcta y confirmas impacto.',
            value: 4,
          },
          {
            id: 'int5o2',
            text: 'Esperas a ver si el cliente lo nota.',
            value: 1,
          },
          {
            id: 'int5o3',
            text: 'Corriges en silencio y finges que fue el archivo inicial.',
            value: 1,
          },
          {
            id: 'int5o4',
            text: 'Informas solo si el archivo afecta un KPI.',
            value: 2,
          },
        ],
      },
      {
        id: 'int6',
        text: 'Un proveedor ofrece un obsequio personal para "agilizar" una aprobacion.',
        type: 'single_choice',
        options: [
          {
            id: 'int6o1',
            text: 'Rechazas el beneficio, reportas conflicto potencial y mantienes trazabilidad del proceso.',
            value: 4,
          },
          {
            id: 'int6o2',
            text: 'Aceptas si no supera un valor pequeno.',
            value: 1,
          },
          {
            id: 'int6o3',
            text: 'Aceptas pero intentas mantener objetividad.',
            value: 1,
          },
          {
            id: 'int6o4',
            text: 'Pides que el obsequio sea para el equipo y continuas.',
            value: 2,
          },
        ],
      },
      {
        id: 'int7',
        text: 'Ves un error en una factura de otro equipo que podria pasar desapercibido.',
        type: 'single_choice',
        options: [
          {
            id: 'int7o1',
            text: 'Notificas al responsable con evidencia y solicitas correccion antes de cierre.',
            value: 4,
          },
          {
            id: 'int7o2',
            text: 'No dices nada porque no pertenece a tu area.',
            value: 1,
          },
          {
            id: 'int7o3',
            text: 'Corriges sin avisar para evitar friccion.',
            value: 2,
          },
          {
            id: 'int7o4',
            text: 'Comentas el error informalmente en una reunion.',
            value: 2,
          },
        ],
      },
      {
        id: 'int8',
        text: 'En una auditoria interna te piden explicar una desviacion operativa.',
        type: 'single_choice',
        options: [
          {
            id: 'int8o1',
            text: 'Describes hechos, causas y acciones correctivas sin ocultar informacion.',
            value: 4,
          },
          {
            id: 'int8o2',
            text: 'Minimizas la desviacion para proteger al equipo.',
            value: 1,
          },
          {
            id: 'int8o3',
            text: 'Atribuyes la causa a otro equipo sin evidencia.',
            value: 1,
          },
          {
            id: 'int8o4',
            text: 'Respondes solo lo que te preguntan de forma literal.',
            value: 3,
          },
        ],
      },
      {
        id: 'int9',
        text: 'Te asignan acceso temporal a informacion sensible que ya no necesitas.',
        type: 'single_choice',
        options: [
          {
            id: 'int9o1',
            text: 'Solicitas revocar accesos y verificas cierre del permiso.',
            value: 4,
          },
          {
            id: 'int9o2',
            text: 'Conservas acceso por si vuelve a ser util.',
            value: 1,
          },
          {
            id: 'int9o3',
            text: 'Compartes acceso con un companero para cubrir ausencias.',
            value: 1,
          },
          {
            id: 'int9o4',
            text: 'No haces nada mientras nadie lo solicite.',
            value: 2,
          },
        ],
      },
      {
        id: 'int10',
        text: 'Tu equipo esta bajo presion por metas y se propone "simplificar" registros obligatorios.',
        type: 'single_choice',
        options: [
          {
            id: 'int10o1',
            text: 'Defiendes mantener controles minimos y propones mejoras de eficiencia sin perder trazabilidad.',
            value: 4,
          },
          {
            id: 'int10o2',
            text: 'Aceptas simplificar durante el cierre y normalizar despues.',
            value: 2,
          },
          {
            id: 'int10o3',
            text: 'Eliminas campos de control para acelerar.',
            value: 1,
          },
          {
            id: 'int10o4',
            text: 'Evitas opinar para no quedar expuesto.',
            value: 2,
          },
        ],
      },
    ],
    interpretationRanges: [
      {
        min: 10,
        max: 20,
        label: 'Riesgo alto en integridad',
        description:
          'Se observan respuestas con mayor tolerancia a omisiones o conductas de cumplimiento debil.',
      },
      {
        min: 21,
        max: 30,
        label: 'Riesgo moderado en integridad',
        description:
          'Se evidencian criterios mixtos en transparencia y cumplimiento, con oportunidades de fortalecimiento.',
      },
      {
        min: 31,
        max: 40,
        label: 'Riesgo bajo en integridad',
        description:
          'Predominan respuestas alineadas con responsabilidad, etica y control de riesgos.',
      },
    ],
  },
  {
    name: 'Razonamiento Numerico Aplicado',
    category: 'Aptitud cognitiva',
    description:
      'Prueba de razonamiento numerico con operaciones basicas de negocio: porcentajes, promedios, proporcion y productividad.',
    instructions:
      'Selecciona la opcion correcta en cada ejercicio. Se recomienda resolver sin calculadora para filtro inicial.',
    scoringMode: 'range',
    questions: [
      {
        id: 'num1',
        text: 'Si una persona procesa 18 solicitudes por hora, cuantas procesa en 7 horas?',
        type: 'single_choice',
        options: [
          { id: 'num1o1', text: '126', value: 4 },
          { id: 'num1o2', text: '112', value: 1 },
          { id: 'num1o3', text: '132', value: 1 },
          { id: 'num1o4', text: '146', value: 1 },
        ],
      },
      {
        id: 'num2',
        text: 'Un servicio cuesta 240000 y tiene descuento del 15%. Cual es el valor final?',
        type: 'single_choice',
        options: [
          { id: 'num2o1', text: '204000', value: 4 },
          { id: 'num2o2', text: '216000', value: 1 },
          { id: 'num2o3', text: '198000', value: 1 },
          { id: 'num2o4', text: '225000', value: 1 },
        ],
      },
      {
        id: 'num3',
        text: 'Se vendieron 320 unidades el lunes y 280 el martes. Cual fue el promedio diario?',
        type: 'single_choice',
        options: [
          { id: 'num3o1', text: '300', value: 4 },
          { id: 'num3o2', text: '290', value: 1 },
          { id: 'num3o3', text: '310', value: 1 },
          { id: 'num3o4', text: '600', value: 1 },
        ],
      },
      {
        id: 'num4',
        text: 'En una muestra de 200 piezas, 12 tienen error. Cual es el porcentaje de error?',
        type: 'single_choice',
        options: [
          { id: 'num4o1', text: '6%', value: 4 },
          { id: 'num4o2', text: '12%', value: 1 },
          { id: 'num4o3', text: '5%', value: 1 },
          { id: 'num4o4', text: '8%', value: 1 },
        ],
      },
      {
        id: 'num5',
        text: 'Un proyecto requiere 45 horas por semana durante 4 semanas. Cuantas horas totales son?',
        type: 'single_choice',
        options: [
          { id: 'num5o1', text: '180', value: 4 },
          { id: 'num5o2', text: '160', value: 1 },
          { id: 'num5o3', text: '200', value: 1 },
          { id: 'num5o4', text: '220', value: 1 },
        ],
      },
      {
        id: 'num6',
        text: 'Si un presupuesto sube de 1200 a 1380, cual fue el incremento porcentual?',
        type: 'single_choice',
        options: [
          { id: 'num6o1', text: '15%', value: 4 },
          { id: 'num6o2', text: '12%', value: 1 },
          { id: 'num6o3', text: '18%', value: 1 },
          { id: 'num6o4', text: '20%', value: 1 },
        ],
      },
      {
        id: 'num7',
        text: 'Un area recibe 96 casos al dia. Si se automatiza el 25%, cuantos quedan manuales?',
        type: 'single_choice',
        options: [
          { id: 'num7o1', text: '72', value: 4 },
          { id: 'num7o2', text: '64', value: 1 },
          { id: 'num7o3', text: '70', value: 1 },
          { id: 'num7o4', text: '76', value: 1 },
        ],
      },
      {
        id: 'num8',
        text: 'Hay 540 unidades en inventario y se despachan 3 lotes de 120. Cuantas quedan?',
        type: 'single_choice',
        options: [
          { id: 'num8o1', text: '180', value: 4 },
          { id: 'num8o2', text: '160', value: 1 },
          { id: 'num8o3', text: '200', value: 1 },
          { id: 'num8o4', text: '220', value: 1 },
        ],
      },
      {
        id: 'num9',
        text: 'Cual es el promedio de 30, 40, 35, 45 y 50?',
        type: 'single_choice',
        options: [
          { id: 'num9o1', text: '40', value: 4 },
          { id: 'num9o2', text: '38', value: 1 },
          { id: 'num9o3', text: '42', value: 1 },
          { id: 'num9o4', text: '45', value: 1 },
        ],
      },
      {
        id: 'num10',
        text: 'En una proporcion 2:5 aplicada a 70 casos, cuantos corresponden al segundo grupo?',
        type: 'single_choice',
        options: [
          { id: 'num10o1', text: '50', value: 4 },
          { id: 'num10o2', text: '40', value: 1 },
          { id: 'num10o3', text: '45', value: 1 },
          { id: 'num10o4', text: '55', value: 1 },
        ],
      },
      {
        id: 'num11',
        text: 'Si 8 personas terminan una tarea en 15 dias, en cuantos dias la terminan 12 personas al mismo ritmo?',
        type: 'single_choice',
        options: [
          { id: 'num11o1', text: '10', value: 4 },
          { id: 'num11o2', text: '12', value: 1 },
          { id: 'num11o3', text: '9', value: 1 },
          { id: 'num11o4', text: '8', value: 1 },
        ],
      },
      {
        id: 'num12',
        text: 'Si el costo unitario es 18 y se aplica margen del 25% sobre costo, cual es el precio de venta?',
        type: 'single_choice',
        options: [
          { id: 'num12o1', text: '22.50', value: 4 },
          { id: 'num12o2', text: '21.60', value: 1 },
          { id: 'num12o3', text: '23.00', value: 1 },
          { id: 'num12o4', text: '24.50', value: 1 },
        ],
      },
    ],
    interpretationRanges: [
      {
        min: 12,
        max: 23,
        label: 'Bajo razonamiento numerico',
        description:
          'Presenta oportunidades de mejora en calculo aplicado, conversion de datos y analisis cuantitativo basico.',
      },
      {
        min: 24,
        max: 35,
        label: 'Razonamiento numerico medio',
        description:
          'Muestra desempeno funcional en ejercicios basicos de negocio, con margen de mejora en precision y velocidad.',
      },
      {
        min: 36,
        max: 48,
        label: 'Alto razonamiento numerico',
        description:
          'Muestra buen manejo de operaciones clave para entornos de control, analisis y toma de decisiones con datos.',
      },
    ],
  },
  {
    name: 'Atencion al Detalle y Calidad',
    category: 'Confiabilidad operativa',
    description:
      'Prueba de atencion al detalle orientada a deteccion de inconsistencias, control de errores y disciplina de calidad.',
    instructions:
      'Selecciona la opcion que mejor represente una respuesta rigurosa para prevenir errores y proteger la calidad.',
    scoringMode: 'range',
    questions: [
      {
        id: 'adc1',
        text: 'Antes de enviar un contrato notas que el numero de identificacion no coincide con el anexo.',
        type: 'single_choice',
        options: [
          {
            id: 'adc1o1',
            text: 'Detienes envio, verificas fuente oficial y corriges ambas secciones antes de liberar.',
            value: 4,
          },
          {
            id: 'adc1o2',
            text: 'Corriges solo la portada y envias.',
            value: 2,
          },
          {
            id: 'adc1o3',
            text: 'Envias y reportas despues.',
            value: 1,
          },
          {
            id: 'adc1o4',
            text: 'Pides a otro que lo revise sin explicar el problema.',
            value: 3,
          },
        ],
      },
      {
        id: 'adc2',
        text: 'En una tabla, la suma de subtotales no coincide con el total general.',
        type: 'single_choice',
        options: [
          {
            id: 'adc2o1',
            text: 'Reconcilias formulas y origen de datos antes de publicar.',
            value: 4,
          },
          {
            id: 'adc2o2',
            text: 'Ajustas manualmente el total para que coincida.',
            value: 1,
          },
          {
            id: 'adc2o3',
            text: 'Publicas con nota de "dato preliminar".',
            value: 2,
          },
          {
            id: 'adc2o4',
            text: 'Ocultas la fila conflictiva.',
            value: 1,
          },
        ],
      },
      {
        id: 'adc3',
        text: 'Debes cargar 80 registros y detectas patron de error en 3 campos obligatorios.',
        type: 'single_choice',
        options: [
          {
            id: 'adc3o1',
            text: 'Paras la carga, aplicas validacion automatica y corriges lote completo.',
            value: 4,
          },
          {
            id: 'adc3o2',
            text: 'Corriges solo los primeros registros para avanzar.',
            value: 2,
          },
          {
            id: 'adc3o3',
            text: 'Cargas todo y esperas reportes de error del sistema.',
            value: 1,
          },
          {
            id: 'adc3o4',
            text: 'Delegas sin entregar criterios de control.',
            value: 2,
          },
        ],
      },
      {
        id: 'adc4',
        text: 'Un reporte mensual tiene dos versiones con fechas distintas y no sabes cual es la final.',
        type: 'single_choice',
        options: [
          {
            id: 'adc4o1',
            text: 'Validas version oficial por control documental y confirmas responsable.',
            value: 4,
          },
          {
            id: 'adc4o2',
            text: 'Eliges la mas reciente por fecha visible y continuas.',
            value: 3,
          },
          {
            id: 'adc4o3',
            text: 'Combinas datos de ambas versiones.',
            value: 1,
          },
          {
            id: 'adc4o4',
            text: 'Aplazas el reporte hasta nuevo aviso.',
            value: 2,
          },
        ],
      },
      {
        id: 'adc5',
        text: 'En un listado de codigos, dos caracteres estan invertidos en varios registros.',
        type: 'single_choice',
        options: [
          {
            id: 'adc5o1',
            text: 'Buscas todos los casos con regla de validacion y corriges con trazabilidad.',
            value: 4,
          },
          {
            id: 'adc5o2',
            text: 'Corriges solo los casos visibles en pantalla.',
            value: 2,
          },
          {
            id: 'adc5o3',
            text: 'Dejas el error porque no afecta hoy.',
            value: 1,
          },
          {
            id: 'adc5o4',
            text: 'Pides que otro lo arregle sin contexto.',
            value: 2,
          },
        ],
      },
      {
        id: 'adc6',
        text: 'Un ticket de soporte no trae evidencia adjunta, pero el tiempo de respuesta esta por vencer.',
        type: 'single_choice',
        options: [
          {
            id: 'adc6o1',
            text: 'Solicitas evidencia minima, documentas avance y ajustas respuesta con datos verificables.',
            value: 4,
          },
          {
            id: 'adc6o2',
            text: 'Cierras el ticket con una respuesta estandar.',
            value: 1,
          },
          {
            id: 'adc6o3',
            text: 'Inventas una causa probable para cumplir tiempo.',
            value: 1,
          },
          {
            id: 'adc6o4',
            text: 'Escalas sin informacion de contexto.',
            value: 2,
          },
        ],
      },
      {
        id: 'adc7',
        text: 'Una actualizacion del sistema cambia campos obligatorios del formulario.',
        type: 'single_choice',
        options: [
          {
            id: 'adc7o1',
            text: 'Actualizas checklist, pruebas casos criticos y comunicas cambios antes de operar.',
            value: 4,
          },
          {
            id: 'adc7o2',
            text: 'Empiezas a operar y corriges sobre la marcha.',
            value: 2,
          },
          {
            id: 'adc7o3',
            text: 'Mantienes el formulario antiguo mientras funcione.',
            value: 1,
          },
          {
            id: 'adc7o4',
            text: 'Pides a cada usuario que descubra los cambios por su cuenta.',
            value: 1,
          },
        ],
      },
      {
        id: 'adc8',
        text: 'Debes revisar 40 expedientes con plazo corto.',
        type: 'single_choice',
        options: [
          {
            id: 'adc8o1',
            text: 'Priorizas por riesgo, aplicas muestreo inteligente y documentas hallazgos clave.',
            value: 4,
          },
          {
            id: 'adc8o2',
            text: 'Revisas todos rapido sin checklist para ganar tiempo.',
            value: 2,
          },
          {
            id: 'adc8o3',
            text: 'Revisas solo la mitad y marcas el resto como aprobado.',
            value: 1,
          },
          {
            id: 'adc8o4',
            text: 'Aplazas toda la revision para evitar errores.',
            value: 2,
          },
        ],
      },
      {
        id: 'adc9',
        text: 'Un colega omite un paso de control porque "nunca falla".',
        type: 'single_choice',
        options: [
          {
            id: 'adc9o1',
            text: 'Solicitas cumplir el paso, explicas riesgo acumulado y dejas evidencia del control.',
            value: 4,
          },
          {
            id: 'adc9o2',
            text: 'Aceptas omitirlo si la carga esta alta.',
            value: 1,
          },
          {
            id: 'adc9o3',
            text: 'Ignoras la situacion para evitar roce.',
            value: 1,
          },
          {
            id: 'adc9o4',
            text: 'Comentas el caso en privado, pero sin asegurar correccion.',
            value: 3,
          },
        ],
      },
      {
        id: 'adc10',
        text: 'Tras entregar un informe, detectas que una cifra de referencia estaba desactualizada.',
        type: 'single_choice',
        options: [
          {
            id: 'adc10o1',
            text: 'Comunicas ajuste, compartes version corregida y explicas impacto real.',
            value: 4,
          },
          {
            id: 'adc10o2',
            text: 'No informas porque el cambio es pequeno.',
            value: 1,
          },
          {
            id: 'adc10o3',
            text: 'Actualizas en silencio y reemplazas archivo sin aviso.',
            value: 2,
          },
          {
            id: 'adc10o4',
            text: 'Esperas a la proxima entrega para corregir.',
            value: 2,
          },
        ],
      },
    ],
    interpretationRanges: [
      {
        min: 10,
        max: 20,
        label: 'Baja rigurosidad de detalle',
        description:
          'Se observan respuestas con mayor probabilidad de omision de controles y fallas de consistencia.',
      },
      {
        min: 21,
        max: 30,
        label: 'Rigurosidad de detalle media',
        description:
          'Muestra practicas funcionales de revision, con margen de mejora en disciplina de calidad y trazabilidad.',
      },
      {
        min: 31,
        max: 40,
        label: 'Alta rigurosidad de detalle',
        description:
          'Predominan respuestas consistentes con control preventivo de errores y estandares de calidad.',
      },
    ],
  },
  {
    name: 'Comunicacion y Colaboracion',
    category: 'Habilidades interpersonales',
    description:
      'Prueba conductual breve para valorar colaboracion, comunicacion efectiva y coordinacion con distintos actores.',
    instructions:
      'Selecciona la opcion que mejor represente una conducta colaborativa, clara y orientada a solucion.',
    scoringMode: 'range',
    questions: [
      {
        id: 'col1',
        text: 'En una reunion, dos personas se interrumpen y la decision se estanca.',
        type: 'single_choice',
        options: [
          {
            id: 'col1o1',
            text: 'Ordenas turnos, resumes puntos clave y acuerdan criterio de decision.',
            value: 4,
          },
          {
            id: 'col1o2',
            text: 'Dejas que discutan hasta que uno ceda.',
            value: 1,
          },
          {
            id: 'col1o3',
            text: 'Cierras reunion sin acuerdo para evitar tension.',
            value: 2,
          },
          {
            id: 'col1o4',
            text: 'Decides unilateralmente para avanzar.',
            value: 2,
          },
        ],
      },
      {
        id: 'col2',
        text: 'Un equipo remoto interpreta mal una instruccion y entrega algo distinto a lo esperado.',
        type: 'single_choice',
        options: [
          {
            id: 'col2o1',
            text: 'Aclaras objetivo con ejemplo concreto, criterios de aceptacion y confirmacion de entendimiento.',
            value: 4,
          },
          {
            id: 'col2o2',
            text: 'Reenvias el mismo mensaje con mas urgencia.',
            value: 2,
          },
          {
            id: 'col2o3',
            text: 'Asumes que ya deberian saberlo y no explicas.',
            value: 1,
          },
          {
            id: 'col2o4',
            text: 'Corriges tu mismo sin comunicar aprendizaje.',
            value: 2,
          },
        ],
      },
      {
        id: 'col3',
        text: 'Debes dar retroalimentacion a un colega por un incumplimiento recurrente.',
        type: 'single_choice',
        options: [
          {
            id: 'col3o1',
            text: 'Das feedback especifico sobre hechos, impacto y acuerdo de mejora con seguimiento.',
            value: 4,
          },
          {
            id: 'col3o2',
            text: 'Evitas el tema y esperas que mejore solo.',
            value: 1,
          },
          {
            id: 'col3o3',
            text: 'Lo corriges en publico para dejar precedente.',
            value: 1,
          },
          {
            id: 'col3o4',
            text: 'Hablas solo de forma general, sin ejemplos.',
            value: 2,
          },
        ],
      },
      {
        id: 'col4',
        text: 'Otra area bloquea una dependencia critica para tu entrega.',
        type: 'single_choice',
        options: [
          {
            id: 'col4o1',
            text: 'Buscas alineacion de prioridades, propones alternativas y acuerdas nuevo compromiso.',
            value: 4,
          },
          {
            id: 'col4o2',
            text: 'Escalas directamente sin intentar coordinacion previa.',
            value: 2,
          },
          {
            id: 'col4o3',
            text: 'Te quejas con tu equipo y esperas.',
            value: 1,
          },
          {
            id: 'col4o4',
            text: 'Reprogramas tu entrega sin comunicar impacto.',
            value: 2,
          },
        ],
      },
      {
        id: 'col5',
        text: 'Un nuevo integrante entra al equipo en semana de alta carga.',
        type: 'single_choice',
        options: [
          {
            id: 'col5o1',
            text: 'Defines onboarding minimo, responsable de apoyo y puntos de control cortos.',
            value: 4,
          },
          {
            id: 'col5o2',
            text: 'Le envias documentos y que aprenda por su cuenta.',
            value: 2,
          },
          {
            id: 'col5o3',
            text: 'Evitas integrarlo hasta que baje la carga.',
            value: 1,
          },
          {
            id: 'col5o4',
            text: 'Le asignas tareas sin contexto para "acelerar".',
            value: 1,
          },
        ],
      },
      {
        id: 'col6',
        text: 'En una decision tecnica, tienes una postura diferente a la mayoria.',
        type: 'single_choice',
        options: [
          {
            id: 'col6o1',
            text: 'Presentas argumentos con evidencia, escuchas objeciones y acuerdan criterio comun.',
            value: 4,
          },
          {
            id: 'col6o2',
            text: 'Insistes en tu postura sin ceder.',
            value: 1,
          },
          {
            id: 'col6o3',
            text: 'Te callas para evitar conflicto.',
            value: 2,
          },
          {
            id: 'col6o4',
            text: 'Votas con la mayoria aunque no entiendas bien.',
            value: 2,
          },
        ],
      },
      {
        id: 'col7',
        text: 'Un problema entre dos companeros afecta tiempos de entrega del equipo.',
        type: 'single_choice',
        options: [
          {
            id: 'col7o1',
            text: 'Intervienes para reencuadrar el problema, definir acuerdos y responsables.',
            value: 4,
          },
          {
            id: 'col7o2',
            text: 'Esperas a que RRHH lo resuelva sin accion del equipo.',
            value: 2,
          },
          {
            id: 'col7o3',
            text: 'Tomas partido por quien conoces mejor.',
            value: 1,
          },
          {
            id: 'col7o4',
            text: 'Separas tareas sin hablar del conflicto.',
            value: 2,
          },
        ],
      },
      {
        id: 'col8',
        text: 'Tras un logro de proyecto, la contribucion estuvo distribuida en varios roles.',
        type: 'single_choice',
        options: [
          {
            id: 'col8o1',
            text: 'Reconoces aportes clave de forma explicita y documentas aprendizajes compartidos.',
            value: 4,
          },
          {
            id: 'col8o2',
            text: 'Destacas solo a las personas de mayor visibilidad.',
            value: 1,
          },
          {
            id: 'col8o3',
            text: 'Evitas reconocer para no abrir debates.',
            value: 1,
          },
          {
            id: 'col8o4',
            text: 'Agradeces en general sin mencionar contribuciones.',
            value: 2,
          },
        ],
      },
      {
        id: 'col9',
        text: 'Debes transferir una tarea critica a otro turno antes de salir.',
        type: 'single_choice',
        options: [
          {
            id: 'col9o1',
            text: 'Realizas handoff estructurado con estado, riesgos y siguientes pasos.',
            value: 4,
          },
          {
            id: 'col9o2',
            text: 'Dejas una nota breve en el chat sin contexto.',
            value: 2,
          },
          {
            id: 'col9o3',
            text: 'Confias en que el otro turno revise todo desde cero.',
            value: 1,
          },
          {
            id: 'col9o4',
            text: 'Postergas el handoff para la manana siguiente.',
            value: 1,
          },
        ],
      },
      {
        id: 'col10',
        text: 'Durante una sesion, una persona con buena informacion casi no participa.',
        type: 'single_choice',
        options: [
          {
            id: 'col10o1',
            text: 'Invitas su participacion con preguntas puntuales y validas su aporte ante el grupo.',
            value: 4,
          },
          {
            id: 'col10o2',
            text: 'Continuas con quienes hablan mas para ahorrar tiempo.',
            value: 1,
          },
          {
            id: 'col10o3',
            text: 'Le pides opinion al final, sin espacio para discutir.',
            value: 2,
          },
          {
            id: 'col10o4',
            text: 'Asumes que si no habla es porque esta de acuerdo.',
            value: 1,
          },
        ],
      },
    ],
    interpretationRanges: [
      {
        min: 10,
        max: 20,
        label: 'Baja colaboracion comunicacional',
        description:
          'Se observan respuestas con menor foco en coordinacion, escucha y construccion de acuerdos.',
      },
      {
        min: 21,
        max: 30,
        label: 'Colaboracion comunicacional media',
        description:
          'Muestra habilidades funcionales para coordinar y comunicar, con mejora posible en conversaciones complejas.',
      },
      {
        min: 31,
        max: 40,
        label: 'Alta colaboracion comunicacional',
        description:
          'Predominan respuestas de comunicacion clara, coordinacion efectiva y trabajo conjunto orientado a solucion.',
      },
    ],
  },
];
