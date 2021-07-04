import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
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
  @Column({ default: null })
  imageData: string;

  @OneToMany(() => ReviewEntity, (review) => review.restaurant)
  reviews: ReviewEntity[];

  @ManyToOne(() => UserEntity, (user) => user.restaurants, { eager: true })
  user: UserEntity;
}
