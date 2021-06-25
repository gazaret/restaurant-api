export type SigninDTO = {
  userId: number;
  username: string;
  accessToken: string;
};

export type TokenPayload = {
  userId: number;
  username: string;
  exp: number;
  iat: number;
};
