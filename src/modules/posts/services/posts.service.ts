import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { PostEntity, Tag } from '../entities/post.entity';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from 'src/modules/user/queries/impl/get-user.query';

@Injectable()
export class PostService {
    constructor(private postRepository: PostRepository, private queryBus: QueryBus) {}

    public async getAllPostsByDistrict(args: { district: string }): Promise<PostEntity[]> {
        const { district } = args;

        const posts = await this.postRepository.find({
            where: {
                district,
            },
        });

        if (!posts) {
            throw new UnauthorizedException();
        }

        return posts;
    }

    public async getAllPostsByTag(args: { tag: string }): Promise<PostEntity[]> {
        const { tag } = args;
        console.log(tag)

        const posts = await this.postRepository.find({
            where: {
                tag,
            }
        })

        if (!posts) {
            throw new UnauthorizedException()
        }

        return posts;
    }

    public async getPost(args: { postId: string }): Promise<PostEntity> {
        const { postId } = args;

        const post = await this.postRepository.findOne({
            where: {
                id: postId,
            },
        });

        if (!post) {
            throw new UnauthorizedException();
        }

        return post;
    }

    public async createPost(args: { title: string, content: string, district: string, area: string, imageUrl: string | null, tag: Tag, userId: string }): Promise<PostEntity> {
        const { title, content, district, area, imageUrl, tag, userId } = args;
        const user = await this.queryBus.execute(
            new GetUserQuery({
                where: {
                    id: userId,
                },
            }),
        );

        if (!user) {
            throw new UnprocessableEntityException();
        }

        const post = await this.postRepository.save(
            this.postRepository.create({
                title,
                content,
                district,
                area,
                imageUrl,
                tag,
                user,
            }),
        ); 

        return post;
    }
}
