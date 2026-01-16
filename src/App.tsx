import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Todos from "./components/common/Todos";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/common/Navbar";
import "./index.css";
import { Console, Effect } from "effect";

export default function App() {
  const { status, login } = useAuth();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-500 flex items-center justify-center">
        Checking session...
      </div>
    );
  }

  const consoleProgram = Console.log("Status:", status);
  Effect.runSync(consoleProgram);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex justify-center items-center">
      <Navbar />

      <Routes>
        <Route
          path="/login"
          element={
            status === "authenticated" ? (
              <Navigate to="/" replace />
            ) : (
              <Login onAuth={login} />
            )
          }
        />

        <Route
          path="/"
          element={
            status === "authenticated" ? (
              <Todos />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}
