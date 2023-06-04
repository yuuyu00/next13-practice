import { TodoDetailModal, Props } from "@/components/templates/TodoDetailModal";
import { Modal } from "@/components/organisms/Modal";
import { getTodo as getTodoAction } from "@/app/action";
import { use } from "react";

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

  return (
    <Modal>
      <TodoDetailModal {...props} />
    </Modal>
  );
};

export default Page;
