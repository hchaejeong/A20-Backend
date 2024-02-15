import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateLendDto {
  @IsString()
  readonly lenderId: string;

  @IsString()
  readonly parkingLotName: string; //주차장 이름

  @IsString()
  readonly lenderName: string; //공유자 이름

  @IsString()
  readonly relation: string; //주차장 소유 관계

  @IsString()
  readonly phoneNumber: string; //전화번호

  @IsString()
  readonly address: string;

  @IsNumber()
  readonly totalQty: number; //총 주차 면수

  @IsNumber()
  readonly baseRate: number; //주차 기본 요금(원)

  @IsNumber()
  readonly baseTime: number; //주차 기본 시간(분)

  @IsNumber()
  readonly addRate: number; //주차 추가 단위 요금(원)

  @IsNumber()
  readonly addTime: number; //주차 추가 단위 시간(분)

  @IsString()
  readonly openTime: string;

  @IsString()
  readonly closeTime: string;

  @IsArray()
  readonly operDay: string[]; //운영 요일
}
