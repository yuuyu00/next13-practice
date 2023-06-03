export type User = {
  id: number;
  name: string;
};

export type Todo = {
  id: number;
  title: string;
  description: string | null;
  author: User;
};
