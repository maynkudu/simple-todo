import "./index.css";

import Todos from "./components/common/Todos";

export function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen font-medium space-y-10">
      <div className="flex items-end space-x-1">
        <h1 className="text-3xl ">Todo App</h1>
        <span>(with Convex)</span>
      </div>
      <Todos />
    </div>
  );
}

export default App;
