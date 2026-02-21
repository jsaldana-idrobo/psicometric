import { apiFetch } from "../lib/api";

interface LogoutButtonProps {
  readonly compact?: boolean;
}

export function LogoutButton({ compact = false }: LogoutButtonProps) {
  const onLogout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } finally {
      const browserWindow = globalThis.window;
      if (browserWindow) {
        browserWindow.location.href = "/login";
      }
    }
  };

  return (
    <button
      type="button"
      className={`btn btn-soft${compact ? " btn-compact" : ""}`}
      onClick={onLogout}
    >
      Cerrar sesión
    </button>
  );
}
