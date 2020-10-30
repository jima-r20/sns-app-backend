import { InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { Dm } from './Dm.entity';
import { CreateDmDto } from './dto/create-dm.dto';
import { User } from '../user/user.entity';

@EntityRepository(Dm)
export class DmRepository extends Repository<Dm> {
  async createDm(createDmDto: CreateDmDto, user: User): Promise<Dm> {
    const { receiver, message } = createDmDto;

    const dm = this.create();
    dm.sender = user.id;
    dm.receiver = receiver;
    dm.message = message;

    try {
      await dm.save();
      return dm;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
