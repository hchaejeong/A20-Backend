import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './services/posts.service';
import { PostEntity } from './entities/post.entity';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostService) {}

    @Get('/:district')
    public async getAllDistrictPosts(@Param('district') district): Promise<GetAllPostInfoResponseDto> {
        const posts = await this.postService.getAllPostsByDistrict({ district });
        const ids = posts.map((post) => post.id);
        const titles = posts.map((post) => post.title);
        const likes = posts.map((post) => post.likes);

        return { ids, titles, likes };
    }

    @Get(':postId')
    public async getPost(@Param('postId') postId): Promise<{ post: PostEntity }> {
        const post = await this.postService.getPost({ postId });

        return { post };
    }

}
