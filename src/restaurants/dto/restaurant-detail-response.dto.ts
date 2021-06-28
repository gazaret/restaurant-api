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
  })
  reviews: ReviewEntity[];

  constructor(
    id: number,
    name: string,
    imageData: string,
    reviews: ReviewEntity[],
  ) {
    this.id = id;
    this.name = name;
    this.imageData = imageData;
    this.reviews = reviews;
  }
}
