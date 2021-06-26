import { ApiProperty } from '@nestjs/swagger';

export class SignupParamsDto {
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

  @ApiProperty({
    required: true,
    type: 'boolean',
    name: 'isRestaurantOwner',
  })
  isRestaurantOwner: boolean;
}
