import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/users.service';
import { UserDTO, User } from '../../users/types';
import { SigninDTO } from '../types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDTO | null> {
    try {
      const user = await this.userService.findOne(username);

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const { password, ...rest } = user;

        return rest;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  signin(user: User): SigninDTO {
    const payload = {
      userId: user.id,
      username: user.username,
    };

    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      ...payload,
    };
  }
}
