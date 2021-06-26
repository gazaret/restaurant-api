import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninParamsDto {
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
}
