import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { CreateLendDto } from './dto/create-lend.dto';
import { LendEntity } from './entity/lend.entity';
import { BorrowEntity } from './entity/borrow.entity';
import { LendRepository } from './repositories/lend.repository';
import { BorrowRepository } from './repositories/borrow.repository';

@Injectable()
export class ShareService {
  private lends: LendEntity[] = [];
  private borrows: BorrowEntity[] = [];

  constructor(private lendRepository: LendRepository, private borrowRepository: BorrowRepository){}

  async postLend(lendData: CreateLendDto) {
    //사용자가 주차장을 공유했을 때
    //주소를 위도, 경도로 바꿔야 함
    let lat = ""
    let lon = ""
    fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(lendData.address)}`,
      {
        method: 'GET',
        headers: { Authorization: 'KakaoAK 09f817ae501d12aed748afc2ad60cb8d' },
      },
    )
      .then((response) => response.text())
      .then((result) => {
        const parsedResult = JSON.parse(result);
        lat = parsedResult['documents'][0].y;
        lon = parsedResult['documents'][0].x;
        console.log(lat, lon);
      });
    //db의 lend table에 저장
    const { lenderId, parkingLotName, lenderName, relation, phoneNumber, address, totalQty, resQty, baseRate, baseTime, addRate, addTime, openTime, closeTime, operDay } = lendData

    const lendCreated = await this.lendRepository.save(
      this.lendRepository.create({
        lenderId,
        parkingLotName,
        lenderName,
        relation,
        phoneNumber,
        address,
        lat,
        lon,
        totalQty,
        resQty,
        baseRate,
        baseTime,
        addRate,
        addTime,
        openTime,
        closeTime,
        operDay
      })
    )

    if (!lendCreated) {
      throw new UnprocessableEntityException()
    }

    return lendCreated
  }

  getAllLends(userId: string) {
    //lend table에서 lenderId가 userId에 해당하는 모든 lend 찾음

  }

  async getOneLend(lendId: string) {
    //lend table에서 lendId에 해당하는 lend 찾기
    const lend = await this.lendRepository.findOne({
      where: {
        id: lendId,
      }
    })

    return lend;
  }

  deleteLend(lendId: string) {
    //
  }

  async postBorrow(borrowData: CreateBorrowDto) {
    //사용자가 해당 주차장에 대여 요청
    //db의 borrow table에 저장
    //완료 후 공유자에게 알림 -> socket 써야함 (시간 되면 하자)
    const { lendId, borrowerId, borrowerName, phoneNumber, borrowStartTime, borrowEndTime, carModel, carNumber, status } = borrowData
    const borrowCreated = await this.borrowRepository.save(
      this.borrowRepository.create({
        lendId,
        borrowerId,
        borrowerName,
        phoneNumber,
        borrowStartTime,
        borrowEndTime,
        carModel,
        carNumber,
        status
      })
    )

    if (!borrowCreated) {
      throw new UnprocessableEntityException()
    }

    return borrowCreated
  }

  async getAllBorrowsByUserId(userId: string) {
    //borrow table에서 borrowerId가 userId인 모든 borrow 찾기
    const borrows = await this.borrowRepository.find({
      where: {
        borrowerId: userId,
      }
    })

    return borrows;
  }

  async getAllBorrowsByLendId(lendId: string) {
    //borrow table에서 lendId에 해당하는 모든 borrow 찾기
    const borrows = await this.borrowRepository.find({
      where: {
        lendId,
      }
    })

    return borrows;
  }

  async getOneBorrow(borrowId: string) {
    //borrow table에서 borrowId에 해당하는 borrow 찾기
    const borrow = await this.borrowRepository.findOne({
      where: {
        id: borrowId,
      }
    })

    return borrow;
  }

  //이게 문제임
  changeBorrowState(borrowId: string, newStatus: number) {
    //대여 진행 상황 변경 (공유자가 대여 요청을 수락 또는 거부하거나, 대여자가 요청을 취소하거나, 대여할 시간이 됐거나, 대여가 끝날 때마다 요청)
    //공유자가 대여 요청을 수락 -> status=1로 바꾸고 해당 시간의 공유 주차장의 잔여 주차 면수-1
    //공유자가 대여 요청을 거부 -> status=-1로 바꿈
    //공유자가 대여 요청
    //status가 바뀌면 대여자에게 알림 -> socket (시간 되면 하자)
  }
}
