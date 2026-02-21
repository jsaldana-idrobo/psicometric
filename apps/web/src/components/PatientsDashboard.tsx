import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../lib/api";
import type { Patient, Profile } from "../lib/types";

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

  const evaluationsThisMonth = useMemo(() => {
    const now = new Date();

    return patients.filter((patient) => {
      const date = new Date(patient.evaluationDate);
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }).length;
  }, [patients]);

  const activeCompanies = useMemo(() => {
    return new Set(patients.map((patient) => patient.company).filter(Boolean))
      .size;
  }, [patients]);

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
    <div className="grid dashboard-stack">
      <section className="panel dashboard-header">
        <div className="dashboard-header-content">
          <div>
            <h2>Panel de pacientes</h2>
            <p className="panel-muted">
              {profile ? `Psicólogo: ${profile.fullName}` : "Sesión activa"}
            </p>
          </div>
          <a className="btn btn-primary btn-compact" href="/patients/new">
            Registrar paciente
          </a>
        </div>
      </section>

      <section className="grid grid-3">
        <article className="kpi">
          <p className="kpi-label">Pacientes totales</p>
          <p className="kpi-value">{patients.length}</p>
        </article>
        <article className="kpi">
          <p className="kpi-label">Evaluaciones este mes</p>
          <p className="kpi-value">{evaluationsThisMonth}</p>
        </article>
        <article className="kpi">
          <p className="kpi-label">Empresas activas</p>
          <p className="kpi-value">{activeCompanies}</p>
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
                      <div className="actions actions-tight">
                        <a
                          className="btn btn-soft btn-compact"
                          href={`/patients/${patient.id}`}
                        >
                          Ver
                        </a>
                        <a
                          className="btn btn-soft btn-compact"
                          href={`/patients/${patient.id}/edit`}
                        >
                          Editar
                        </a>
                        <button
                          type="button"
                          className="btn btn-danger btn-compact"
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
          <p className="panel-muted search-empty">
            No hay pacientes que coincidan con la búsqueda.
          </p>
        )}

        {error && <p className="error">{error}</p>}
      </section>
    </div>
  );
}
