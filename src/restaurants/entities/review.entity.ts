import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { RestaurantEntity } from './restaurant.entity';

@Entity()
export class ReviewEntity {
  @ApiProperty({
    type: 'number',
    name: 'id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: 'string',
    name: 'comment',
  })
  @Column()
  comment: string;

  @ApiProperty({
    type: 'number',
    name: 'rate',
  })
  @Column()
  rate: number;

  @ApiProperty({
    type: 'string',
    name: 'dateOfVisit',
  })
  @Column()
  dateOfVisit: string;

  @ApiProperty({
    type: 'string',
    name: 'reply',
  })
  @Column({ default: null })
  reply: string;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.reviews, {
    onDelete: 'CASCADE',
  })
  restaurant: RestaurantEntity;

  @ManyToOne(() => UserEntity, (user) => user.reviews, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
