"use client";

import { TrashIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

type Props = {
  todoId: number;
};
export const DeleteTodo = ({ todoId }: Props) => {
  const router = useRouter();

  const deleteTodo = async () => {
    await fetch(`http://localhost:3000/api/user/1/todo/${todoId}`, {
      method: "DELETE",
    });

    router.refresh();
  };

  return (
    <button
      onClick={deleteTodo}
      className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-400"
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  );
};
