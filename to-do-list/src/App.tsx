import { useEffect, useState } from "react";
import "./App.css";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import TodoModel from "./model/todoModel";
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo})));
    })

    return () => unsubscribe();
  }, []);

  const setEdit = (index: number) => {
    setInput(todos[index].todo);
    setEditIndex(index);
  };

  const addTodo = async () => {
    try {
      if (input.trim() !== "") {
        await addDoc(collection(db,'todos'), {todo: input});
        setInput("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async () => {
    try {
      if (input.trim() !== "") {
        const todoDocRef = doc(db,'todos', todos[editIndex].id);
        await updateDoc(todoDocRef, {todo: input});
        setEditIndex(-1);
        setInput("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeTodo = async (id: string) => {
  try{
    if (editIndex === -1) {
      await deleteDoc(doc(db, 'todos', id));
    }
  }catch(error) {
    console.error(error)
  }
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

        {
        todos.length > 0 && <TodoList todos={todos} setEdit={setEdit} removeTodo={removeTodo}/>
        }
      </div>
    </>
  );
}

export default App;
