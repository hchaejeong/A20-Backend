import { IsEmail, IsOptional, IsString } from "class-validator";
import { Tag } from "../entities/post.entity";

export class CreatePostRequestDto {
    @IsString()
    title: string;

    @IsString()
    content: string

    @IsString()
    district: string

    @IsString()
    area: string

    @IsOptional()
    imageUrl: string | null

    tag: Tag

    @IsEmail()
    email: string
}