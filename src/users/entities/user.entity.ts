import { Roles } from '../../auth/constants';

export class UserEntity {
  id: number;
  username: string;
  password: string;
  role: Roles;

  constructor(id: number, username: string, password: string, role: Roles) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
