import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ReplyCreateParamsDTO {
  @ApiProperty({
    required: true,
    type: 'string',
    name: 'reply',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  reply: string;
}
