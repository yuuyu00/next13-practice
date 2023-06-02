// "use client";

import { Todo } from "@/types";
import { TodoPage, Props } from "@/components/templates/TodoPage";
import { addPost, deletePost } from "./action";
import { use } from "react";
import { revalidatePath } from "next/cache";

const getTodoList = async () => {
  const res = await fetch("http://localhost:3000/api/user/1/todo", {
    cache: "no-store",
  });
  return res.json();
};

export const Page = () => {
  const todoList = use(getTodoList());

  const onAddTodo = async (todo: Pick<Todo, "title" | "description">) => {
    "use server";

    await addPost(todo);
    revalidatePath("/user/1/todo");
  };

  const onDeleteTodo = async (todoId: number) => {
    "use server";

    await deletePost(todoId);
    revalidatePath("/user/1/todo");
  };

  const props: Props = {
    todoList,
    onAddTodo: onAddTodo,
    onDeleteTodo: onDeleteTodo,
  };

  return <TodoPage {...props} />;
};

export default Page;
