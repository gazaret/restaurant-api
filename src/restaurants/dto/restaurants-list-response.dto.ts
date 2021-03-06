import { ApiProperty } from '@nestjs/swagger';

export class RestaurantsListResponseDTO {
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
  })
  imageData: string;

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
    description: string,
    imageData: string,
    averageRate: number,
    unrepliedComments: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageData = imageData;
    this.averageRate = averageRate;
    this.unrepliedComments = unrepliedComments;
  }
}
