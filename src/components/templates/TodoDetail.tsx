import { Todo } from "@/types";

export type Props = {
  todo: Todo;
};

export const TodoDetail = ({ todo }: Props) => {
  return (
    <main className="pt-20 px-48">
      <div className="py-20 px-28 bg-gray-800 rounded-lg">
        <p className="text-4xl font-bold pb-6">詳細ページ</p>
        <div className="flex flex-col">
          <div className="text-2xl font-bold">title: {todo.title}</div>
          <div className="text-lg font-bold">
            description: {todo.description}
          </div>
          <div className="text-lg font-bold">author: {todo.author.name}</div>
        </div>
      </div>
    </main>
  );
};
