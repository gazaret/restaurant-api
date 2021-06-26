import { ApiProperty } from '@nestjs/swagger';

export class SigninParamsDto {
  @ApiProperty({
    required: true,
    type: 'string',
    name: 'username',
  })
  username: string;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'password',
  })
  password: string;
}
