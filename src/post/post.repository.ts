import { Repository, EntityRepository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../user/user.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async getPosts(): Promise<Post[]> {
    // const posts = await this.postRepository.find({
    //   relations: ['postFrom'],
    // });
    const query = await this.createQueryBuilder('post')
      .select([
        'post',
        'postFrom.id',
        'postFrom.displayName',
        'postFrom.avatar',
        'postFrom.about',
      ])
      .innerJoin('post.postFrom', 'postFrom');

    try {
      const posts = query.getMany();
      return posts;
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
