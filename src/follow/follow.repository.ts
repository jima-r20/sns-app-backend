import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { Follow } from './follow.entity';
import { CreateFollowDto } from './dto/create-follow.dto';
import { ApproveRequestDto } from './dto/approve-request.dto';
import { User } from '../user/user.entity';

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

    if (!approved) {
      throw new BadRequestException();
    }

    const followReq = await this.findOne({
      where: { askFrom, askTo: user.id },
    });
    if (followReq.approved) {
      throw new BadRequestException('This request already approved');
    }
    followReq.approved = approved;

    try {
      return await followReq.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteFollow(id: number, user: User): Promise<void> {
    const found = await this.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Follow with ID "${id}" not found`);
    }
    if (found.askFrom !== user.id) {
      throw new BadRequestException(
        'Cannot delete because the askFrom does not match userId',
      );
    }

    await this.delete({ id, askFrom: user.id });
  }
}
