import { ApiProperty } from '@nestjs/swagger';

export class RestaurantCreateResponseDTO {
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

  constructor(
    id: number,
    name: string,
    description: string,
    imageData: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageData = imageData;
  }
}
