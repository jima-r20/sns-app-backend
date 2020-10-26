import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { SignUpCredentialsDto } from './dto/signup-credentials.dts';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserResponse } from './user-response.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<UserResponse> {
    return this.userRepository.signUp(signUpCredentialsDto);
  }

  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const email = await this.userRepository.validateUserPassword(
      signInCredentialsDto,
    );

    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async getUsers(): Promise<UserResponse[]> {
    return await this.userRepository.find({
      select: ['id', 'displayName', 'avatar', 'about'],
    });
  }

  async getUser(user: User): Promise<UserResponse> {
    const userResponse: UserResponse = {
      id: user.id,
      displayName: user.displayName,
      avatar: user.avatar,
      about: user.about,
    };
    return userResponse;
  }

  // async getUser(id: number): Promise<UserResponse> {
  //   return await this.userRepository.findOne({
  //     select: ['id', 'displayName', 'avatar', 'about'],
  //     where: { id },
  //   });
  // }

  async updateUser(
    id: number,
    displayName: string,
    avatar: string,
    about: string,
  ): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ where: { id } });
    user.displayName = displayName;
    user.avatar = avatar;
    user.about = about;
    await user.save();

    const userResponse: UserResponse = {
      id: user.id,
      displayName: user.displayName,
      avatar: user.avatar,
      about: user.about,
    };
    return userResponse;
  }
}
