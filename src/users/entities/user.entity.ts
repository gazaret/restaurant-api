import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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
}
