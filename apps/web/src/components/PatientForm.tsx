import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import type { Patient } from "../lib/types";

interface PatientFormProps {
  readonly mode: "create" | "edit";
  readonly patientId?: string;
}

interface PatientPayload {
  fullName: string;
  documentId: string;
  dateOfBirth: string;
  phone?: string;
  email?: string;
  company?: string;
  position?: string;
  evaluationDate: string;
}

const emptyPayload: PatientPayload = {
  fullName: "",
  documentId: "",
  dateOfBirth: "",
  phone: "",
  email: "",
  company: "",
  position: "",
  evaluationDate: "",
};

function toInputDate(value: string) {
  return new Date(value).toISOString().slice(0, 10);
}

function getSaveLabel(mode: PatientFormProps["mode"], isSaving: boolean) {
  if (isSaving) {
    return "Guardando...";
  }

  if (mode === "create") {
    return "Crear paciente";
  }

  return "Guardar cambios";
}

export function PatientForm({ mode, patientId }: PatientFormProps) {
  const [payload, setPayload] = useState<PatientPayload>(emptyPayload);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (mode !== "edit" || !patientId) {
      return;
    }

    const loadPatient = async () => {
      setIsLoading(true);
      setError("");
      try {
        const patient = await apiFetch<Patient>(`/patients/${patientId}`);
        setPayload({
          fullName: patient.fullName,
          documentId: patient.documentId,
          dateOfBirth: toInputDate(patient.dateOfBirth),
          phone: patient.phone ?? "",
          email: patient.email ?? "",
          company: patient.company ?? "",
          position: patient.position ?? "",
          evaluationDate: toInputDate(patient.evaluationDate),
        });
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "No se pudo cargar el paciente",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadPatient();
  }, [mode, patientId]);

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      const requestBody = {
        ...payload,
        phone: payload.phone || undefined,
        email: payload.email || undefined,
        company: payload.company || undefined,
        position: payload.position || undefined,
      };

      if (mode === "create") {
        const created = await apiFetch<Patient>("/patients", {
          method: "POST",
          body: JSON.stringify(requestBody),
        });
        setSuccess("Paciente creado correctamente. Redirigiendo...");
        setTimeout(() => {
          const browserWindow = globalThis.window;
          if (browserWindow) {
            browserWindow.location.href = `/patients/${created.id}`;
          }
        }, 600);
      } else {
        await apiFetch<Patient>(`/patients/${patientId}`, {
          method: "PATCH",
          body: JSON.stringify(requestBody),
        });
        setSuccess("Paciente actualizado correctamente.");
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No se pudo guardar",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="panel">
      <h2>{mode === "create" ? "Registrar paciente" : "Editar paciente"}</h2>
      <p style={{ marginTop: "6px", color: "#4b5563" }}>
        Completa los campos mínimos para iniciar la evaluación psicotécnica.
      </p>

      {isLoading ? (
        <p style={{ marginTop: "14px" }}>Cargando datos...</p>
      ) : (
        <form
          className="grid"
          style={{ marginTop: "14px" }}
          onSubmit={onSubmit}
        >
          <div className="grid grid-2">
            <label>
              <span className="label">Nombre completo *</span>
              <input
                className="input"
                required
                value={payload.fullName}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    fullName: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              <span className="label">Documento *</span>
              <input
                className="input"
                required
                value={payload.documentId}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    documentId: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              <span className="label">Fecha de nacimiento *</span>
              <input
                className="input"
                type="date"
                required
                value={payload.dateOfBirth}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    dateOfBirth: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              <span className="label">Fecha de evaluación *</span>
              <input
                className="input"
                type="date"
                required
                value={payload.evaluationDate}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    evaluationDate: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              <span className="label">Teléfono</span>
              <input
                className="input"
                value={payload.phone}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    phone: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              <span className="label">Email</span>
              <input
                className="input"
                type="email"
                value={payload.email}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              <span className="label">Empresa</span>
              <input
                className="input"
                value={payload.company}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    company: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              <span className="label">Cargo</span>
              <input
                className="input"
                value={payload.position}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    position: event.target.value,
                  }))
                }
              />
            </label>
          </div>

          <div className="actions">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSaving}
            >
              {getSaveLabel(mode, isSaving)}
            </button>
            <a
              className="btn btn-soft"
              href={
                mode === "edit" && patientId ? `/patients/${patientId}` : "/"
              }
            >
              Cancelar
            </a>
          </div>
        </form>
      )}

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </section>
  );
}
