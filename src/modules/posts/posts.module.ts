import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { PostService } from './services/posts.service';
import { PostRepository } from './repositories/post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), CqrsModule],
  controllers: [PostsController],
  providers: [PostService, PostRepository],
  exports: [PostService]
})
export class PostsModule {}
