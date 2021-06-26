import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Roles } from '../../auth/constants';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {
    const params = {
      id: userRepository.getCount() + 1,
      username: 'admin',
      password: '$2b$10$GiAX2qU/hLItcS03/cpPEuH5XoiZK.MaeLfh38bYY0hy4RUf8Y7lm',
      role: Roles.ADMIN,
    };
    const adminUser = new UserEntity(
      params.id,
      params.username,
      params.password,
      params.role,
    );

    userRepository.save(adminUser);
  }

  findOne(username: string): UserEntity {
    return this.userRepository.getByUsername(username);
  }

  create(username: string, password: string, role: Roles): UserEntity {
    const isExist = this.userRepository.checkExistenceByUsername(username);

    if (isExist) {
      throw new UnprocessableEntityException('This username already exist');
    }

    const id = this.userRepository.getCount() + 1;
    const user = new UserEntity(id, username, password, role);

    this.userRepository.save(user);

    return user;
  }
}
