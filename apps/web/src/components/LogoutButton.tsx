import { apiFetch } from '../lib/api';

export function LogoutButton() {
  const onLogout = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } finally {
      window.location.href = '/login';
    }
  };

  return (
    <button type="button" className="btn btn-soft" onClick={onLogout}>
      Cerrar sesión
    </button>
  );
}
