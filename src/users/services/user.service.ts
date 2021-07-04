import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Roles } from '../../auth/constants';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { UserPublicDTO, UserUpdateParamsDTO } from '../dto';
import { UserNotFoundException } from '../errors/user-not-found.exception';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllExceptAdmins(): Promise<UserPublicDTO[]> {
    const users = await this.userRepository.find();

    const usersWithoutAdmins = users.filter(
      (user) => user.role !== Roles.ADMIN,
    );

    return usersWithoutAdmins.map((user) => {
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

  async update(
    userId: number,
    userUpdateData: UserUpdateParamsDTO,
  ): Promise<UserPublicDTO> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new UserNotFoundException();
    }

    user.username = userUpdateData.username;
    user.role = userUpdateData.role;

    await this.userRepository.update({ id: userId }, user);

    return new UserPublicDTO(user.id, user.username, user.role);
  }

  async delete(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new UserNotFoundException();
    }

    await this.userRepository.delete({ id: userId });
  }
}
