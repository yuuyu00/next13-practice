import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

type Todo = {
  title: string;
};

type TodoParams = {
  params: {
    userId: string;
  };
};

export const GET = async (request: Request, { params }: TodoParams) => {
  const userId = parseInt(params.userId);
  const client = new PrismaClient();

  const user = await client.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const todos = await client.todo.findMany({ where: { authorId: userId } });

  return NextResponse.json(todos);
};

export const POST = async (request: Request, { params }: TodoParams) => {
  const userId = parseInt(params.userId);
  const client = new PrismaClient();

  const body = await request.json();
  console.log("body: ", body);

  const user = await client.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const newTodo = await client.todo.create({
    data: {
      authorId: userId,
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newTodo);
};
