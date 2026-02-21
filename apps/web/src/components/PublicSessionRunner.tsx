import { useEffect, useMemo, useState } from "react";
import { apiFetchPublic } from "../lib/api";
import type { PublicSessionOpen } from "../lib/types";
import {
  buildPayloadAnswers,
  isQuestionAnswered,
  mapSavedAnswersByQuestion,
  type LocalAnswer,
  type LocalAnswerMap,
} from "../lib/test-session";
import { TestQuestionCard } from "./TestQuestionCard";

interface PublicSessionRunnerProps {
  readonly token: string;
}

function asDate(value?: string) {
  if (!value) {
    return "N/A";
  }

  return new Date(value).toLocaleString("es-CO");
}

export function PublicSessionRunner({ token }: PublicSessionRunnerProps) {
  const [session, setSession] = useState<PublicSessionOpen | null>(null);
  const [answers, setAnswers] = useState<LocalAnswerMap>({});
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
        setAnswers(mapSavedAnswersByQuestion(response.answers));
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

  const payloadAnswers = useMemo(() => {
    if (!session) {
      return [];
    }

    return buildPayloadAnswers(session.test.questions, answers);
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
        {session.test.questions.map((question, index) => (
          <TestQuestionCard
            key={question.id}
            question={question}
            index={index}
            answer={answers[question.id] ?? {}}
            onAnswerChange={(patch) => updateAnswer(question.id, patch)}
          />
        ))}

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
