import { Exclude, Expose } from "class-transformer";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Tag {
    Report = '신고',
    Feedback = '피드백',
}

@Entity({
    name: 'post',
})
export class PostEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    @Expose()
    title: string;

    @Column({
        type: 'varchar',
    })
    @Expose()
    content: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    @Expose()
    district: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    @Expose()
    area: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    @Expose()
    imageUrl: string | null;

    @Column({
        type: 'varchar',
        length: 50
    })
    @Expose()
    tag: Tag;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    @Exclude({ toPlainOnly: true })
    user: UserEntity;

    @Column()
    @Expose()
    userId: string;
}