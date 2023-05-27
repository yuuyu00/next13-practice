import { use } from "react";
import { Todo } from "@/types";
import { AddTodo } from "@/components/organisms";
import { DeleteTodo } from "@/components/molecules";

export const dynamic = "force-dynamic";

const getTodoList = async () => {
  const res = await fetch("http://localhost:3000/api/user/1/todo");
  return res.json();
};

export const Page = () => {
  const todoList: Todo[] = use(getTodoList());

  return (
    <main className="pt-20 px-48">
      <div className="py-20 px-28 bg-gray-800 rounded-lg">
        <AddTodo />
        {todoList.map((todo) => (
          <div className="flex flex-row justify-between mt-4" key={todo.id}>
            <div className="flex flex-col">
              <div className="text-2xl font-bold">- {todo.title}</div>
            </div>
            <DeleteTodo todoId={todo.id} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Page;
