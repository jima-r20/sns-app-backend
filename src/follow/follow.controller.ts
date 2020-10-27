import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  ValidationPipe,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FollowService } from './follow.service';
import { Follow } from './follow.entity';
import { CreateFollowDto } from './dto/create-follow.dto';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { FollowValidationPipe } from './pipe/follow-validation.pipe';

@Controller('follow')
@UseGuards(AuthGuard())
export class FollowController {
  constructor(private followService: FollowService) {}

  @Get('follow-list')
  getFollowList(@GetUser() user: User): Promise<Follow[]> {
    return this.followService.getFollowList(user);
  }

  @Get('follower-list')
  getFollowerList(@GetUser() user: User): Promise<Follow[]> {
    return this.followService.getFollowerList(user);
  }

  @Get('friends-list')
  getFriendsList(@GetUser() user: User): Promise<Follow[]> {
    return this.followService.getFriendsList(user);
  }

  @Post('request')
  createFollow(
    @Body(FollowValidationPipe) createFollowDto: CreateFollowDto,
    @GetUser() user: User,
  ) {
    return this.followService.createFollow(createFollowDto, user);
  }
}
