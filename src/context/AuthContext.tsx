import Keycloak from "keycloak-js";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type AuthContextValue = {
  keycloak: any | null;
  authenticated: boolean;
  loading: boolean;
  token: string | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [keycloak] = useState(() => {
    const url = import.meta.env.VITE_KEYCLOAK_URL;
    const realm = import.meta.env.VITE_KEYCLOAK_REALM;
    const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;

    if (!url || !realm || !clientId) {
      console.error(
        "Keycloak configuration missing. Please set VITE_KEYCLOAK_URL, VITE_KEYCLOAK_REALM, and VITE_KEYCLOAK_CLIENT_ID.",
      );
      return null;
    }

    return new Keycloak({
      url,
      realm,
      clientId,
    });
  });

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const initRef = useRef(false);

  useEffect(() => {
    if (!keycloak) {
      setLoading(false);
      return;
    }

    if (initRef.current) return;
    initRef.current = true;

    keycloak
      .init({
        pkceMethod: "S256",
        checkLoginIframe: false,
      })
      .then((auth: boolean) => {
        setAuthenticated(auth);
        const newToken = keycloak.token ?? null;
        setToken(newToken);
        if (newToken) {
          localStorage.setItem("token", newToken);
        }
        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error("Keycloak initialization failed:", err);
        setLoading(false);
      });

    keycloak.onTokenExpired = () => {
      keycloak
        .updateToken(30)
        .then((refreshed: boolean) => {
          if (refreshed) {
            const newToken = keycloak.token ?? null;
            setToken(newToken);
            if (newToken) {
              localStorage.setItem("token", newToken);
            }
          }
        })
        .catch(() => {
          console.error("Failed to refresh token, logging out");
          localStorage.removeItem("token");
          keycloak.logout();
        });
    };
  }, [keycloak]);

  const login = () => {
    if (!keycloak) {
      console.error("Keycloak not configured, cannot login");
      return;
    }
    keycloak.login().catch((err: unknown) => {
      console.error("Keycloak login failed:", err);
    });
  };

  const logout = () => {
    if (!keycloak) {
      console.error("Keycloak not configured, cannot logout");
      return;
    }
    localStorage.removeItem("token");
    keycloak.logout().catch((err: unknown) => {
      console.error("Keycloak logout failed:", err);
    });
  };

  const value: AuthContextValue = useMemo(
    () => ({
      keycloak,
      authenticated,
      loading,
      token,
      login,
      logout,
    }),
    [keycloak, authenticated, loading, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
