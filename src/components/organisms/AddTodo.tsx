"use client";

import React from "react";
import { Todo } from "@/types";
import { useRouter } from "next/navigation";

export const AddTodo = () => {
  const [newTodo, setNewTodo] = React.useState<
    Pick<Todo, "title" | "description">
  >({
    title: "",
    description: "",
  });

  const router = useRouter();

  const onAddTodo = async (todo: Pick<Todo, "title" | "description">) => {
    const res = await fetch("http://localhost:3000/api/user/1/todo", {
      method: "POST",
      body: JSON.stringify(todo),
    });

    setNewTodo({ title: "", description: "" });
    router.refresh();
    return res.json();
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
        onClick={() => onAddTodo(newTodo)}
      >
        追加
      </button>
    </div>
  );
};
