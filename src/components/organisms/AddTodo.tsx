"use client";

import React from "react";
import { Todo } from "@/types";

type Props = {
  onAddTodo: (todo: Pick<Todo, "title" | "description">) => Promise<any>;
};
export const AddTodo = ({ onAddTodo }: Props) => {
  const [newTodo, setNewTodo] = React.useState<
    Pick<Todo, "title" | "description">
  >({
    title: "",
    description: "",
  });

  const onPressAddTodo = async (todo: Pick<Todo, "title" | "description">) => {
    await onAddTodo(todo);
    setNewTodo({ title: "", description: "" });
    return;
  };

  return (
    <div className="flex flex-row justify-between">
      <input
        className="w-full mr-4 h-10 rounded-lg text-black pl-2"
        placeholder="タスクを入力..."
        value={newTodo.title}
        onChange={(e) => setNewTodo((p) => ({ ...p, title: e.target.value }))}
      />
      <button
        className="w-20 h-10 rounded-lg bg-green-600 px-4 py-2"
        onClick={() => onPressAddTodo(newTodo)}
      >
        追加
      </button>
    </div>
  );
};
