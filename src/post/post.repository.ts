import { Repository, EntityRepository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/user.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { content } = createPostDto;
    const { id, displayName, avatar, about } = user;

    const post = this.create();
    post.content = content;
    post.postFrom = { id, displayName, avatar, about };

    try {
      return await post.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
