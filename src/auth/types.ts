import { Roles } from './constants';

export type TokenPayload = {
  userId: number;
  username: string;
  role: Roles;
  exp: number;
  iat: number;
};
