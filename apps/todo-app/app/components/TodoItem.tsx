import { TodoItemTypes } from "./types";
import { useFetcher } from "@remix-run/react";
import { formatDistanceToNow } from "date-fns";

const TodoItem: React.FC<TodoItemTypes> = ({ task }) => {
  const fetcher = useFetcher();

  const statusBtnClass = task.completed
    ? "bg-emerald-400 hover:bg-emerald-500"
    : "bg-yellow-500 text-amber-900 hover:bg-amber-400";

  const handleStatus = (id: number, completed: boolean) => {
    fetcher.submit(
      { _action: "status", id, completed },
      { method: "post", encType: "multipart/form-data" }
    );
  };

  const handleDelete = (id: number) => {
    fetcher.submit(
      { _action: "delete", id },
      { method: "post", encType: "multipart/form-data" }
    );
  }; 

  return (
    <div className="todo-item flex justify-between p-10 bg-white m-2 items-start bg-">
      <div className={`todo-item-heading self-start flex flex-col`}>
        <div className={`todo-item-text text-xl ${task.completed && "line-through"}`}>
          {task.text}
        </div>
        <div className="todo-item-createdAt text-[11px]">
          {formatDistanceToNow(task.createdAt, { addSuffix: true })}
        </div>
      </div>
      <div className="todo-item-action self-end flex gap-3 items-center ">
        <input
          type="button"
          className="todo-delete text-xs cursor-pointer hover:underline"
          value={"Delete"}
          onClick={() => handleDelete(task.id)}
        />
        <input
          type="button"
          className={
            "todo-status rounded-3xl p-4 cursor-pointer " + statusBtnClass
          }
          onClick={() => handleStatus(task.id, task.completed)}
          value={task.completed ? "Completed" : "Pending"}
        />
         {/* <input
          type="button"
          className="todo-edit text-xs cursor-pointer hover:underline"
          value={"Edit"}
        /> */}
      </div>
    </div>
  );
};

export default TodoItem;
