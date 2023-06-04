import { Todo } from "@/types";

export type Props = {
  todo: Todo;
};

export const TodoDetailModal = ({ todo }: Props) => {
  return (
    <div className="py-20 px-28 bg-gray-800 rounded-lg">
      <p className="text-2xl font-bold pb-6">
        URL追従・URLから開いた場合は詳細ページを表示する　モーダル
      </p>
      <div className="flex flex-col">
        <div className="text-2xl font-bold">title: {todo.title}</div>
        <div className="text-lg font-bold">description: {todo.description}</div>
        <div className="text-lg font-bold">author: {todo.author.name}</div>
      </div>
    </div>
  );
};
