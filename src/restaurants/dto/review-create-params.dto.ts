import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  MaxLength,
} from 'class-validator';

export class ReviewCreateParamsDTO {
  @ApiProperty({
    required: true,
    type: 'number',
    name: 'restaurantId',
  })
  @IsNotEmpty()
  @IsInt()
  restaurantId: number;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'comment',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  comment: string;

  @ApiProperty({
    required: true,
    type: 'number',
    name: 'rate',
  })
  @IsNotEmpty()
  @IsInt()
  @Max(5)
  @Min(1)
  rate: number;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'dateOfVisit',
  })
  @IsNotEmpty()
  @IsString()
  dateOfVisit: string;
}
