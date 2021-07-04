import { ApiProperty } from '@nestjs/swagger';
import { ReviewEntity } from '../entities/review.entity';

export class RestaurantDetailResponseDto {
  @ApiProperty({
    required: true,
    type: 'number',
    name: 'id',
  })
  id: number;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'name',
  })
  name: string;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'description',
  })
  description: string;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'imageData',
    description: 'Restaurant image',
  })
  imageData: string;

  @ApiProperty({
    required: true,
    type: ReviewEntity,
    name: 'reviews',
    isArray: true,
  })
  reviews: ReviewEntity[];

  @ApiProperty({
    required: true,
    type: 'number',
    name: 'averageRate',
  })
  averageRate: number;

  @ApiProperty({
    required: true,
    type: 'number',
    name: 'unrepliedComments',
  })
  unrepliedComments: number;

  constructor(
    id: number,
    name: string,
    imageData: string,
    reviews: ReviewEntity[],
    averageRate: number,
    unrepliedComments: number,
  ) {
    this.id = id;
    this.name = name;
    this.imageData = imageData;
    this.reviews = reviews;
    this.averageRate = averageRate;
    this.unrepliedComments = unrepliedComments;
  }
}
