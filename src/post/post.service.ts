import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  async getPosts(): Promise<Post[]> {
    return this.postRepository.getPosts();
  }

  async getUserPosts(user: User): Promise<Post[]> {
    return this.postRepository.getPostsById(user.id);
  }

  async getFriendPosts(id: number): Promise<Post[]> {
    return this.postRepository.getPostsById(id);
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

    if (user.id !== post.postFromId) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    post.content = content;
    await post.save();
    return post;
  }

  async deletePost(id: number, user: User): Promise<void> {
    const result = await this.postRepository.delete({
      id,
      postFromId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
  }
}
