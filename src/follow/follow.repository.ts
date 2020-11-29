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
    /* 
      approvedをtrueもしくはfalseに変更するための処理 
      askFromが自身のときと、askToが自身のときでの場合わけを以下で行っている
      最終的な処理内容は同じ
    */
    const { askFrom, askTo, approved } = approveRequestDto;
    if (askFrom === undefined && askTo === undefined) {
      throw new InternalServerErrorException();
    }

    let followReq!: Follow;
    if (askFrom !== undefined) {
      // askFromに相手ユーザのIDが入っている場合
      followReq = await this.findOne({
        where: { askFrom, askTo: user.id },
      });
    } else if (askTo !== undefined) {
      // askToに相手ユーザのIDが入っている場合
      followReq = await this.findOne({
        where: { askFrom: user.id, askTo },
      });
    } else {
      throw new BadRequestException();
    }

    if (
      (followReq.approved && approved) ||
      (!followReq.approved && !approved)
    ) {
      throw new BadRequestException();
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
