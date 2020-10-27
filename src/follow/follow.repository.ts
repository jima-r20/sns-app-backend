import { Repository, EntityRepository } from 'typeorm';
import { Follow } from './follow.entity';
import { CreateFollowDto } from './dto/create-follow.dto';
import { User } from '../user/user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

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
}
