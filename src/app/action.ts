"use server";

import { PrismaClient } from "@prisma/client";

export const getTodos = async () => {
  const userId = 1;
  const client = new PrismaClient();

  const user = await client.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  const todos = await client.todo.findMany({
    where: { authorId: userId },
    include: { author: true },
  });

  return todos;
};

export const getTodo = async (id: number) => {
  const userId = 1;
  const client = new PrismaClient();

  const user = await client.user.findUnique({
    where: { id: userId },
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

  if (todo?.authorId !== userId) {
    return {
      error: "Todo not found",
    };
  }

  return todo;
};

export const addTodo = async (params: {
  title: string;
  description: string | null;
}) => {
  const userId = 1;
  const client = new PrismaClient();

  const user = await client.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  const newTodo = await client.todo.create({
    data: {
      authorId: userId,
      title: params.title,
      description: params.description,
    },
  });

  return newTodo;
};

export const deleteTodo = async (todoId: number) => {
  const userId = 1;
  const client = new PrismaClient();

  const user = await client.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return { error: "User not found" };
  }

  await client.user.update({
    data: { todos: { delete: { id: todoId } } },
    where: { id: userId },
  });

  return true;
};
