"use server";

import { PrismaClient } from "@prisma/client";

const DEMO_USER_ID = "647cd41fbc56a07d380d5333";

export const getTodos = async () => {
  const client = new PrismaClient();

  const user = await client.user.findUnique({
    where: { id: DEMO_USER_ID },
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  const todos = await client.todo.findMany({
    where: { authorId: DEMO_USER_ID },
    include: { author: true },
  });

  client.$disconnect();

  return todos;
};

export const getTodo = async (id: string) => {
  const client = new PrismaClient();

  const user = await client.user.findUnique({
    where: { id: DEMO_USER_ID },
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  const todo = await client.todo.findUnique({
    where: { id },
    include: { author: true },
  });

  if (todo?.authorId !== DEMO_USER_ID) {
    return {
      error: "Todo not found",
    };
  }

  client.$disconnect();

  return todo;
};

export const addTodo = async (params: {
  title: string;
  description: string | null;
}) => {
  const client = new PrismaClient();

  const user = await client.user.findUnique({
    where: { id: DEMO_USER_ID },
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  const newTodo = await client.todo.create({
    data: {
      authorId: DEMO_USER_ID,
      title: params.title,
      description: params.description,
    },
  });

  client.$disconnect();

  return newTodo;
};

export const deleteTodo = async (todoId: string) => {
  const client = new PrismaClient();

  const user = await client.user.findUnique({
    where: { id: DEMO_USER_ID },
  });

  if (!user) {
    return { error: "User not found" };
  }

  await client.user.update({
    data: { todos: { delete: { id: todoId } } },
    where: { id: DEMO_USER_ID },
  });

  client.$disconnect();

  return true;
};
