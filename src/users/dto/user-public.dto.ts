import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../../auth/constants';

export class UserPublicDTO {
  @ApiProperty({
    type: 'number',
    name: 'id',
  })
  id: number;

  @ApiProperty({
    type: 'string',
    name: 'username',
  })
  username: string;

  @ApiProperty({
    enum: [Roles.ADMIN, Roles.OWNER, Roles.USER],
    name: 'role',
  })
  role: Roles;

  constructor(id: number, username: string, role: Roles) {
    this.id = id;
    this.username = username;
    this.role = role;
  }
}
