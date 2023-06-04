"use client";

import { Todo } from "@/types";
import { AddTodo } from "../organisms";
import { DeleteTodo } from "../molecules";
import Link from "next/link";

export type Props = {
  todoList: Todo[] | undefined;
  onAddTodo: (todo: Pick<Todo, "title" | "description">) => Promise<any>;
  onDeleteTodo: (todoId: number) => void;
};
export const TodoPage = ({ todoList, onAddTodo, onDeleteTodo }: Props) => {
  return (
    <main className="pt-20 px-48">
      <div className="py-20 px-28 bg-gray-800 rounded-lg">
        <div className="pb-6">
          <AddTodo onAddTodo={onAddTodo} />
        </div>
        {todoList &&
          todoList.map((todo) => (
            <Link href={`/todos/${todo.id}`} key={todo.id}>
              <div className="flex flex-row justify-between items-center mt-2 rounded-md pt-1 pb-1.5 px-4 hover:bg-gray-900">
                <div className="flex flex-col">
                  <div className="text-2xl font-bold">- {todo.title}</div>
                </div>
                <DeleteTodo onDeleteTodo={() => onDeleteTodo(todo.id)} />
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
};
