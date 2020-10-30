import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository]), UserModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
