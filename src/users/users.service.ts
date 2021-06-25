import { Injectable } from '@nestjs/common';
import { User } from './types';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'admin',
      password: '$2b$10$GiAX2qU/hLItcS03/cpPEuH5XoiZK.MaeLfh38bYY0hy4RUf8Y7lm',
    },
  ];

  async findOne(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) || null;
  }
}
