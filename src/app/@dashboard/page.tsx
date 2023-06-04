// "use client";

import { Todo } from "@/types";
import { TodoPage, Props } from "@/components/templates/TodoPage";
import { getPosts, addPost, deletePost } from "./action";
import { use } from "react";
import { revalidatePath } from "next/cache";

const getTodoList = async () => {
  const todoList = await getPosts();

  if ("error" in todoList) {
    throw new Error(todoList.error);
  }

  return todoList;
};

export const Page = () => {
  const todoList = use(getTodoList());

  const onAddTodo = async (todo: Pick<Todo, "title" | "description">) => {
    "use server";

    await addPost(todo);
    revalidatePath("/");
  };

  const onDeleteTodo = async (todoId: number) => {
    "use server";

    await deletePost(todoId);
    revalidatePath("/");
  };

  const props: Props = {
    todoList,
    onAddTodo: onAddTodo,
    onDeleteTodo: onDeleteTodo,
  };

  return <TodoPage {...props} />;
};

export default Page;
