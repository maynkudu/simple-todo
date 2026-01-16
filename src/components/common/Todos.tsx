import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { useState } from "react";

export interface Todo {
  _id: Id<"todos">;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Todos() {
  const todos = useQuery(api.todos.list);
  const add = useMutation(api.todos.add);
  const toggle = useMutation(api.todos.toggle);

  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loading = todos === undefined;

  const token = localStorage.getItem("token");

  if (!token) return <p>Not authenticated</p>;

  return (
    <div className="min-h-screen  flex justify-center p-4">
      <div className="w-full h-max bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Simple Todo</h1>
          <span className="text-xs text-zinc-500">
            {todos?.length ?? 0} tasks
          </span>
        </div>

        {/* Input */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!text.trim()) return;

            setSubmitting(true);
            await add({ token, text });
            setText("");
            setSubmitting(false);
          }}
          className="flex gap-2"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm outline-none focus:border-zinc-500"
          />
          <button
            disabled={!text.trim() || submitting}
            className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 transition"
          >
            {submitting ? "..." : "Add"}
          </button>
        </form>

        {/* List */}
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {loading && <p className="text-sm text-zinc-500">Loading todos...</p>}

          {!loading && todos.length === 0 && (
            <p className="text-sm text-zinc-500">No tasks yet. Add one.</p>
          )}

          {todos?.map((todo) => (
            <div
              key={todo._id}
              className="flex items-center gap-3 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 hover:border-zinc-600 transition"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  toggle({ id: todo._id, completed: !todo.completed })
                }
                className="size-4 accent-white cursor-pointer"
              />

              <span
                className={`text-sm wrap-break-words ${
                  todo.completed
                    ? "line-through text-zinc-500"
                    : "text-zinc-100"
                }`}
              >
                {todo.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
