import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../lib/api";
import type { TestDefinition, TestQuestion } from "../lib/types";
import { DrawingInput } from "./DrawingInput";

interface ApplyTestFormProps {
  readonly patientId: string;
  readonly testId: string;
}

type Recommendation = "" | "APTO" | "NO_APTO" | "APTO_CON_OBSERVACIONES";

interface LocalAnswer {
  optionId?: string;
  textResponse?: string;
  drawingDataUrl?: string;
}

interface QuestionCardProps {
  readonly question: TestQuestion;
  readonly index: number;
  readonly answer: LocalAnswer;
  readonly onOptionChange: (optionId: string) => void;
  readonly onTextChange: (value: string) => void;
  readonly onDrawingChange: (value: string) => void;
}

function isQuestionAnswered(
  question: TestQuestion,
  answer?: LocalAnswer,
): boolean {
  if (question.required === false) {
    return true;
  }

  const type = question.type ?? "single_choice";

  if (type === "single_choice") {
    return Boolean(answer?.optionId);
  }

  if (type === "text") {
    return Boolean(answer?.textResponse?.trim());
  }

  return Boolean(answer?.drawingDataUrl);
}

function QuestionCard({
  question,
  index,
  answer,
  onOptionChange,
  onTextChange,
  onDrawingChange,
}: QuestionCardProps) {
  const type = question.type ?? "single_choice";

  return (
    <article className="kpi" style={{ background: "#fff" }}>
      <p style={{ fontWeight: 700 }}>
        {index + 1}. {question.text}
      </p>

      {type === "single_choice" && (
        <div className="grid" style={{ marginTop: "8px" }}>
          {question.options.map((option) => (
            <label
              key={option.id}
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <input
                type="radio"
                name={question.id}
                value={option.id}
                checked={answer.optionId === option.id}
                onChange={() => onOptionChange(option.id)}
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
      )}

      {type === "text" && (
        <textarea
          className="textarea"
          style={{ marginTop: "8px" }}
          value={answer.textResponse ?? ""}
          onChange={(event) => onTextChange(event.target.value)}
        />
      )}

      {type === "drawing" && (
        <div style={{ marginTop: "8px" }}>
          <DrawingInput
            value={answer.drawingDataUrl}
            onChange={onDrawingChange}
          />
        </div>
      )}
    </article>
  );
}

export function ApplyTestForm({ patientId, testId }: ApplyTestFormProps) {
  const [test, setTest] = useState<TestDefinition | null>(null);
  const [answers, setAnswers] = useState<Record<string, LocalAnswer>>({});
  const [observations, setObservations] = useState("");
  const [finalConclusion, setFinalConclusion] = useState("");
  const [recommendation, setRecommendation] = useState<Recommendation>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadTest = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await apiFetch<TestDefinition>(`/tests/${testId}`);
        setTest(response);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "No se pudo cargar la prueba",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadTest();
  }, [testId]);

  const requiredCount = useMemo(
    () =>
      test
        ? test.questions.filter((question) => question.required !== false)
            .length
        : 0,
    [test],
  );

  const answeredCount = useMemo(() => {
    if (!test) {
      return 0;
    }

    return test.questions.filter((question) =>
      isQuestionAnswered(question, answers[question.id]),
    ).length;
  }, [answers, test]);

  const updateAnswer = (questionId: string, patch: Partial<LocalAnswer>) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: {
        ...current[questionId],
        ...patch,
      },
    }));
  };

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!test) {
      return;
    }

    if (answeredCount !== test.questions.length) {
      setError(
        "Debes completar todas las preguntas requeridas antes de guardar.",
      );
      return;
    }

    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      const payloadAnswers = test.questions
        .map((question) => {
          const answer = answers[question.id] ?? {};
          return {
            questionId: question.id,
            optionId: answer.optionId,
            textResponse: answer.textResponse,
            drawingDataUrl: answer.drawingDataUrl,
          };
        })
        .filter(
          (answer) =>
            answer.optionId || answer.textResponse || answer.drawingDataUrl,
        );

      await apiFetch("/results", {
        method: "POST",
        body: JSON.stringify({
          patientId,
          testId,
          answers: payloadAnswers,
          observations: observations || undefined,
          finalConclusion: finalConclusion || undefined,
          recommendation: recommendation || undefined,
        }),
      });

      setSuccess(
        "Resultado guardado correctamente. Regresando al expediente...",
      );
      setTimeout(() => {
        const browserWindow = globalThis.window;
        if (browserWindow) {
          browserWindow.location.href = `/patients/${patientId}`;
        }
      }, 900);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No se pudo guardar el resultado",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <section className="panel">Cargando prueba...</section>;
  }

  if (!test) {
    return <section className="panel">Prueba no disponible.</section>;
  }

  return (
    <section className="panel">
      <h2>{test.name}</h2>
      <p style={{ color: "#4b5563", marginTop: "6px" }}>{test.description}</p>
      {test.instructions && (
        <p style={{ color: "#334155", marginTop: "8px" }}>
          <strong>Instrucciones:</strong> {test.instructions}
        </p>
      )}
      <p style={{ color: "#0f766e", marginTop: "6px", fontWeight: 600 }}>
        Completadas: {answeredCount}/{test.questions.length} (requeridas:{" "}
        {requiredCount})
      </p>

      <form className="grid" style={{ marginTop: "14px" }} onSubmit={onSubmit}>
        {test.questions.map((question, index) => {
          const answer = answers[question.id] ?? {};
          return (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              answer={answer}
              onOptionChange={(optionId) =>
                updateAnswer(question.id, { optionId })
              }
              onTextChange={(value) =>
                updateAnswer(question.id, { textResponse: value })
              }
              onDrawingChange={(value) =>
                updateAnswer(question.id, { drawingDataUrl: value })
              }
            />
          );
        })}

        <div className="grid grid-2">
          <label>
            <span className="label">Observaciones</span>
            <textarea
              className="textarea"
              value={observations}
              onChange={(event) => setObservations(event.target.value)}
            />
          </label>

          <label>
            <span className="label">Conclusión final</span>
            <textarea
              className="textarea"
              value={finalConclusion}
              onChange={(event) => setFinalConclusion(event.target.value)}
            />
          </label>
        </div>

        <label>
          <span className="label">Recomendación</span>
          <select
            className="select"
            value={recommendation}
            onChange={(event) =>
              setRecommendation(event.target.value as Recommendation)
            }
          >
            <option value="">Sin recomendación</option>
            <option value="APTO">Apto</option>
            <option value="NO_APTO">No apto</option>
            <option value="APTO_CON_OBSERVACIONES">
              Apto con observaciones
            </option>
          </select>
        </label>

        <div className="actions">
          <button className="btn btn-primary" type="submit" disabled={isSaving}>
            {isSaving ? "Guardando..." : "Guardar resultado"}
          </button>
          <a className="btn btn-soft" href={`/patients/${patientId}`}>
            Volver al paciente
          </a>
        </div>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </section>
  );
}
