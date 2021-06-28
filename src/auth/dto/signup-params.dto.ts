import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupParamsDto {
  @ApiProperty({
    required: true,
    type: 'string',
    name: 'username',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(4)
  username: string;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'password',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(8)
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
