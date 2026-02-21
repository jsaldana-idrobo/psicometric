import { useState } from "react";
import { apiFetch } from "../lib/api";

function getSubmitLabel(isLoading: boolean): string {
  return isLoading ? "Ingresando..." : "Entrar al sistema";
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const browserWindow = globalThis.window;
      if (browserWindow) {
        browserWindow.location.href = "/";
      }
    } catch (submitError) {
      if (submitError instanceof Error) {
        setError(submitError.message);
      } else {
        setError("No fue posible iniciar sesión");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-shell">
      <article className="panel auth-card">
        <h1>Ingreso de psicólogo</h1>
        <p className="auth-subtitle">
          Tu usuario es creado por un administrador del consultorio.
        </p>

        <form className="grid" onSubmit={handleSubmit}>
          <label>
            <span className="label">Email</span>
            <input
              className="input"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label>
            <span className="label">Contraseña</span>
            <input
              className="input"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button
            className="btn btn-primary btn-full"
            type="submit"
            disabled={isLoading}
          >
            {getSubmitLabel(isLoading)}
          </button>
        </form>

        {error && <p className="error">{error}</p>}
      </article>
    </section>
  );
}
