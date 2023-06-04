export type User = {
  id: string;
  name: string;
};

export type Todo = {
  id: string;
  title: string;
  description: string | null;
  author: User;
};
