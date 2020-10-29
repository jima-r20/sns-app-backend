import {
  Controller,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
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

  @Post()
  createPost(
    @Body(ValidationPipe) createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postService.createPost(createPostDto, user);
  }
}
