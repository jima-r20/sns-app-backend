import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { SignUpCredentialsDto } from './dto/signup-credentials.dts';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { UserResponse } from './interfaces/user-response.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(
    signUpCredentialDto: SignUpCredentialsDto,
  ): Promise<UserResponse> {
    const { email, password, displayName, avatar, about } = signUpCredentialDto;

    const user = this.create();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.displayName = displayName;
    user.avatar = avatar;
    user.about = about;
    user.is_active = false;
    user.is_staff = false;

    try {
      await user.save();
      const userResponse: UserResponse = {
        id: user.id,
        displayName: user.displayName,
        avatar: user.avatar,
        about: user.about,
      };
      return userResponse;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('This email already registered');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<string> {
    const { email, password } = signInCredentialsDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user.email;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    user: User,
  ): Promise<UserResponse> {
    if (id !== user.id) {
      throw new UnauthorizedException('Invalid credentials or NOT match ID');
    }

    const { displayName, avatar, about } = updateUserDto;

    const target = await this.findOne({ where: { id } });
    target.displayName = displayName;
    target.avatar = avatar;
    target.about = about;

    try {
      await target.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    const userResponse: UserResponse = {
      id: target.id,
      displayName: target.displayName,
      avatar: target.avatar,
      about: target.about,
    };
    return userResponse;
  }
}
