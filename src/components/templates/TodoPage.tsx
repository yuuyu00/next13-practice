"use client";

import { Todo } from "@/types";
import { AddTodo } from "../organisms";
import { DeleteTodo } from "../molecules";

export type Props = {
  todoList: Todo[] | undefined;
  onAddTodo: (todo: Pick<Todo, "title" | "description">) => Promise<any>;
  onDeleteTodo: (todoId: number) => void;
};
export const TodoPage = ({ todoList, onAddTodo, onDeleteTodo }: Props) => {
  return (
    <main className="pt-20 px-48">
      <div className="py-20 px-28 bg-gray-800 rounded-lg">
        <AddTodo onAddTodo={onAddTodo} />
        {todoList &&
          todoList.map((todo) => (
            <div className="flex flex-row justify-between mt-4" key={todo.id}>
              <div className="flex flex-col">
                <div className="text-2xl font-bold">- {todo.title}</div>
              </div>
              <DeleteTodo onDeleteTodo={() => onDeleteTodo(todo.id)} />
            </div>
          ))}
      </div>
    </main>
  );
};
