import { useEffect, useMemo, useState } from "react";
import { apiDownloadUrl, apiFetch } from "../lib/api";
import type {
  Patient,
  PublicSession,
  TestDefinition,
  TestResult,
} from "../lib/types";

interface PatientDetailProps {
  readonly patientId: string;
}

interface ResultEdit {
  observations: string;
  finalConclusion: string;
  recommendation: "" | "APTO" | "NO_APTO" | "APTO_CON_OBSERVACIONES";
}

function asDate(value: string) {
  return new Date(value).toLocaleDateString("es-CO");
}

function interpretationClass(label: string) {
  const normalized = label.toLowerCase();
  if (normalized.includes("alto")) {
    return "badge badge-high";
  }
  if (normalized.includes("medio")) {
    return "badge badge-mid";
  }
  return "badge badge-low";
}

function sessionStatusBadge(status: PublicSession["status"]) {
  if (status === "submitted") {
    return "badge badge-high";
  }
  if (status === "expired") {
    return "badge badge-low";
  }
  if (status === "in_progress") {
    return "badge badge-mid";
  }
  return "badge";
}

function sessionStatusText(status: PublicSession["status"]) {
  if (status === "submitted") {
    return "Enviada";
  }
  if (status === "expired") {
    return "Expirada";
  }
  if (status === "in_progress") {
    return "En progreso";
  }
  return "Creada";
}

export function PatientDetail({ patientId }: PatientDetailProps) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [tests, setTests] = useState<TestDefinition[]>([]);
  const [results, setResults] = useState<TestResult[]>([]);
  const [sessions, setSessions] = useState<PublicSession[]>([]);
  const [edits, setEdits] = useState<Record<string, ResultEdit>>({});
  const [linkLoadingByTest, setLinkLoadingByTest] = useState<
    Record<string, boolean>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    setError("");

    try {
      const [
        patientResponse,
        testsResponse,
        resultsResponse,
        sessionsResponse,
      ] = await Promise.all([
        apiFetch<Patient>(`/patients/${patientId}`),
        apiFetch<TestDefinition[]>("/tests"),
        apiFetch<TestResult[]>(`/results/patient/${patientId}`),
        apiFetch<PublicSession[]>(`/public-sessions/patient/${patientId}`),
      ]);

      setPatient(patientResponse);
      setTests(testsResponse);
      setResults(resultsResponse);
      setSessions(sessionsResponse);

      const initialEdits: Record<string, ResultEdit> = {};
      for (const result of resultsResponse) {
        initialEdits[result._id] = {
          observations: result.observations ?? "",
          finalConclusion: result.finalConclusion ?? "",
          recommendation: result.recommendation ?? "",
        };
      }
      setEdits(initialEdits);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "No se pudo cargar el detalle",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, [patientId]);

  const recentResult = useMemo(() => results[0], [results]);

  const onSaveNotes = async (resultId: string) => {
    const edit = edits[resultId];
    if (!edit) {
      return;
    }

    try {
      const updated = await apiFetch<TestResult>(`/results/${resultId}/notes`, {
        method: "PATCH",
        body: JSON.stringify({
          observations: edit.observations || undefined,
          finalConclusion: edit.finalConclusion || undefined,
          recommendation: edit.recommendation || undefined,
        }),
      });

      setResults((current) =>
        current.map((result) => (result._id === resultId ? updated : result)),
      );
      globalThis.alert("Observaciones actualizadas");
    } catch (saveError) {
      globalThis.alert(
        saveError instanceof Error
          ? saveError.message
          : "No se pudo actualizar",
      );
    }
  };

  const createPublicLink = async (testId: string) => {
    setLinkLoadingByTest((current) => ({ ...current, [testId]: true }));

    try {
      const created = await apiFetch<{ publicUrl: string }>(
        "/public-sessions",
        {
          method: "POST",
          body: JSON.stringify({ patientId, testId }),
        },
      );

      const sessionsResponse = await apiFetch<PublicSession[]>(
        `/public-sessions/patient/${patientId}`,
      );
      setSessions(sessionsResponse);

      if (globalThis.navigator.clipboard?.writeText) {
        await globalThis.navigator.clipboard.writeText(created.publicUrl);
      }

      globalThis.alert("Enlace generado y copiado al portapapeles");
    } catch (linkError) {
      globalThis.alert(
        linkError instanceof Error
          ? linkError.message
          : "No se pudo generar el enlace público",
      );
    } finally {
      setLinkLoadingByTest((current) => ({ ...current, [testId]: false }));
    }
  };

  const copySessionLink = async (session: PublicSession) => {
    try {
      await globalThis.navigator.clipboard.writeText(session.publicUrl);
      globalThis.alert("Enlace copiado");
    } catch {
      globalThis.alert("No se pudo copiar el enlace");
    }
  };

  const downloadPdf = () => {
    const url = apiDownloadUrl(`/reports/patient/${patientId}/pdf`);
    globalThis.open(url, "_blank");
  };

  if (isLoading) {
    return <section className="panel">Cargando expediente...</section>;
  }

  if (error) {
    return <section className="panel error">{error}</section>;
  }

  if (!patient) {
    return <section className="panel">Paciente no encontrado.</section>;
  }

  return (
    <div className="grid" style={{ gap: "16px" }}>
      <section className="panel">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2>{patient.fullName}</h2>
            <p style={{ marginTop: "6px", color: "#4b5563" }}>
              Documento: {patient.documentId} | Edad: {patient.age} años |
              Empresa: {patient.company ?? "N/A"}
            </p>
          </div>
          <div className="actions">
            <a className="btn btn-soft" href="/">
              Volver al panel
            </a>
            <a className="btn btn-soft" href={`/patients/${patientId}/edit`}>
              Editar paciente
            </a>
            <button
              type="button"
              className="btn btn-primary"
              onClick={downloadPdf}
            >
              Descargar informe PDF
            </button>
          </div>
        </div>

        {recentResult && (
          <p style={{ marginTop: "12px", color: "#334155" }}>
            Último resultado:{" "}
            <strong>{recentResult.interpretationLabel}</strong> (
            {recentResult.totalScore} pts)
          </p>
        )}
      </section>

      <section className="panel">
        <h3>Aplicar prueba</h3>
        <p style={{ marginTop: "6px", color: "#4b5563" }}>
          Puedes aplicar directo o enviar un enlace abierto al paciente.
        </p>

        <div className="grid grid-2" style={{ marginTop: "12px" }}>
          {tests.map((test) => (
            <article
              key={test._id}
              className="kpi"
              style={{ background: "#fff" }}
            >
              <p className="kpi-label">{test.category}</p>
              <p style={{ fontWeight: 700 }}>{test.name}</p>
              <p style={{ fontSize: "0.9rem", color: "#4b5563" }}>
                {test.description}
              </p>
              <div className="actions" style={{ marginTop: "8px" }}>
                <a
                  className="btn btn-primary"
                  href={`/patients/${patientId}/tests/${test._id}`}
                >
                  Aplicar ahora
                </a>
                <button
                  type="button"
                  className="btn btn-soft"
                  onClick={() => createPublicLink(test._id)}
                  disabled={Boolean(linkLoadingByTest[test._id])}
                >
                  {linkLoadingByTest[test._id]
                    ? "Generando..."
                    : "Generar link paciente"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h3>Sesiones por enlace</h3>
        {sessions.length === 0 ? (
          <p style={{ marginTop: "10px", color: "#4b5563" }}>
            Aún no hay enlaces creados para este paciente.
          </p>
        ) : (
          <div className="grid" style={{ marginTop: "12px" }}>
            {sessions.map((session) => {
              const testName =
                typeof session.testId === "string"
                  ? "Prueba"
                  : session.testId.name;

              return (
                <article
                  key={session.id}
                  className="kpi"
                  style={{ background: "#fff" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <strong>{testName}</strong>
                    <span className={sessionStatusBadge(session.status)}>
                      {sessionStatusText(session.status)}
                    </span>
                  </div>

                  <p style={{ marginTop: "6px", color: "#374151" }}>
                    Expira: {asDate(session.expiresAt)}
                  </p>

                  <div className="actions" style={{ marginTop: "8px" }}>
                    <a
                      className="btn btn-soft"
                      href={session.publicUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Abrir link
                    </a>
                    <button
                      type="button"
                      className="btn btn-soft"
                      onClick={() => copySessionLink(session)}
                    >
                      Copiar link
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="panel">
        <h3>Resultados registrados</h3>
        {results.length === 0 ? (
          <p style={{ marginTop: "12px" }}>
            Todavía no hay resultados para este paciente.
          </p>
        ) : (
          <div className="grid" style={{ marginTop: "12px" }}>
            {results.map((result) => {
              const testName =
                typeof result.testId === "string"
                  ? "Prueba"
                  : result.testId.name;

              return (
                <article
                  key={result._id}
                  className="kpi"
                  style={{ background: "#fff" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <strong>{testName}</strong>
                    <span
                      className={interpretationClass(
                        result.interpretationLabel,
                      )}
                    >
                      {result.interpretationLabel}
                    </span>
                  </div>

                  <p style={{ marginTop: "6px", color: "#374151" }}>
                    Puntaje: {result.totalScore} | Fecha:{" "}
                    {asDate(result.evaluatedAt)}
                  </p>
                  <p style={{ marginTop: "4px", color: "#374151" }}>
                    {result.interpretationDescription}
                  </p>

                  <div className="grid grid-2" style={{ marginTop: "8px" }}>
                    <label>
                      <span className="label">Observaciones</span>
                      <textarea
                        className="textarea"
                        value={edits[result._id]?.observations ?? ""}
                        onChange={(event) =>
                          setEdits((current) => ({
                            ...current,
                            [result._id]: {
                              ...current[result._id],
                              observations: event.target.value,
                              finalConclusion:
                                current[result._id]?.finalConclusion ?? "",
                              recommendation:
                                current[result._id]?.recommendation ?? "",
                            },
                          }))
                        }
                      />
                    </label>

                    <label>
                      <span className="label">Conclusión final</span>
                      <textarea
                        className="textarea"
                        value={edits[result._id]?.finalConclusion ?? ""}
                        onChange={(event) =>
                          setEdits((current) => ({
                            ...current,
                            [result._id]: {
                              ...current[result._id],
                              observations:
                                current[result._id]?.observations ?? "",
                              finalConclusion: event.target.value,
                              recommendation:
                                current[result._id]?.recommendation ?? "",
                            },
                          }))
                        }
                      />
                    </label>
                  </div>

                  <div className="actions" style={{ marginTop: "8px" }}>
                    <select
                      className="select"
                      style={{ maxWidth: "320px" }}
                      value={edits[result._id]?.recommendation ?? ""}
                      onChange={(event) =>
                        setEdits((current) => ({
                          ...current,
                          [result._id]: {
                            ...current[result._id],
                            observations:
                              current[result._id]?.observations ?? "",
                            finalConclusion:
                              current[result._id]?.finalConclusion ?? "",
                            recommendation: event.target
                              .value as ResultEdit["recommendation"],
                          },
                        }))
                      }
                    >
                      <option value="">Sin recomendación</option>
                      <option value="APTO">Apto</option>
                      <option value="NO_APTO">No apto</option>
                      <option value="APTO_CON_OBSERVACIONES">
                        Apto con observaciones
                      </option>
                    </select>
                    <button
                      type="button"
                      className="btn btn-soft"
                      onClick={() => onSaveNotes(result._id)}
                    >
                      Guardar observaciones
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
