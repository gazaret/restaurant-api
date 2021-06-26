import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class SignupParamsDto {
  @ApiProperty({
    required: true,
    type: 'string',
    name: 'username',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    required: true,
    type: 'boolean',
    name: 'isRestaurantOwner',
  })
  @IsNotEmpty()
  @IsBoolean()
  isRestaurantOwner: boolean;
}
