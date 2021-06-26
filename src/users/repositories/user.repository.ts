import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  private readonly users: UserEntity[] = [];

  private get(key: string, value: any): UserEntity {
    const user = this.users.find((user) => user[key] === value);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private checkExistence(key: string, value: any): boolean {
    return this.users.some((user) => user[key] === value);
  }

  getById(id: number) {
    return this.get('id', id);
  }

  getByUsername(username: string) {
    return this.get('username', username);
  }

  checkExistenceByUsername(username: string) {
    return this.checkExistence('username', username);
  }

  save(user: UserEntity) {
    this.users.push(user);
  }

  getCount(): number {
    return this.users.length;
  }
}
