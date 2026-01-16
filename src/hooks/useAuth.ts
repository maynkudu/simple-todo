import { useState } from "react";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";

type AuthStatus = "loading" | "unauthenticated" | "authenticated";

export function useAuth() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const user = useQuery(api.auth.getUserByToken, token ? { token } : "skip");

  const login = (t: string) => {
    localStorage.setItem("token", t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // No token
  if (!token) {
    return {
      status: "unauthenticated" as const,
      user: null,
      login,
      logout,
    };
  }

  // Token exists, query still running
  if (user === undefined) {
    return {
      status: "loading" as const,
      user: null,
      login,
      logout,
    };
  }

  // Token checked, invalid
  if (user === null) {
    return {
      status: "unauthenticated" as const,
      user: null,
      login,
      logout,
    };
  }

  // Valid session
  return {
    status: "authenticated" as const,
    user,
    login,
    logout,
    token,
  };
}
