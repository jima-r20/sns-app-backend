import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, FollowModule],
})
export class AppModule {}
