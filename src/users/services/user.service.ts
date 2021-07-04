import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Roles } from '../../auth/constants';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { UserPublicDTO } from '../dto/user-public.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAll(): Promise<UserPublicDTO[]> {
    const users = await this.userRepository.find();

    return users.map((user) => {
      return new UserPublicDTO(user.id, user.username, user.role);
    });
  }

  async findOne(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ username });
  }

  async create(
    username: string,
    password: string,
    role: Roles,
  ): Promise<UserEntity> {
    const isExist = await this.userRepository.findAndCount({ username });

    if (isExist[1]) {
      throw new UnprocessableEntityException('This username already exist');
    }

    const user = new UserEntity();

    user.username = username;
    user.password = password;
    user.role = role;

    await this.userRepository.save(user);

    return user;
  }
}
