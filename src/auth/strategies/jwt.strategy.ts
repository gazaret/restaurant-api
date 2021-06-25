import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDTO } from '../../users/types';
import { ConfigEnvironment } from '../../types';
import { TokenPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configureService: ConfigService<ConfigEnvironment>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configureService.get<string>('JWT_SECRET'),
    });
  }

  validate(tokenPayload: TokenPayload): UserDTO {
    return {
      id: tokenPayload.userId,
      username: tokenPayload.username,
    };
  }
}
