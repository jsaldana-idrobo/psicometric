import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../lib/api";
import type { Patient, Profile } from "../lib/types";
import { LogoutButton } from "./LogoutButton";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-CO");
}

export function PatientsDashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    setError("");

    try {
      const [patientsResponse, profileResponse] = await Promise.all([
        apiFetch<Patient[]>("/patients"),
        apiFetch<Profile>("/auth/me"),
      ]);

      setPatients(patientsResponse);
      setProfile(profileResponse);
    } catch (loadError) {
      if (loadError instanceof Error) {
        setError(loadError.message);
      } else {
        setError("No fue posible cargar los pacientes");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const filteredPatients = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) {
      return patients;
    }

    return patients.filter((patient) => {
      return (
        patient.fullName.toLowerCase().includes(normalized) ||
        patient.documentId.toLowerCase().includes(normalized) ||
        (patient.company ?? "").toLowerCase().includes(normalized)
      );
    });
  }, [patients, query]);

  const onDelete = async (patientId: string) => {
    const confirmed = globalThis.confirm(
      "¿Eliminar este paciente y su historial?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await apiFetch(`/patients/${patientId}`, { method: "DELETE" });
      setPatients((current) =>
        current.filter((patient) => patient.id !== patientId),
      );
    } catch (deleteError) {
      globalThis.alert(
        deleteError instanceof Error
          ? deleteError.message
          : "No se pudo eliminar",
      );
    }
  };

  return (
    <div className="grid" style={{ gap: "18px" }}>
      <section className="panel">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2>Panel de pacientes</h2>
            <p style={{ color: "#4b5563", marginTop: "6px" }}>
              {profile ? `Psicólogo: ${profile.fullName}` : "Sesión activa"}
            </p>
          </div>
          <div className="actions">
            <a className="btn btn-primary" href="/patients/new">
              Registrar paciente
            </a>
            <LogoutButton />
          </div>
        </div>
      </section>

      <section className="grid grid-3">
        <article className="kpi">
          <p className="kpi-label">Pacientes totales</p>
          <p className="kpi-value">{patients.length}</p>
        </article>
        <article className="kpi">
          <p className="kpi-label">Evaluaciones este mes</p>
          <p className="kpi-value">
            {
              patients.filter((patient) => {
                const date = new Date(patient.evaluationDate);
                const now = new Date();
                return (
                  date.getMonth() === now.getMonth() &&
                  date.getFullYear() === now.getFullYear()
                );
              }).length
            }
          </p>
        </article>
        <article className="kpi">
          <p className="kpi-label">Empresas activas</p>
          <p className="kpi-value">
            {
              new Set(
                patients.map((patient) => patient.company).filter(Boolean),
              ).size
            }
          </p>
        </article>
      </section>

      <section className="panel">
        <label>
          <span className="label">Buscar por nombre, documento o empresa</span>
          <input
            className="input"
            placeholder="Ej: Andrea, 10203040, Acme"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </section>

      <section className="panel">
        {isLoading ? (
          <p>Cargando pacientes...</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Documento</th>
                  <th>Empresa</th>
                  <th>Cargo</th>
                  <th>Fecha evaluación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.fullName}</td>
                    <td>{patient.documentId}</td>
                    <td>{patient.company ?? "N/A"}</td>
                    <td>{patient.position ?? "N/A"}</td>
                    <td>{formatDate(patient.evaluationDate)}</td>
                    <td>
                      <div className="actions">
                        <a
                          className="btn btn-soft"
                          href={`/patients/${patient.id}`}
                        >
                          Ver
                        </a>
                        <a
                          className="btn btn-soft"
                          href={`/patients/${patient.id}/edit`}
                        >
                          Editar
                        </a>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => onDelete(patient.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && filteredPatients.length === 0 && (
          <p style={{ marginTop: "10px", color: "#4b5563" }}>
            No hay pacientes que coincidan con la búsqueda.
          </p>
        )}

        {error && <p className="error">{error}</p>}
      </section>
    </div>
  );
}
