import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { authenticated, loading, login } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !authenticated) {
      const hasAuthParams =
        location.hash.includes("code=") ||
        location.hash.includes("error=") ||
        location.search.includes("code=") ||
        location.search.includes("error=");
      if (!hasAuthParams) {
        login();
      }
    }
  }, [loading, authenticated, login, location.hash, location.search]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-2">
          <p>Processing Login...</p>
          <button className="btn btn-sm" onClick={login}>
            Re-Try Login
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
