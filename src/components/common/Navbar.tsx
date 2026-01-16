import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { status, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex items-center justify-between fixed top-0">
      {/* Left */}
      <Link to="/" className="text-sm font-semibold text-zinc-100">
        Simple Todo
      </Link>

      {/* Right */}
      <div className="flex items-center gap-4 text-sm">
        {status === "loading" && (
          <span className="text-zinc-500">Checking session…</span>
        )}

        {status === "unauthenticated" && (
          <button
            onClick={() => navigate("/login")}
            className="text-zinc-400 hover:text-zinc-100 transition"
          >
            Login
          </button>
        )}

        {status === "authenticated" && (
          <>
            <span className="text-zinc-500">@{user.username}</span>

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="text-zinc-400 hover:text-red-400 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
