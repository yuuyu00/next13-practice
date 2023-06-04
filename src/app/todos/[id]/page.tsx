import { Todo } from "@/types";
import { TodoDetail, Props } from "@/components/templates/TodoDetail";
import { getTodo as getTodoAction } from "@/app/action";
import { use } from "react";
import { revalidatePath } from "next/cache";

const getTodo = async (id: number) => {
  const todo = await getTodoAction(id);

  if ("error" in todo) {
    throw new Error(todo.error);
  }

  return todo;
};

type Params = {
  params: {
    id: string;
  };
};

export const Page = ({ params }: Params) => {
  const todo = use(getTodo(parseInt(params.id)));

  const props: Props = {
    todo,
  };

  return <TodoDetail {...props} />;
};

export default Page;
