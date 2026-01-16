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

  if (!todos) return null;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          add({ text });
          setText("");
        }}
      >
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button>Add</button>
      </form>

      {todos.map((todo: Todo) => (
        <div key={todo._id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() =>
              toggle({ id: todo._id, completed: !todo.completed })
            }
          />
          {todo.text}
        </div>
      ))}
    </div>
  );
}
