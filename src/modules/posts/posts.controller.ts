import { Body, Controller, Get, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PostService } from './services/posts.service';
import { PostEntity, Tag } from './entities/post.entity';
import { GetPostsRequestDto } from './dtos/get-posts-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostRequestDto } from './dtos/create-post-request.dto';
import { UserEntity } from '../user/entities/user.entity';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostService) {}

    @Get(':district')
    public async getAllDistrictPosts(@Param('district') district: string): Promise<GetPostsRequestDto> {
        const posts = await this.postService.getAllPostsByDistrict({ district });

        return { posts };
    }

    @Get(':tag')
    public async getAllPostsByTag(@Param('tag') tag: Tag): Promise<GetPostsRequestDto> {
        const posts = await this.postService.getAllPostsByTag({tag})

        return {posts}
    }

    @Get(':postId')
    public async getPost(@Param('postId') postId): Promise<{ post: PostEntity }> {
        const post = await this.postService.getPost({ postId });

        return { post };
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    public async createPost(@Body() body: CreatePostRequestDto, @Req() req: Request): Promise<{newPost: PostEntity}> {
        const { title, content, district, area, imageUrl, tag } = body;

        const user: UserEntity = req.user as UserEntity;

        if (!user) {
            throw new UnauthorizedException();
        }

        const newPost = await this.postService.createPost({ title, content, district, area, imageUrl, tag, userId: user.id });

        return { newPost };
    }
}
