import { useState } from 'react';
import type { FormEvent } from 'react';
import { apiFetch } from '../lib/api';

type Mode = 'login' | 'register';

export function LoginForm() {
  const [mode, setMode] = useState<Mode>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signatureName, setSignatureName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await apiFetch('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
      } else {
        await apiFetch('/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            fullName,
            email,
            password,
            signatureName: signatureName || undefined,
            licenseNumber: licenseNumber || undefined,
          }),
        });
      }

      window.location.href = '/';
    } catch (submitError) {
      if (submitError instanceof Error) {
        setError(submitError.message);
      } else {
        setError('No fue posible iniciar sesión');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-shell">
      <article className="panel auth-card">
        <h1>{mode === 'login' ? 'Ingreso de psicólogo' : 'Crear usuario inicial'}</h1>
        <p style={{ color: '#4b5563', margin: '8px 0 16px' }}>
          Centraliza pacientes, pruebas y reportes psicotécnicos.
        </p>

        <form className="grid" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label>
              <span className="label">Nombre completo</span>
              <input
                className="input"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </label>
          )}

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

          {mode === 'register' && (
            <>
              <label>
                <span className="label">Firma profesional (opcional)</span>
                <input
                  className="input"
                  value={signatureName}
                  onChange={(event) => setSignatureName(event.target.value)}
                />
              </label>

              <label>
                <span className="label">Registro profesional (opcional)</span>
                <input
                  className="input"
                  value={licenseNumber}
                  onChange={(event) => setLicenseNumber(event.target.value)}
                />
              </label>
            </>
          )}

          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            {isLoading
              ? 'Procesando...'
              : mode === 'login'
                ? 'Entrar al sistema'
                : 'Crear cuenta'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        <div style={{ marginTop: '14px' }}>
          {mode === 'login' ? (
            <button className="btn btn-link" type="button" onClick={() => setMode('register')}>
              Crear usuario inicial
            </button>
          ) : (
            <button className="btn btn-link" type="button" onClick={() => setMode('login')}>
              Ya tengo cuenta
            </button>
          )}
        </div>
      </article>
    </section>
  );
}
