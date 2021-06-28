import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { RestaurantEntity } from './restaurant.entity';

@Entity()
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  rate: number;

  @Column()
  dateOfVisit: string;

  @Column({ default: null })
  reply: string;

  @ManyToOne((type) => RestaurantEntity, (restaurant) => restaurant.reviews)
  restaurant: RestaurantEntity;

  @ManyToOne((type) => UserEntity, (user) => user.reviews)
  user: UserEntity;
}
