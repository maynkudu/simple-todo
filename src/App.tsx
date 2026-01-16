import "./index.css";

import Todos from "./components/common/Todos";

export function App() {
  return (
    <div className="flex justify-center h-screen font-medium space-y-10 bg-zinc-950 text-zinc-100">
      <Todos />
    </div>
  );
}

export default App;
