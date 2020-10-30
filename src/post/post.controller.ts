import {
  Controller,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
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

  @Get('/myposts')
  getUserPosts(@GetUser() user: User): Promise<PostEntity[]> {
    return this.postService.getUserPosts(user);
  }

  @Get('/friend-posts/:id')
  getFriendPosts(@Param('id', ParseIntPipe) id: number): Promise<PostEntity[]> {
    return this.postService.getFriendPosts(id);
  }

  @Get('/:id')
  getPost(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.getPost(id);
  }

  @Post()
  createPost(
    @Body(ValidationPipe) createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postService.createPost(createPostDto, user);
  }

  @Patch('/:id')
  editPost(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postService.editPost(id, createPostDto, user);
  }

  @Delete('/:id')
  deletePost(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.postService.deletePost(id, user);
  }
}
