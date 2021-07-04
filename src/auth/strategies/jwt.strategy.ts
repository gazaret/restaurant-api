import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserPublicDTO } from '../../users/dto/user-public.dto';
import { UserService } from '../../users/services/user.service';
import { ConfigEnvironment } from '../../types';
import { TokenPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configureService: ConfigService<ConfigEnvironment>,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configureService.get<string>('JWT_SECRET'),
    });
  }

  async validate(tokenPayload: TokenPayload): Promise<UserPublicDTO> {
    const user = await this.userService.findOne(tokenPayload.username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: tokenPayload.userId,
      username: tokenPayload.username,
      role: tokenPayload.role,
    };
  }
}
