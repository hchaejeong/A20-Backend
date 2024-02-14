import { Expose } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'borrow'
})
export class BorrowEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  lendId: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @Expose()
  borrowerId: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  borrowerName: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  phoneNumber: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  borrowStartTime: string;  //대여 시작 시각(00:00)

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  borrowEndTime: string;  //대여 종료 시각(00:00)

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  carModel: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  carNumber: string;

  @Column({
    type: 'int',
  })
  @Expose()
  status: number;   //대여 진행 상황 (-1: 대여 거부, -2: 대여 취소, 0: 수락 대기, 1: 수락 승인, 2: 대여 진행중, 3: 대여 완료)
}