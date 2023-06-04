"use client";

import { TrashIcon } from "@heroicons/react/20/solid";

type Props = {
  onDeleteTodo: () => void;
};
export const DeleteTodo = ({ onDeleteTodo }: Props) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onDeleteTodo();
      }}
      className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-400"
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  );
};
