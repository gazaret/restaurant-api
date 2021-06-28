import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ReviewEntity } from './review.entity';

@Entity()
export class RestaurantEntity {
  @ApiProperty({
    required: true,
    type: 'number',
    name: 'id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'name',
  })
  @Column()
  name: string;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'description',
  })
  @Column()
  description: string;

  @ApiProperty({
    required: true,
    type: 'string',
    name: 'imageData',
    description: 'Restaurant image',
  })
  @Column()
  imageData: string;

  @OneToMany((type) => ReviewEntity, (reviews) => reviews.restaurant)
  reviews: ReviewEntity[];
}
