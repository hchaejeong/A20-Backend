import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostEntity, Tag } from "../entities/post.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";

@Injectable()
export class PostRepository {
    constructor(@InjectRepository(PostEntity) private repository: Repository<PostEntity>,) {}

    create(args: { title: string, content: string, district: string, area: string, imageUrl: string | null, tag: Tag, user: UserEntity }) {
        const { title, content, district, area, imageUrl, tag, user } = args;

        return this.repository.create({
            title,
            content,
            district,
            area,
            imageUrl,
            tag,
            user,
        })
    }

    save(...args: Parameters<Repository<PostEntity>['save']>): ReturnType<Repository<PostEntity>['save']> {
        return this.repository.save(...args);
    }

    find(...args: Parameters<Repository<PostEntity>['find']>): ReturnType<Repository<PostEntity>['find']> {
        return this.repository.find(...args);
    }

    findOne(...args: Parameters<Repository<PostEntity>['findOne']>): ReturnType<Repository<PostEntity>['findOne']> {
        return this.repository.findOne(...args);
    }

    update(...args: Parameters<Repository<PostEntity>['update']>): ReturnType<Repository<PostEntity>['update']> {
        return this.repository.update(...args);
    }
}