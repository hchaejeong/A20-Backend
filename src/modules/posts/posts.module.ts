import { Module } from '@nestjs/common';
import { PostController } from './post/post.controller';
import { PostsController } from './posts.controller';

@Module({
  controllers: [PostController, PostsController]
})
export class PostsModule {}
