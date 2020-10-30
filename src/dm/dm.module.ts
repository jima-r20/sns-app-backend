import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmController } from './dm.controller';
import { DmService } from './dm.service';
import { DmRepository } from './dm.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([DmRepository]), UserModule],
  controllers: [DmController],
  providers: [DmService],
})
export class DmModule {}
