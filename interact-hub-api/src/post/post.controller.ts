import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { IPost } from './entities/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/:username')
  async create(
    @Body() createPostDto: IPost,
    @Param('username') username: string,
  ) {
    const obj = await this.postService.create(createPostDto, username);
    return obj;
  }
  @Post('likePost/:username/:postId')
  like(@Param('username') username: string, @Param('postId') postId: string) {
    return this.postService.likePost(username, postId);
  }
  @Get('recommendation/:username')
  recommendation(@Param('username') username) {
    return this.postService.recommendationPost(username);
  }
  @Get('countLikesOnPost/:id')
  async countLikesOnPost(@Param('id') postId: number) {
    return await this.postService.countLikesOnPost(postId);
  }
}
