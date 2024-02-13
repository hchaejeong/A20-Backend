import { IsArray } from "class-validator";
import { PostEntity } from "../entities/post.entity";

export class GetPostsRequestDto {
    @IsArray()
    posts: PostEntity[]
}