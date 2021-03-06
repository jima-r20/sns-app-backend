import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { SignUpCredentialsDto } from './dto/signup-credentials.dts';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { UserResponse } from './interfaces/user-response.interface';
import { User } from './user.entity';

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
  getUser(@GetUser() user: User): Promise<UserResponse> {
    return this.userService.getUser(user);
  }

  // プロフィール更新
  @Patch('/profiles/:id')
  @UseGuards(AuthGuard())
  updateUser(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    return this.userService.updateUser(id, updateUserDto, user);
  }

  // ユーザの削除
  @Delete('/profiles/:id')
  @UseGuards(AuthGuard())
  deleteUser(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ id: number }> {
    return this.userService.deleteUser(id, user);
  }
}
