import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { IPost } from './entities/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/:username')
  create(@Body() createPostDto: IPost,@Param('username') username:string) {
    
    return this.postService.create(createPostDto,username);
  }
  @Post('likePost/:username/:postId')
  like(@Param('username')username:string,@Param('postId')postId:string)
  {
    return this.postService.likePost(username,postId);

  }
 @Get('recommendation/:username')
 recommendation(@Param('username')username)
 {
  return this.postService.recommendationPost(username);
 }
}
