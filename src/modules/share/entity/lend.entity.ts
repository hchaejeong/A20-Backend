import { Expose } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'lend',
})
export class LendEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    @Expose()
    lenderId: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    @Expose()
    parkingLotName: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    @Expose()
    lenderName: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    @Expose()
    relation: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    @Expose()
    phoneNumber: string;

    @Column({
        type: 'varchar',
        length: 200,
    })
    @Expose()
    address: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    @Expose()
    lat: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    @Expose()
    lon: string;

    @Column({
        type: 'int',
    })
    @Expose()
    totalQty: number;   //총 주차 면수

    @Column({
        type: 'int',
    })
    @Expose()
    resQty: number;     //주차(예약) 가능 면수

    @Column({
        type: 'int',
    })
    @Expose()
    baseRate: number;   //주차 기본 요금(원)

    @Column({
        type: 'int',
    })
    @Expose()
    baseTime: number;   //주차 기본 시간(분)

    @Column({
        type: 'int',
    })
    @Expose()
    addRate: number;   //주차 추가 단위 요금(원)

    @Column({
        type: 'int',
    })
    @Expose()
    addTime: number;   //주차 추가 단위 시간(분)

    @Column({
        type: 'varchar',
        length: 100,
    })
    @Expose()
    openTime: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    @Expose()
    closeTime: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    @Expose()
    operDay: string;    //운영 요일
}