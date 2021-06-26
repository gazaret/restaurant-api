import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../constants';

export class SigninResponseDto {
  @ApiProperty({
    required: true,
    type: 'string',
    name: 'userId',
  })
  userId: number;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'username',
  })
  username: string;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'accessToken',
  })
  accessToken: string;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'role',
  })
  role: Roles;

  constructor(
    userId: number,
    username: string,
    accessToken: string,
    role: Roles,
  ) {
    this.userId = userId;
    this.username = username;
    this.accessToken = accessToken;
    this.role = role;
  }
}
