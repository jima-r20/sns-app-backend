import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowRepository } from './follow.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([FollowRepository]), UserModule],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
