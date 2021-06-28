import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ReviewEntity } from '../../restaurants/entities/review.entity';
import { Roles } from '../../auth/constants';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: Roles;

  @OneToMany((type) => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];
}
