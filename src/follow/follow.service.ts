import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowRepository } from './follow.repository';
import { Follow } from './follow.entity';
import { CreateFollowDto } from './dto/create-follow.dto';
import { ApproveRequestDto } from './dto/approve-request.dto';
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

  async getFollowerList(user: User): Promise<Follow[]> {
    return await this.followRepository.find({
      where: { askTo: user.id },
    });
  }

  async getFriendsList(user: User): Promise<Follow[]> {
    return await this.followRepository.find({
      where: [
        { askFrom: user.id, approved: true },
        // { askTo: user.id, approved: true },
      ],
    });
  }

  async createFollow(
    createFollowDto: CreateFollowDto,
    user: User,
  ): Promise<Follow> {
    if (createFollowDto.askTo === user.id) {
      throw new BadRequestException('Cannot send follow request to myself');
    }
    return this.followRepository.createFollow(createFollowDto, user);
  }

  async approveRequest(
    approveRequestDto: ApproveRequestDto,
    user: User,
  ): Promise<Follow> {
    return this.followRepository.approveRequest(approveRequestDto, user);
  }

  async deleteFollow(id: number, user: User): Promise<void> {
    return await this.followRepository.deleteFollow(id, user);
  }
}
