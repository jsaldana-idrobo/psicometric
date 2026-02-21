import { useEffect, useMemo, useState } from "react";
import { apiFetchPublic } from "../lib/api";
import type { PublicSessionOpen, TestAnswer, TestQuestion } from "../lib/types";
import { DrawingInput } from "./DrawingInput";

interface PublicSessionRunnerProps {
  readonly token: string;
}

interface LocalAnswer {
  optionId?: string;
  textResponse?: string;
  drawingDataUrl?: string;
}

interface SessionQuestionCardProps {
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

function asDate(value?: string) {
  if (!value) {
    return "N/A";
  }

  return new Date(value).toLocaleString("es-CO");
}

function SessionQuestionCard({
  question,
  index,
  answer,
  onOptionChange,
  onTextChange,
  onDrawingChange,
}: SessionQuestionCardProps) {
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
              style={{ display: "flex", gap: "8px", alignItems: "center" }}
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

export function PublicSessionRunner({ token }: PublicSessionRunnerProps) {
  const [session, setSession] = useState<PublicSessionOpen | null>(null);
  const [answers, setAnswers] = useState<Record<string, LocalAnswer>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await apiFetchPublic<PublicSessionOpen>(
          `/public-sessions/open/${token}`,
        );
        setSession(response);

        const mappedAnswers: Record<string, LocalAnswer> = {};
        for (const answer of response.answers) {
          mappedAnswers[answer.questionId] = {
            optionId: answer.optionId,
            textResponse: answer.textResponse,
            drawingDataUrl: answer.drawingDataUrl,
          };
        }

        setAnswers(mappedAnswers);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "No se pudo cargar la sesión",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [token]);

  const requiredCount = useMemo(
    () =>
      session
        ? session.test.questions.filter(
            (question) => question.required !== false,
          ).length
        : 0,
    [session],
  );

  const answeredCount = useMemo(() => {
    if (!session) {
      return 0;
    }

    return session.test.questions.filter((question) =>
      isQuestionAnswered(question, answers[question.id]),
    ).length;
  }, [answers, session]);

  const payloadAnswers = useMemo<TestAnswer[]>(() => {
    if (!session) {
      return [];
    }

    return session.test.questions
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
  }, [answers, session]);

  const updateAnswer = (questionId: string, patch: Partial<LocalAnswer>) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: {
        ...current[questionId],
        ...patch,
      },
    }));
  };

  const saveProgress = async () => {
    if (!session || payloadAnswers.length === 0) {
      return;
    }

    setNotice("");
    setError("");
    setIsSaving(true);

    try {
      await apiFetchPublic(`/public-sessions/open/${token}/save`, {
        method: "POST",
        body: JSON.stringify({ answers: payloadAnswers }),
      });

      setNotice("Progreso guardado correctamente. Puedes continuar luego.");
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "No se pudo guardar el progreso",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const submit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!session) {
      return;
    }

    if (answeredCount !== session.test.questions.length) {
      setError(
        "Debes completar todas las preguntas requeridas antes de finalizar.",
      );
      return;
    }

    setNotice("");
    setError("");
    setIsSubmitting(true);

    try {
      await apiFetchPublic(`/public-sessions/open/${token}/submit`, {
        method: "POST",
        body: JSON.stringify({ answers: payloadAnswers }),
      });

      setNotice("Prueba enviada correctamente. Puedes cerrar esta ventana.");

      const updated = await apiFetchPublic<PublicSessionOpen>(
        `/public-sessions/open/${token}`,
      );
      setSession(updated);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No se pudo finalizar la prueba",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <section className="panel">Cargando sesión...</section>;
  }

  if (!session) {
    return <section className="panel error">Sesión no disponible.</section>;
  }

  if (session.status === "expired") {
    return (
      <section className="panel">
        <h2>Sesión vencida</h2>
        <p style={{ marginTop: "8px", color: "#4b5563" }}>
          Esta invitación expiró el {asDate(session.expiresAt)}. Solicita un
          nuevo enlace al psicólogo.
        </p>
      </section>
    );
  }

  if (session.status === "submitted") {
    return (
      <section className="panel">
        <h2>Prueba finalizada</h2>
        <p style={{ marginTop: "8px", color: "#4b5563" }}>
          Gracias, {session.patient.fullName}. Tu prueba ya fue enviada
          correctamente.
        </p>
        <p style={{ marginTop: "6px", color: "#4b5563" }}>
          Fecha de envío: {asDate(session.submittedAt)}
        </p>
      </section>
    );
  }

  return (
    <section className="panel">
      <h2>{session.test.name}</h2>
      <p style={{ marginTop: "6px", color: "#4b5563" }}>
        Participante: <strong>{session.patient.fullName}</strong>
      </p>
      <p style={{ marginTop: "6px", color: "#4b5563" }}>
        {session.test.description}
      </p>
      {session.test.instructions && (
        <p style={{ marginTop: "8px", color: "#334155" }}>
          <strong>Instrucciones:</strong> {session.test.instructions}
        </p>
      )}
      <p style={{ color: "#0f766e", marginTop: "8px", fontWeight: 600 }}>
        Completadas: {answeredCount}/{session.test.questions.length}{" "}
        (requeridas: {requiredCount})
      </p>

      <form className="grid" style={{ marginTop: "14px" }} onSubmit={submit}>
        {session.test.questions.map((question, index) => {
          const answer = answers[question.id] ?? {};

          return (
            <SessionQuestionCard
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

        <div className="actions">
          <button
            type="button"
            className="btn btn-soft"
            onClick={saveProgress}
            disabled={isSaving || isSubmitting || payloadAnswers.length === 0}
          >
            {isSaving ? "Guardando..." : "Guardar progreso"}
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Finalizar y enviar"}
          </button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}
      {notice && <p className="success">{notice}</p>}
    </section>
  );
}
