import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DmRepository } from './dm.repository';
import { CreateDmDto } from './dto/create-dm.dto';
import { User } from '../user/user.entity';
import { Dm } from './Dm.entity';

@Injectable()
export class DmService {
  constructor(
    @InjectRepository(DmRepository)
    private dmRepository: DmRepository,
  ) {}

  async getDmInbox(user: User): Promise<Dm[]> {
    return await this.dmRepository.find({
      where: { receiver: user.id },
    });
  }

  async createDm(createDmDto: CreateDmDto, user: User): Promise<Dm> {
    if (createDmDto.receiver === user.id) {
      throw new BadRequestException('Cannot send DM to myself');
    }
    return this.dmRepository.createDm(createDmDto, user);
  }
}
