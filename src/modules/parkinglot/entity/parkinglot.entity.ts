import { Expose } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'parkingLot',
})
export class ParkingLotEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
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
    type: 'varchar',
    length: 300,
  })
  @Expose()
  address: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  tel: string;  //전화번호

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  totalQty: string; //주차 총 면수

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  resQty: string; //주차 가능 면수

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  type: string; //요금 정보 (유료 or 무료)

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  baseTime: string; //주차 기본 시간(분)

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  baseRate: string; //주차 기본 요금(원)

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  addTime: string; //추가 단위 시간(분)

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  addRate: string; //추가 단위 요금(원)

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  extraBaseTime: string; //할증 기본 시간(분)

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  extraAddTime: string; //할증 추가 단위 시간(분)

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  extraAddRate: string; //할증 추가 단위 요금(분)

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true
  })
  @Expose()
  weekdayOpenTime?: string | null; //평일 운영 시작 시각(00:00)

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @Expose()
  weekdayCloseTime?: string | null; //평일 운영 종료 시각(00:00)

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @Expose()
  satOpenTime?: string | null; //토요일 운영 시작 시각(00:00

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @Expose()
  satCloseTime?: string | null; //토요일 운영 종료 시각(00:00)

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @Expose()
  holidayOpenTime?: string | null; //공휴일 운영 종료 시각(00:00)

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @Expose()
  holidayCloseTime?: string | null; //공휴일 운영 종료 시각(00:00)

  @Column({
    type: 'varchar',
    length: 100,
  })
  @Expose()
  operDay: string; //운영 요일(평일, 토요일, 휴일)
}
