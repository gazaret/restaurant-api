import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SigninParamsDto {
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
}
