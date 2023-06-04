"use server";

import { PrismaClient } from "@prisma/client";

export const getPosts = async () => {
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

export const addPost = async (params: {
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

export const deletePost = async (todoId: number) => {
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
