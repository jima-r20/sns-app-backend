import { Repository, EntityRepository } from 'typeorm';
import { Follow } from './follow.entity';
import { CreateFollowDto } from './dto/create-follow.dto';
import { User } from '../user/user.entity';
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { ApproveRequestDto } from './dto/approve-request.dto';

@EntityRepository(Follow)
export class FollowRepository extends Repository<Follow> {
  async createFollow(
    createFollowDto: CreateFollowDto,
    user: User,
  ): Promise<Follow> {
    const { askTo, approved } = createFollowDto;

    if (user.id === askTo) {
      throw new ConflictException('Cannot send follow request to myself');
    }

    const follow = this.create();
    follow.askFrom = user.id;
    follow.askTo = askTo;
    follow.approved = approved;

    try {
      return await follow.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async approveRequest(
    approveRequestDto: ApproveRequestDto,
    user: User,
  ): Promise<Follow> {
    const { askFrom, approved } = approveRequestDto;

    console.log(approveRequestDto);

    if (!approved) {
      throw new BadRequestException();
    }

    const followReq = await this.findOne({
      where: { askFrom, askTo: user.id },
    });
    if (followReq.approved) {
      throw new BadRequestException('This request already approved');
    }
    followReq.approved = true;

    try {
      return await followReq.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
