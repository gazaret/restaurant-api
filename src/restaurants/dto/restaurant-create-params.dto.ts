import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RestaurantCreateParamsDto {
  @ApiProperty({
    required: true,
    type: 'string',
    name: 'name',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'description',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
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
