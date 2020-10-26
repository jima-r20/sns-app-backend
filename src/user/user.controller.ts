import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { SignUpCredentialsDto } from './dto/signup-credentials.dts';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { UserResponse } from './user-response.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  signUp(
    @Body(ValidationPipe) signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<UserResponse> {
    return this.userService.signUp(signUpCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(signInCredentialsDto);
  }

  // ユーザリスト取得
  @Get('/profiles')
  @UseGuards(AuthGuard())
  getUsers(): Promise<UserResponse[]> {
    return this.userService.getUsers();
  }

  // ログインプロフィール情報取得
  @Get('/myprofile')
  @UseGuards(AuthGuard())
  getUserById(@GetUser() user: User): Promise<UserResponse> {
    return this.userService.getUserById(user);
  }

  // プロフィール更新

  // ユーザの削除

  // 検証用
  // @Get('/test')
  // @UseGuards(AuthGuard())
  // test(@GetUser() user: User) {
  //   console.log(user);
  // }
}
