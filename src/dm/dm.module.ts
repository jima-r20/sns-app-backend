import { Module } from '@nestjs/common';
import { DmController } from './dm.controller';
import { DmService } from './dm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DmRepository } from './dm.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([DmRepository]), UserModule],
  controllers: [DmController],
  providers: [DmService],
})
export class DmModule {}
