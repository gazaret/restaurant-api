import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Roles } from '../../auth/constants';

export class UserUpdateParamsDTO {
  @ApiProperty({
    required: true,
    type: 'string',
    name: 'username',
    maximum: 50,
    minimum: 4,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(4)
  username: string;

  @ApiProperty({
    required: true,
    enum: Roles,
    name: 'role',
  })
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
