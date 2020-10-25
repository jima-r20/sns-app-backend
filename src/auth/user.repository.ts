import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dts';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
    const { email, password, displayName, avatar, about } = authCredentialDto;

    const salt = await bcrypt.genSalt();

    const user = this.create();
    user.email = email;
    user.password = await this.hashPassword(password, salt);
    user.displayName = displayName;
    user.avatar = avatar;
    user.about = about;
    user.is_active = false;
    user.is_staff = false;

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('This email already registered');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
