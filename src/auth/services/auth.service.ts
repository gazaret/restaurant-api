import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../users/services/user.service';
import { UserEntity } from '../../users/entities/user.entity';
import { UserPublicDTO } from '../../users/dto/user-public.dto';
import { SigninResponseDto, SignupParamsDto, SignupResponseDto } from '../dto';
import { Roles } from '../constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private signToken(user: UserEntity): string {
    const payload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserPublicDTO | null> {
    try {
      const user = await this.userService.findOne(username);

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return new UserPublicDTO(user.id, user.username, user.role);
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  signin(user: UserEntity): SigninResponseDto {
    const token = this.signToken(user);

    return new SigninResponseDto(user.id, user.username, token, user.role);
  }

  async signup(data: SignupParamsDto): Promise<SignupResponseDto> {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(data.password, saltOrRounds);
    const role = data.isRestaurantOwner ? Roles.OWNER : Roles.USER;

    const user = await this.userService.create(
      data.username,
      hashPassword,
      role,
    );

    const token = this.signToken(user);

    return new SignupResponseDto(user.id, user.username, token, user.role);
  }
}
