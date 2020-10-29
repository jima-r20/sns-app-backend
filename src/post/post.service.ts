import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/user.entity';
import { Post } from './post.entity';
import { getManager, getRepository, createQueryBuilder } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  async getPosts(): Promise<Post[]> {
    return this.postRepository.getPosts();
  }

  async getPost(id: number): Promise<Post> {
    return this.postRepository.getPost(id);
  }

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    return this.postRepository.createPost(createPostDto, user);
  }

  async editPost(
    id: number,
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<Post> {
    const { content } = createPostDto;
    const post = await this.getPost(id);

    if (user.id !== post.postFrom.id) {
      throw new UnauthorizedException(
        'Cannot edit this post because it is owned by a different person',
      );
    }

    post.content = content;
    await post.save();
    return post;
  }
}
