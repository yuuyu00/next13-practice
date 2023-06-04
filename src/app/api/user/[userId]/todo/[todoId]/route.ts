import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

type Params = {
  params: {
    userId: string;
    todoId: string;
  };
};

export const DELETE = async (request: Request, { params }: Params) => {
  const userId = params.userId;
  const todoId = params.todoId;
  const client = new PrismaClient();

  const user = await client.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await client.user.update({
    data: { todos: { delete: { id: todoId } } },
    where: { id: userId },
  });

  return NextResponse.json(true);
};
