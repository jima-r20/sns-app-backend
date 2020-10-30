import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret7420',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
