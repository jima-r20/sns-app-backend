import { Injectable } from '@nestjs/common';
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

  async createDm(createDmDto: CreateDmDto, user: User): Promise<Dm> {
    return this.dmRepository.createDm(createDmDto, user);
  }
}
