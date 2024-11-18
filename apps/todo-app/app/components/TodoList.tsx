import TodoItem from "./TodoItem";
import { TodoEachItem } from "./types";

type TodoListProps = {
    tasks: Array<TodoEachItem>
}

const TodoList:React.FC<TodoListProps> = ({ tasks }) => {
  

  return (
    <div className="flex flex-col bg-gray-400 my-3">
      {tasks?.map((t: TodoEachItem) => (
        <TodoItem task={t} key={t.id} />
      ))}
    </div>
  );
};

export default TodoList;
