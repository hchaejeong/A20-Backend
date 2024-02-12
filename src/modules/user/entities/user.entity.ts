import { Exclude, Expose } from "class-transformer";
import { PostEntity } from "src/modules/posts/entities/post.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'user',
})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Expose()
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    @Expose()
    name: string;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
    })
    @Expose()
    email: string;

    @Column({
        type: 'varchar',
    })
    @Exclude({
        toPlainOnly: true,
    })
    password: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    carType: string | null;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    carNumber: string | null;

    @OneToMany(() => PostEntity, (post) => post.user)
    @Exclude({ toPlainOnly: true })
    posts: PostEntity;
}