import { Roles } from '../../auth/constants';

export class UserPublicDTO {
  id: number;
  username: string;
  role: Roles;

  constructor(id: number, username: string, role: Roles) {
    this.id = id;
    this.username = username;
    this.role = role;
  }
}
