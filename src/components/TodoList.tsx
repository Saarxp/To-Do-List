import TodoModel from "../model/todoModel";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: TodoModel[];
  setEdit: (index: number) => void;
  removeTodo: (id: string) => void;
}

const TodoList = ({ todos , setEdit ,removeTodo}: TodoListProps) => {
  return (
    <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            setEdit={setEdit}
            removeTodo={removeTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
