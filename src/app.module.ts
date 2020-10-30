import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { FollowModule } from './follow/follow.module';
import { PostModule } from './post/post.module';
import { DmModule } from './dm/dm.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, FollowModule, PostModule, DmModule],
})
export class AppModule {}
