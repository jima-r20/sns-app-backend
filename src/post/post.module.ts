import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository]), UserModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
