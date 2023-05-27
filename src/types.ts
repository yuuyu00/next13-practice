export type User = {
  id: number;
  name: string;
  todos: Todo[];
};

export type Todo = {
  id: number;
  title: string;
  description: string;
  author: User;
};
