import { Repository, EntityRepository, SelectQueryBuilder } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/user.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async findWithInnerJoin(): Promise<SelectQueryBuilder<Post>> {
    return await this.createQueryBuilder('post')
      .select([
        'post',
        'postFrom.id',
        'postFrom.displayName',
        'postFrom.avatar',
        'postFrom.about',
      ])
      .innerJoin('post.postFrom', 'postFrom');
  }

  async getPosts(): Promise<Post[]> {
    const query = await this.findWithInnerJoin();

    try {
      const posts = query.getMany();
      return posts;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getUserPosts(user: User): Promise<Post[]> {
    const query = await this.findWithInnerJoin();

    try {
      const posts = query
        .where('post.postFrom.id = :userId', { userId: user.id })
        .getMany();
      return posts;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getPost(id: number): Promise<Post> {
    const query = await this.findWithInnerJoin();

    try {
      const post = query.where('post.id = :id', { id }).getOne();
      return post;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

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
