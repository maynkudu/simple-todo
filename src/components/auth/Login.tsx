import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useState } from "react";

export default function Login({ onAuth }: { onAuth: (t: string) => void }) {
  const login = useMutation(api.auth.login);
  const signup = useMutation(api.auth.signup);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "login") {
        const res = await login({ username, password });
        onAuth(res.token);
      } else {
        await signup({ username, password });
        setMode("login");
      }
    } catch (e: any) {
      setError(e.message ?? "Something broke");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-xl font-semibold">
          {mode === "login" ? "Login" : "Create account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm outline-none focus:border-zinc-500"
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm outline-none focus:border-zinc-500"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-white text-black py-2 rounded-lg text-sm font-medium disabled:opacity-50"
          >
            {loading ? "..." : mode === "login" ? "Login" : "Sign up"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition"
        >
          {mode === "login"
            ? "No account? Create one"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
