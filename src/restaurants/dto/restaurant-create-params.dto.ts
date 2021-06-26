import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RestaurantCreateParamsDto {
  @ApiProperty({
    required: true,
    type: 'string',
    name: 'name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'imageData',
  })
  @IsNotEmpty()
  @IsString()
  imageData: string;
}
