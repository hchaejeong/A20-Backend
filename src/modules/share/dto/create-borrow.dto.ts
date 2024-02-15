import { IsNumber, IsString } from 'class-validator';

export class CreateBorrowDto {
  @IsNumber()
  lendId: string;

  @IsNumber()
  borrowerId: string;

  @IsString()
  borrowerName: string; //대여자 이름

  @IsString()
  phoneNumber: string; //전화번호

  @IsString()
  borrowStartTime: string; //대여 시작 시각(00:00)

  @IsString()
  borrowEndTime: string; //대여 종료 시각(00:00)

  @IsString()
  carModel: string; //차종 이름

  @IsString()
  carNumber: string; //차 번호
}
