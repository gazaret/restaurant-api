export type UserDTO = {
  id: number;
  username: string;
};

export type User = UserDTO & {
  password: string;
};
