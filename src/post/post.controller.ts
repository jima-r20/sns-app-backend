import {
  Controller,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './post.entity';
import { GetUser } from '../user/decorators/get-user.decorator';
import { User } from '../user/user.entity';

@Controller('post')
@UseGuards(AuthGuard())
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getPosts(): Promise<PostEntity[]> {
    return this.postService.getPosts();
  }

  @Post()
  createPost(
    @Body(ValidationPipe) createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postService.createPost(createPostDto, user);
  }
}
