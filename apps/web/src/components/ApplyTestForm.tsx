import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../lib/api";
import type { TestDefinition } from "../lib/types";
import {
  buildPayloadAnswers,
  isQuestionAnswered,
  type LocalAnswer,
  type LocalAnswerMap,
} from "../lib/test-session";
import { TestQuestionCard } from "./TestQuestionCard";

interface ApplyTestFormProps {
  readonly patientId: string;
  readonly testId: string;
}

type Recommendation = "" | "APTO" | "NO_APTO" | "APTO_CON_OBSERVACIONES";

export function ApplyTestForm({ patientId, testId }: ApplyTestFormProps) {
  const [test, setTest] = useState<TestDefinition | null>(null);
  const [answers, setAnswers] = useState<LocalAnswerMap>({});
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

  const payloadAnswers = useMemo(() => {
    if (!test) {
      return [];
    }

    return buildPayloadAnswers(test.questions, answers);
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
        {test.questions.map((question, index) => (
          <TestQuestionCard
            key={question.id}
            question={question}
            index={index}
            answer={answers[question.id] ?? {}}
            onAnswerChange={(patch) => updateAnswer(question.id, patch)}
          />
        ))}

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
