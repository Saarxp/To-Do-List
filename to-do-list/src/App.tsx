import { useState } from "react";
import "./App.css";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import TodoModel from "./model/todoModel";
import Task from "./components/Task";

function App() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const setEdit = (index: number) => {
    setInput(todos[index].todo);
    setEditIndex(index);
  };

  const addTodo = async () => {
    try {
      if (input.trim() !== "") {
        setTodos([...todos, { id: new Date(), todo: input }]);
        setInput("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async () => {
    try {
      if (input.trim() !== "") {
        const updatedTodos = [...todos];
        updatedTodos[editIndex].todo = input;
        setTodos(updatedTodos);
        setEditIndex(-1);
        setInput("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeTodo = async (id: Date) => {
    if (editIndex === -1) {
      let filteredTodos = todos.filter((todo) => todo.id !== id);
      return setTodos(filteredTodos);
    }
    return;
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center gap-4 justify-center p-4 bg-custom-background">
        <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
          <h1 className="text-3xl font-bold text-center mb-4">Todo App</h1>
          <div className="flex">
            <input
              type="text"
              placeholder="Add a todo"
              className="py-2 px-4 border rounded w-full focus:outline-none mr-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={editIndex === -1 ? addTodo : updateTodo}
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4"
            >
              {editIndex === -1 ? <FaPlus /> : <FaPencilAlt />}
            </button>
          </div>
        </div>

        {todos.length > 0 && (
          <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
            <ul>
              {todos.map((todo, index) => (
                <Task
                  todo={todo}
                  index={index}
                  setEdit={setEdit}
                  removeTodo={removeTodo}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
