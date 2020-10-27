import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowRepository } from './follow.repository';
import { Follow } from './follow.entity';
import { CreateFollowDto } from './dto/create-follow.dto';
import { User } from '../user/user.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(FollowRepository)
    private followRepository: FollowRepository,
  ) {}

  async getFollowList(user: User): Promise<Follow[]> {
    return await this.followRepository.find({
      where: { askFrom: user.id },
    });
  }

  async createFollow(
    createFollowDto: CreateFollowDto,
    user: User,
  ): Promise<Follow> {
    return this.followRepository.createFollow(createFollowDto, user);
  }
}
