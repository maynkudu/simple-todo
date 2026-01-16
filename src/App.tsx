import { useState } from "react";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import Login from "./components/auth/Login";
import Todos from "./components/common/Todos";
import "./index.css";

export default function App() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const user = useQuery(api.auth.getUserByToken, token ? { token } : "skip");

  // Loading and checking for session
  if (user === undefined) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-500 flex items-center justify-center">
        Checking session...
      </div>
    );
  }

  // Not logged in
  if (user === null) {
    return (
      <Login
        onAuth={(t) => {
          localStorage.setItem("token", t);
          setToken(t);
        }}
      />
    );
  }

  // Logged in
  return (
    <div className="flex justify-center items-center bg-zinc-950 text-zinc-100">
      <Todos />
    </div>
  );
}
